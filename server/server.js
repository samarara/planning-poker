const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");
const crypto = require("crypto");
const {
  initialData,
  reduceData,
  resetData,
  addNewQuestion,
  getData,
} = require("./setData");
const { createStore, writeToStore, closeStore } = require("./clients/level");

const app = express();
const port = process.env.PORT || 8080;

app.use("/", 
  // res.sendFile(`${__dirname}/index.html`)
  express.static(path.join(__dirname, "public"))
);

const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: "http://localhost:3000" } });
const io = new Server(server);

let questionStore;
let playerStore;
io.sockets.on("connection", async (socket) => {
  // setTimeout(() => socket.emit('message', { say: 'hello' }), 1000);
  // setTimeout(() => socket.emit("message", "hello i"), 1000);

  console.log(socket.id, socket.rooms);
  console.log("connected");

  // try {
  //   // dataStore = await createStore("pp-data");
  //   // console.log("datastore connected... initializing")
  //   console.log(socket.id, socket.rooms);
  //   console.log("connected");
  //   // await closeStore(dataStore);
  //   // console.log("adding new question")
  //   // await addNewQuestion(dataStore, "test-question")
  // } catch(err) {
  //   console.error("unable to create data store; exiting...");
  //   io.close();
  //   server.close();
  //   process.exit(1);
  // }
  // await writeToStore(dataStore, "test-question", initialData);
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

// gracefull shutdown
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

// process.on("SIGINT", () => {
//   console.log("sig int received");
// })
