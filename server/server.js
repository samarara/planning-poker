const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { initialData, reduceData, resetData, addNewQuestion, getData } = require("./setData");
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
io.on("connection", async (socket) => {
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

  socket.on("create:room", (msg) => {
    console.log("new room", msg);
    socket.join(msg);
    io.emit("question")
  });

  socket.on("question", async (msg) => {
    console.log("new question", msg);
    const newData = await addNewQuestion(dataStore, "test-question")
    io.emit("update chart", newData);
    io.emit("update grid", {});
  });

  socket.on("vote", async (msg) => {
    console.log("vote", msg);
    const newData = await reduceData(msg, "test-question", dataStore);
    console.log("new data", newData)
    console.log("updating chart", socket.emit)
    io.emit("update chart", newData);
  });

  socket.on("disconnect", async () => {
    console.log("client disconnected")
    console.log("closing db connection");
    await closeStore(dataStore);
  });

  socket.on("get data", async (msg) => {
    console.log("getting data...");
    const data = await getData(dataStore, msg);
    io.emit("update chart", data);
  });
});


server.listen(port, async () => {
  try {
    dataStore = await createStore("pp-data");
    console.log("datastore connected... initializing")
    console.log(`Example app listening at http://localhost:${port}`);
    await closeStore(dataStore);
  } catch (err) {
    console.error("unable to create data store; exiting...");
    io.close();
    server.close();
    process.exit(1);
  }
});
