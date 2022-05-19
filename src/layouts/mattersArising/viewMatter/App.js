import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Chat from "./chats";

const socket = io.connect("http://localhost:3001");

function ChatApp() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    /* if (idx === 0) {
      setPassEnabled(true);
    } */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userNamex = urlParams.get("username");
    const roomID = urlParams.get("room");

    let isMounted = true;
    if (isMounted) {
      setUsername(userNamex);
      setRoom(roomID);
      socket.emit("join_room", roomID);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <div className="App">
          <Chat socket={socket} username={username} room={room} />
        </div>
      </MDBox>
    </DashboardLayout>
  );
}

export default ChatApp;
