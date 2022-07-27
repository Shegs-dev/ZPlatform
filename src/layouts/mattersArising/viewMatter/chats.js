import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import PHeaders from "postHeader";
import GHeaders from "getHeader";

import { useNavigate } from "react-router-dom";

// import Footer from "examples/Footer";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import MDBox from "components/MDBox";
// import Card from "@mui/material/Card";
// import MDButton from "components/MDButton";

// import { Container } from "react-bootstrap";
// import Emojis from "./emoji";

// eslint-disable-next-line react/prop-types
function Chat({ socket, username, room }) {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  // const { emoticons: allEmojis } = Emojis();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const [titlex, setTitlex] = useState("");

  useEffect(() => {
    const messageMap = [];

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const concernID = urlParams.get("room");

    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/concernChat/getForConcern/${concernID}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        if (isMounted) {
          // eslint-disable-next-line array-callback-return
          result.map((item) => {
            const fdy = {
              id: item.id,
              room: concernID,
              author: item.senderName,
              message: item.message,
              time: `${new Date(item.createdTime).getHours()}:${new Date(Date.now()).getMinutes()}`,
            };
            messageMap.push(fdy);
          });
          setMessageList(messageMap);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        id: messageList.length + 1,
        room,
        author: username,
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
      };

      // eslint-disable-next-line react/prop-types
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");

      const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
      const orgIDs = data11.orgID;
      const personalIDs = data11.personalID;

      const raw = JSON.stringify({
        orgID: orgIDs,
        concernID: room,
        message: currentMessage,
        senderID: personalIDs,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_SHASHA_URL}/concernChat/save`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          if (result.message === "Expired Access") {
            navigate("/authentication/sign-in");
            window.location.reload();
          }
          if (result.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
            window.location.reload();
          }
          if (result.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
            window.location.reload();
          }
        })
        .catch((error) => {
          MySwal.fire({
            title: error.status,
            type: "error",
            text: error.message,
          });
        });
    }
  };

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("room");

    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/concern/getByIds/${ids}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        if (isMounted) {
          setTitlex(result[0].title);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    // eslint-disable-next-line react/prop-types
    socket.on("receive_message", (data) => {
      if (isMounted) {
        setMessageList((list) => [...list, data]);
        console.log(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [socket]);

  return (
    <>
      <div className="chat-window">
        <div className="chat-header">
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "30rem",
              whiteSpace: "nowrap",
            }}
          >
            <p>{titlex}</p>
          </div>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => (
              <div
                className="message"
                id={username === messageContent.author ? "other" : "you"}
                key={messageContent.id}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Type Message..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              // eslint-disable-next-line no-unused-expressions
              event.key === "Enter" && sendMessage();
            }}
          />
          <button type="button" onClick={sendMessage}>
            send
          </button>
        </div>
        {/* <ScrollToBottom className="emoji-container">
          <Container>
            <div className="row">
              {allEmojis.map((apis) => (
                <div key={apis.emoji} value={apis.emoji} className="col-sm-1">
                  <button type="button">{apis.emoji}</button>
                </div>
              ))}
            </div>
          </Container>
        </ScrollToBottom> */}
      </div>
    </>
  );
}

export default Chat;
