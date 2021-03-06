const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const crypto = require("crypto");
const { reduceData, addNewQuestion, getData } = require("./setData");
const { createStore, closeStore } = require("./clients/level");

const app = express();
const port = process.env.PORT || 8080;

// serve react app
app.use(express.static(path.join(__dirname, "public")));

// set up socket.io
const server = http.createServer(app);
const io = new Server(server);

let questionStore;
let playerStore;
io.sockets.on("connection", async (socket) => {

  console.log(socket.id, socket.rooms);
  console.log("connected");

  socket.on("message", (msg) => {
    console.log("message", msg);
  });

  socket.on("create:room", ({ roomId }) => {
    console.log("new room", roomId);
    socket.join(roomId);
    io.emit("question", { roomId });
  });

  socket.on("join:room", ({ roomId }) => {
    console.log("join room", roomId);
    socket.join(roomId);
    io.to(roomId).emit("question", { roomId });
  });

  socket.on("create:moderator", ({ roomId, name }) => {
    console.log("add moderator ", name, " to ", roomId);
    io.to(roomId).emit("join:player", { roomId, role: "moderator", name });
  });

  socket.on("add:player", ({ roomId, name }) => {
    console.log("add player ", name, " to ", roomId);
    io.to(roomId).emit("join:player", { roomId, role: "player", name });
  });

  socket.on("question", async ({ roomId }) => {
    console.log("new question", roomId);
    const questionId = crypto.randomBytes(16).toString("hex");
    const newData = await addNewQuestion(roomId, questionId, questionStore);
    // io.to(roomId).emit("get question", { roomId, questionId });
    io.to(roomId).emit("update chart", { questionId, newData });
    io.to(roomId).emit("update grid", { questionId });
  });

  socket.on("vote", async ({ roomId, vote, questionId }, cb) => {
    console.log("vote", vote, "roomId", roomId);
    const newData = await reduceData(
      roomId,
      vote,
      "vote",
      questionId,
      questionStore
    );
    console.log("new data", newData);
    console.log("updating chart", socket.emit);
    io.to(roomId).emit("update chart", { questionId, newData });
    cb({ status: "ok" });
  });

  socket.on("unvote", async ({ roomId, previousVote, questionId }) => {
    console.log("unvote", previousVote, "roomId", roomId);
    const newData = await reduceData(
      roomId,
      previousVote,
      "unvote",
      questionId,
      questionStore
    );
    console.log("new data", newData);
    console.log("updating chart", socket.emit);
    io.to(roomId).emit("update chart", { questionId, newData });
  });

  socket.on("disconnect", async () => {
    console.log("client disconnected");
    console.log("closing db connection");
    await closeStore(questionStore);
  });

  socket.on("get data", async ({ roomId, questionId }) => {
    console.log("getting data...");
    const data = await getData(roomId, questionId, questionStore);
    io.emit("update chart", { questionId, data });
  });
});

// handle any other route by react router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

// graceful shutdown
const shutdownHandler = async (signal) => {
  console.log(`received ${signal}`);
  console.log("shutting down application");
  try {
    console.log("shutting down store");
    await closeStore(questionStore);
  } catch (err) {
    console.error("unable to close the connection", err);
    process.exit(1);
  } finally {
    io.close();
    server.close();
    process.exit(0);
  }
};

// create repository and start server
server.listen(port, async () => {
  try {
    questionStore = await createStore("pp-data");
    playerStore = await createStore("pp-players");
    console.log("datastore connected... initializing");
    console.log(`Example app listening at http://localhost:${port}`);
    await closeStore(questionStore);
  } catch (err) {
    console.error("unable to create data store; exiting...");
    io.close();
    server.close();
    process.exit(1);
  }
});

process.on("SIGTERM", shutdownHandler);
process.on("SIGINT", shutdownHandler);

