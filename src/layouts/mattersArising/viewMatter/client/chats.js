// import React, { useState } from "react";
// import MDButton from "components/MDButton";

// // eslint-disable-next-line react/prop-types
// function Chat({ socket, userName, rooms }) {
//   const [currentMessage, setCurrentMessage] = useState("");

//   const sendMessage = async () => {
//     if (currentMessage !== "") {
//       const messageData = {
//         room: rooms,
//         authour: userName,
//         message: currentMessage,
//         time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
//       };

//       // eslint-disable-next-line react/prop-types
//       await socket.emit("send_message", messageData);
//     }
//   };
//   console.log(socket);
//   console.log(userName);
//   console.log(rooms);
//   return (
//     <div>
//       <div className="chat-header">
//         <p>Live Chat</p>
//       </div>
//       <div className="chat-body" />
//       <div className="chat-Footer">
//         <input
//           type="text"
//           placeholder="John...."
//           onChange={(event) => {
//             setCurrentMessage(event.target.value);
//           }}
//         />
//         <MDButton color="info" onClick={sendMessage}>
//           Send
//         </MDButton>
//       </div>
//     </div>
//   );
// }

// export default Chat;
