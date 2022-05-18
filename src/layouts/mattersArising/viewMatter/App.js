import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
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
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <div className="App">
            <Chat socket={socket} username={username} room={room} />
          </div>
        </MDBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default ChatApp;
