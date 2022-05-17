// eslint-disable-next-line import/no-unresolved
// import "./App.css";
// import * as io from "socket.io-client";
// import React, { useState } from "react";
// import MDButton from "components/MDButton";
// import Chat from "layouts/mattersArising/viewMatter/client/chats";

// const socket = io.connect("http//:localhost:3001");
// console.log(socket);

// function App() {
//   const [userName, setUserName] = useState("");
//   const [room, setRoom] = useState("");

//   const joinRoom = (data) => {
//     if (userName !== "" && room !== "") {
//       socket.emit("join_chat", room);
//       // eslint-disable-next-line no-template-curly-in-string
//       // eslint-disable-next-line no-template-curly-in-string
//       console.log(`User with ID: ${socket.id} joined room: ${data}`);
//       console.log(socket);
//     }
//   };

//   return (
//     <div className="App">
//       <h3>Join A Chat</h3>
//       <input
//         type="text"
//         placeholder="John...."
//         onChange={(event) => {
//           setUserName(event.target.value);
//         }}
//       />
//       <input
//         type="text"
//         placeholder="John...."
//         onChange={(event) => {
//           setRoom(event.target.value);
//         }}
//       />
//       <MDButton onClick={joinRoom} color="info">
//         Join Chat
//       </MDButton>

//       <Chat socket={socket} username={userName} room={room} />
//     </div>
//   );
// }

// export default App;
