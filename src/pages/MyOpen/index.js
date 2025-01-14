import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Button,
  DropdownToggle,
  DropdownMenu,
  Dropdown,
  DropdownItem,
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledDropdown,
} from "reactstrap";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { getLoggedInUser } from "../../helpers/fakebackend_helper";
//Import Icons
import PersonalInfo from "./PersonalInfo";

import Picker from "emoji-picker-react";

//redux
import { useSelector, useDispatch } from "react-redux";

import avatar2 from "../../assets/images/users/avatar-2.jpg";

//Import Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";
import { getOpenChatMessages, getOpenChats } from "../../slices/MyOpen/thunk";
import socket from "../../socket/socket";
import {
  handleOpenActiveChat,
  handleIncomingMessageUpdate,
} from "../../slices/MyOpen/reducer";
import "./typingAnimation.css";
import ChatListItem from "./ChatListItem";
import NoActiveConversation from "./NoActiveConversation";
import ActiveOpenChat from "./ActiveOpenChat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyOpen = () => {
  const dispatch = useDispatch();

  const [Chat_Box_Username, setChat_Box_Username] = useState("Lisa Parker");
  const [Chat_Box_Image, setChat_Box_Image] = useState(avatar2);
  const [isTyping, setIsTyping] = useState({});

  console.log("CHAT TYPNIG STATUS ->", isTyping);

  // Inside your component
  const loggedInUser = getLoggedInUser();
  const workspace = JSON.parse(localStorage.getItem("workspace"));
  const { openChats, activeOpenChat } = useSelector((state) => state.MyOpen);

  console.log("ACTIVE OPEN CHAT  ->", activeOpenChat);

  useEffect(() => {
    if (workspace) {
      dispatch(
        getOpenChats({ agentId: loggedInUser?.id, workspaceId: workspace.id })
      );
    }
  }, [activeOpenChat]);

  const handleIncomingMessage = (message) => {
    dispatch(handleIncomingMessageUpdate(message));
  };

  useEffect(() => {
    socket.on("message", handleIncomingMessage);

    return () => {
      socket.off("message", handleIncomingMessage);
    };
  }, [activeOpenChat]);

  function handleActiveChat(chatId) {
    dispatch(getOpenChatMessages({ chatId })).then((res) => {
      // setActiveChat(res.payload.data);
      dispatch(handleOpenActiveChat(res.payload.data));
    });
  }

  const handleVisitorChatWidgetState = (state) => {
    console.log("CURRENT STATE OF THE VISITOR'S WIDGET ->", state);
  };

  useEffect(() => {
    socket.on("visitor-chat-widget-state", handleVisitorChatWidgetState);
  }, []);

  function handleTypingStatus({ id: userId }) {
    setIsTyping((prevStatus) => ({
      ...prevStatus,
      [userId]: true,
    }));

    setTimeout(() => {
      setIsTyping((prevStatus) => ({
        ...prevStatus,
        [userId]: false,
      }));
    }, 2000);
  }

  useEffect(() => {
    socket.on("typing", handleTypingStatus);

    return () => {
      socket.off(handleTypingStatus);
    };
  }, []);

  document.title = "My Open";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
            <div className="chat-leftsidebar border">
              <div className="px-4 pt-4 mb-4">
                <div className="d-flex align-items-start">
                  <div className="flex-grow-1">
                    <h5 className="mb-4">📬 My Open</h5>
                  </div>
                </div>
                <div className="search-box">
                  <input
                    id="search-user"
                    type="text"
                    className="form-control bg-light border-light"
                    placeholder="Search here..."
                  />
                  <i className="ri-search-2-line search-icon"></i>
                </div>
              </div>

              <SimpleBar
                className="chat-room-list pt-3"
                style={{ margin: "-16px 0px 0px" }}
              >
                <div className="chat-message-list">
                  <ul
                    className="list-unstyled chat-list chat-user-list users-list"
                    id="userList"
                  >
                    {(openChats || []).map((chat, i) => (
                      <ChatListItem
                        key={chat.id}
                        chat={chat}
                        activeOpenChat={activeOpenChat}
                        handleActiveChat={handleActiveChat}
                        isTyping={isTyping[chat.visitor.id] || false}
                      />
                    ))}
                  </ul>
                </div>
              </SimpleBar>
            </div>
            {activeOpenChat ? (
              <ActiveOpenChat
                activeOpenChat={activeOpenChat}
                isTyping={isTyping[activeOpenChat.visitor.id] || false}
              />
            ) : (
              <NoActiveConversation />
            )}
          </div>
        </Container>
      </div>
      <ToastContainer />

      {/* <PersonalInfo
        show={isInfoDetails}
        onCloseClick={() => setIsInfoDetails(false)}
        currentuser={Chat_Box_Username}
        cuurentiseImg={Chat_Box_Image}
      /> */}
    </React.Fragment>
  );
};

export default MyOpen;
