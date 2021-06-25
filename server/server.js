const express = require("express");
const http = require("http");
const cors = require("cors");
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
const port = 8080;

app.get("/api/v1", (req, res) => {
  // res.sendFile(`${__dirname}/index.html`)
  res.send("Hello from api!");
});

const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: "http://localhost:3000" } });
const io = new Server(server);

let dataStore;
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

  socket.on("question", async ({ roomId }) => {
    console.log("new question", roomId);
    const questionId = crypto.randomBytes(16).toString("hex");
    const newData = await addNewQuestion(roomId, questionId, dataStore);
    io.to(roomId).emit("get question", { roomId, questionId });
    io.to(roomId).emit("update chart", { questionId, newData });
    io.to(roomId).emit("update grid", { questionId });
  });

  socket.on("vote", async ({ roomId, vote, questionId }) => {
    console.log("vote", vote, "roomId", roomId);
    const newData = await reduceData(roomId, vote, "vote", questionId, dataStore);
    console.log("new data", newData);
    console.log("updating chart", socket.emit);
    io.to(roomId).emit("update chart", { questionId, newData });
  });

  socket.on("unvote", async ({ roomId, previousVote, questionId }) => {
    console.log("vote", previousVote, "roomId", roomId);
    const newData = await reduceData(roomId, previousVote, "unvote", questionId, dataStore);
    console.log("new data", newData);
    console.log("updating chart", socket.emit);
    io.to(roomId).emit("update chart", { questionId, newData });
  });

  socket.on("disconnect", async () => {
    console.log("client disconnected");
    console.log("closing db connection");
    await closeStore(dataStore);
  });

  socket.on("get data", async ({ roomId, questionId }) => {
    console.log("getting data...");
    const data = await getData(roomId, questionId, dataStore);
    io.emit("update chart", { questionId, data });
  });
});

server.listen(port, async () => {
  try {
    dataStore = await createStore("pp-data");
    console.log("datastore connected... initializing");
    console.log(`Example app listening at http://localhost:${port}`);
    await closeStore(dataStore);
  } catch (err) {
    console.error("unable to create data store; exiting...");
    io.close();
    server.close();
    process.exit(1);
  }
});
