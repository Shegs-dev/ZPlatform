// const express = require("express");

// const app = express();

// const http = require("http");

// const cors = require("cors");

// const { Server } = require(`socket.io`);

// app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http//localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   // eslint-disable-next-line no-template-curly-in-string
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("Join_chat", (data) => {
//     socket.join(data);
//     // eslint-disable-next-line no-template-curly-in-string
//     console.log(`user with ID: ${socket.id}  joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("recieve_message", data);
//     // console.log(data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Dissconnected", socket.id);
//   });
// });

// server.listen(3001, () => {
//   console.log("SERVER RUNNING");
// });
