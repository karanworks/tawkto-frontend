import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Container,
  Button,
  UncontrolledTooltip,
  Input,
  DropdownToggle,
  DropdownMenu,
  Dropdown,
  DropdownItem,
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledDropdown,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import classnames from "classnames";
import SimpleBar from "simplebar-react";
import { getLoggedInUser } from "../../helpers/fakebackend_helper";
//Import Icons
import FeatherIcon from "feather-icons-react";
import PersonalInfo from "./PersonalInfo";
import NoChatIcon from "./no-chat-icon.svg";

import { chatContactData } from "../../common/data";

import Picker from "emoji-picker-react";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  getDirectContact as onGetDirectContact,
  getMessages,
  getChannels as onGetChannels,
  addMessage as onAddMessage,
  deleteMessage as onDeleteMessage,
} from "../../slices/thunks";

import avatar2 from "../../assets/images/users/avatar-2.jpg";
import userDummayImage from "../../assets/images/users/user-dummy-img.jpg";

//Import Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";
import { createSelector } from "reselect";
import { io } from "socket.io-client";
import { getOpenChats } from "../../slices/MyOpen/thunk";
import socket from "../../socket/socket";
import moment from "moment/moment";

const MyOpen = () => {
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  const containerRef = useRef(null);

  const dispatch = useDispatch();
  const [isInfoDetails, setIsInfoDetails] = useState(false);
  const [Chat_Box_Username, setChat_Box_Username] = useState("Lisa Parker");
  const [Chat_Box_Image, setChat_Box_Image] = useState(avatar2);
  const [currentRoomId, setCurrentRoomId] = useState(1);
  const [messageBox, setMessageBox] = useState(null);
  const [curMessage, setcurMessage] = useState("");
  const [search_Menu, setsearch_Menu] = useState(false);
  const [settings_Menu, setsettings_Menu] = useState(false);
  const [reply, setreply] = useState("");
  const [emojiPicker, setemojiPicker] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "Anna Adame",
    isActive: true,
  });
  const [messages, setMessages] = useState([]);
  const [visitorRequests, setVisitorRequests] = useState([]);
  const [openChats, setOpenChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  console.log("ACTIVE CHAT ->", activeChat);

  const selectLayoutState = (state) => state.Chat;
  const chatProperties = createSelector(selectLayoutState, (state) => ({
    chats: state.chats,
    // messages: state.messages,
    channels: state.channels,
  }));
  // Inside your component
  // const { chats, messages, channels } = useSelector(chatProperties);
  const { chats } = useSelector(chatProperties);
  const loggedInUser = getLoggedInUser()?.data;

  const workspace = JSON.parse(localStorage.getItem("workspace"));

  //Toggle Chat Box Menus
  const toggleSearch = () => {
    setsearch_Menu(!search_Menu);
  };

  //Info details offcanvas
  const toggleInfo = () => {
    setIsInfoDetails(!isInfoDetails);
  };

  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu);
  };

  const sendMessage = () => {
    // if (curMessage.trim()) {
    //   socket.emit("message", curMessage); // Send message to server via socket.io
    //   setcurMessage(""); // Clear the input
    // }
  };

  useEffect(() => {
    dispatch(onGetDirectContact());
    dispatch(onGetChannels());
    dispatch(getMessages(currentRoomId));
  }, [dispatch, currentRoomId]);

  useEffect(() => {
    dispatch(getOpenChats({ agentId: loggedInUser?.id })).then((res) => {
      setOpenChats(res.payload.data);
    });
  }, []);

  const handleIncomingMessage = (message) => {
    console.log("MESSAGE RECIEVED ->", message);
    setOpenChats((prevOpenChats) => {
      return prevOpenChats?.map((openChat) => {
        if (openChat.id === message.chatId) {
          return {
            ...openChat,
            messages: [...openChat.messages, message],
          };
        } else {
          return openChat;
        }
      });
    });

    if (activeChat?.id === message.chatId) {
      console.log("YES IT IS ACTIVE CHAT ->");

      setActiveChat((prevActiveChat) => ({
        ...prevActiveChat,
        messages: [...prevActiveChat.messages, message], // Append the new message to the active chat's messages
      }));
    }
  };

  useEffect(() => {
    socket.on("message", handleIncomingMessage);

    return () => {
      socket.off("message", handleIncomingMessage);
    };
  }, [activeChat]);

  function handleActiveChat(chatId) {
    const activeChat = openChats.find(
      (request) => request.visitorId === chatId
    );

    setActiveChat(activeChat);
  }

  //Use For Chat Box
  const userChatOpen = (id, name, status, roomId, image) => {
    setChat_Box_Username(name);
    setCurrentRoomId(roomId);
    setChat_Box_Image(image);
    dispatch(getMessages(roomId));
  };

  const addMessage = (roomId, sender) => {
    const message = {
      id: Math.floor(Math.random() * 100),
      roomId,
      sender,
      message: curMessage,
      createdAt: new Date(),
    };
    setcurMessage("");
    dispatch(onAddMessage(message));
  };

  useEffect(() => {
    if (containerRef.current) {
      const simpleBar = containerRef.current;
      const contentEl = simpleBar.getScrollElement();
      contentEl.scrollTop = contentEl.scrollHeight;
    }
  }, [activeChat]);

  const onKeyPress = (e) => {
    const { key } = e;
    if (key === "Enter") {
      e.preventDefault();

      socket.emit("message", {
        message: { content: curMessage },
        chatId: activeChat.id,
        sender: {
          name: loggedInUser.name,
          agentId: loggedInUser.id,
          type: "agent",
        },
        to: activeChat.visitorId,
      });

      console.log("MESSAGE ->");

      setcurMessage("");
      // addMessage(currentRoomId, currentUser.name);
      // sendMessage();
    }
  };

  //serach recent user
  const searchUsers = () => {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search-user");
    filter = input.value.toUpperCase();
    var userList = document.getElementsByClassName("users-list");
    Array.prototype.forEach.call(userList, function (el) {
      li = el.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    });
  };

  // Copy Message
  const handleCkick = (ele) => {
    var copy = ele
      .closest(".chat-list")
      .querySelector(".ctext-content").innerHTML;
    navigator.clipboard.writeText(copy);

    document.getElementById("copyClipBoard").style.display = "block";
    setTimeout(() => {
      document.getElementById("copyClipBoard").style.display = "none";
    }, 2000);
  };

  // emoji
  const [emojiArray, setemojiArray] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    setemojiArray([...emojiArray, emojiObject.emoji]);
    let emoji = [...emojiArray, emojiObject.emoji].join(" ");
    setcurMessage(curMessage + event.emoji);
  };

  document.title = "Chat | Velzon - React Admin & Dashboard Template";
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
                    onKeyUp={searchUsers}
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
                    {(openChats || []).map((request, i) => (
                      <li
                        style={{ background: "#F3F6F9" }}
                        key={i}
                        onClick={() => handleActiveChat(request.visitorId)}
                      >
                        {console.log("REQUEST IN MESSAGES  ->", request)}
                        <Link to="#" onClick={(e) => {}}>
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 chat-user-img online align-self-start me-2 ms-0">
                              <div className="avatar-xxs">
                                <div
                                  className={
                                    "avatar-title rounded-circle bg-primary userprofile"
                                  }
                                >
                                  {/* {request.visitor.name.charAt(0)} */}
                                  {request.messages[
                                    request.messages.length - 1
                                  ].sender.name.charAt(0)}
                                </div>
                              </div>

                              <span className="user-status"></span>
                            </div>
                            <div className="flex-grow-1 overflow-hidden">
                              <div className="d-flex justify-content-between">
                                <p className="text-truncate mb-0 text-muted">
                                  {/* {request.visitor.name} */}
                                  {
                                    request.messages[
                                      request.messages.length - 1
                                    ].sender.name
                                  }
                                </p>
                                <p className="mb-0 text-muted">8min</p>
                              </div>

                              <div className="d-flex justify-content-between">
                                <p className="text-truncate mb-0">
                                  {
                                    request.messages[
                                      request.messages.length - 1
                                    ].content
                                  }
                                </p>
                                <div
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                    color: "white",
                                    background: "#25A0E2",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                    fontSize: "10px",
                                  }}
                                >
                                  <p className="mb-0">
                                    {request.messages.length}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </SimpleBar>
            </div>
            {activeChat ? (
              <div className="user-chat w-100 overflow-hidden border">
                <div className="chat-content d-lg-flex">
                  <div className="w-100 overflow-hidden position-relative">
                    <div className="position-relative">
                      <div className="p-3 user-chat-topbar">
                        <Row className="align-items-center">
                          <Col sm={4} xs={8}>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 d-block d-lg-none me-3">
                                <Link
                                  to="#"
                                  className="user-chat-remove fs-18 p-1"
                                >
                                  <i className="ri-arrow-left-s-line align-bottom"></i>
                                </Link>
                              </div>
                              <div className="flex-grow-1 overflow-hidden">
                                <div className="d-flex align-items-center">
                                  <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                    {Chat_Box_Image === undefined ? (
                                      <img
                                        src={userDummayImage}
                                        className="rounded-circle avatar-xs"
                                        alt=""
                                      />
                                    ) : (
                                      <img
                                        src={Chat_Box_Image}
                                        className="rounded-circle avatar-xs"
                                        alt=""
                                      />
                                    )}
                                    <span className="user-status"></span>
                                  </div>
                                  <div className="flex-grow-1 overflow-hidden">
                                    <h5 className="text-truncate mb-0 fs-16">
                                      <a
                                        className="text-reset username"
                                        data-bs-toggle="offcanvas"
                                        href="#userProfileCanvasExample"
                                        aria-controls="userProfileCanvasExample"
                                      >
                                        {Chat_Box_Username}
                                      </a>
                                    </h5>
                                    <p className="text-truncate text-muted fs-14 mb-0 userStatus">
                                      <small>Online</small>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col sm={8} xs={4}>
                            <ul className="list-inline user-chat-nav text-end mb-0">
                              <li
                                className="list-inline-item"
                                style={{ marginRight: "10px" }}
                              >
                                <button
                                  className="d-flex gap-1"
                                  style={{
                                    background: "white",
                                    border: "1px solid #00BD9D",
                                    padding: "3px 10px",
                                    borderRadius: "5px",
                                  }}
                                >
                                  <span>✅</span>
                                  <span>Solve</span>
                                </button>
                              </li>
                              <li className="list-inline-item d-none d-lg-inline-block m-0">
                                <button
                                  type="button"
                                  className="btn btn-ghost-secondary btn-icon"
                                  onClick={toggleInfo}
                                >
                                  <FeatherIcon
                                    icon="info"
                                    className="icon-sm"
                                  />
                                </button>
                              </li>

                              <li className="list-inline-item m-0">
                                <Dropdown
                                  isOpen={settings_Menu}
                                  toggle={toggleSettings}
                                >
                                  <DropdownToggle
                                    className="btn btn-ghost-secondary btn-icon"
                                    tag="button"
                                  >
                                    <FeatherIcon
                                      icon="more-vertical"
                                      className="icon-sm"
                                    />
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem
                                      href="#"
                                      className="d-block d-lg-none user-profile-show"
                                    >
                                      <i className="ri-user-2-fill align-bottom text-muted me-2"></i>{" "}
                                      View Profile
                                    </DropdownItem>
                                    <DropdownItem href="#">
                                      <i className="ri-inbox-archive-line align-bottom text-muted me-2"></i>{" "}
                                      Archive
                                    </DropdownItem>
                                    <DropdownItem href="#">
                                      <i className="ri-mic-off-line align-bottom text-muted me-2"></i>{" "}
                                      Muted
                                    </DropdownItem>
                                    <DropdownItem href="#">
                                      {" "}
                                      <i className="ri-delete-bin-5-line align-bottom text-muted me-2"></i>{" "}
                                      Delete
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </div>

                      <div className="position-relative" id="users-chat">
                        <SimpleBar
                          className="chat-conversation p-3 p-lg-4"
                          id="chat-conversation"
                          ref={containerRef}
                        >
                          <div id="elmLoader"></div>
                          <ul
                            className="list-unstyled chat-conversation-list"
                            id="users-conversation"
                          >
                            {activeChat &&
                              activeChat?.messages.map((message, key) => (
                                <li
                                  className={
                                    message.sender.type === "visitor"
                                      ? "chat-list left"
                                      : "chat-list right"
                                  }
                                  key={key}
                                >
                                  <div className="conversation-list">
                                    <div className="user-chat-content">
                                      <div className="ctext-wrap">
                                        <div className="ctext-wrap-content shadow-none">
                                          <p className="mb-0 ctext-content">
                                            {message.content}
                                          </p>
                                        </div>

                                        <UncontrolledDropdown className="align-self-start message-box-drop">
                                          <DropdownToggle
                                            href="#"
                                            className="btn nav-btn"
                                            tag="i"
                                          >
                                            <i className="ri-more-2-fill"></i>
                                          </DropdownToggle>
                                          <DropdownMenu>
                                            <DropdownItem
                                              href="#"
                                              className="reply-message"
                                              onClick={() => setreply(message)}
                                            >
                                              {" "}
                                              <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                                              Reply
                                            </DropdownItem>
                                            <DropdownItem href="#">
                                              <i className="ri-share-line me-2 text-muted align-bottom"></i>
                                              Forward
                                            </DropdownItem>
                                            <DropdownItem
                                              href="#"
                                              onClick={(e) =>
                                                handleCkick(e.target)
                                              }
                                            >
                                              <i className="ri-file-copy-line me-2 text-muted align-bottom"></i>
                                              Copy
                                            </DropdownItem>
                                            <DropdownItem href="#">
                                              <i className="ri-bookmark-line me-2 text-muted align-bottom"></i>
                                              Bookmark
                                            </DropdownItem>
                                            <DropdownItem
                                              href="#"
                                              onClick={() =>
                                                dispatch(
                                                  onDeleteMessage(message.id)
                                                )
                                              }
                                            >
                                              <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
                                              Delete
                                            </DropdownItem>
                                          </DropdownMenu>
                                        </UncontrolledDropdown>
                                      </div>
                                      <div className="conversation-name">
                                        {message.sender.type === "agent" ? (
                                          <small className="text-muted time">
                                            {message.sender.name}
                                          </small>
                                        ) : null}{" "}
                                        <small className="text-muted time">
                                          {moment(message.createdAt).fromNow()}
                                        </small>{" "}
                                        <span className="text-success check-message-icon">
                                          <i className="ri-check-double-line align-bottom"></i>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </SimpleBar>
                        <div
                          className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show "
                          id="copyClipBoard"
                          role="alert"
                        >
                          Message copied
                        </div>
                        {emojiPicker && (
                          <div className="alert pickerEmoji">
                            <Picker
                              disableSearchBar={true}
                              onEmojiClick={onEmojiClick}
                            />
                          </div>
                        )}
                      </div>

                      <div className="chat-input-section p-3 p-lg-4">
                        <form id="chatinput-form">
                          <Row className="g-0 align-items-center">
                            <div className="col-auto">
                              <div className="chat-input-links me-2">
                                <div className="links-list-item">
                                  <button
                                    type="button"
                                    className="btn btn-link text-decoration-none emoji-btn"
                                    id="emoji-btn"
                                    onClick={() => setemojiPicker(!emojiPicker)}
                                  >
                                    <i className="bx bx-smile align-middle"></i>
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="col">
                              <div className="chat-input-feedback">
                                Please Enter a Message
                              </div>
                              <input
                                type="text"
                                value={curMessage}
                                onKeyPress={onKeyPress}
                                onChange={(e) => setcurMessage(e.target.value)}
                                className="form-control chat-input bg-light border-light fs-13"
                                id="chat-input"
                                placeholder="Type your message..."
                              />
                            </div>
                            <div className="col-auto">
                              <div className="chat-input-links ms-2">
                                <div className="links-list-item">
                                  <Button
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                      addMessage(
                                        currentRoomId,
                                        currentUser.name
                                      );
                                      setemojiPicker(false);
                                      setemojiArray("");
                                      sendMessage();
                                    }}
                                    className="chat-send waves-effect waves-light fs-13"
                                  >
                                    <i className="ri-send-plane-2-fill align-bottom"></i>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Row>
                        </form>
                      </div>

                      <div className={reply ? "replyCard show" : "replyCard"}>
                        <Card className="mb-0">
                          <CardBody className="py-3">
                            <div className="replymessage-block mb-0 d-flex align-items-start">
                              <div className="flex-grow-1">
                                <h5 className="conversation-name">
                                  {reply && reply.sender}
                                </h5>
                                <p className="mb-0">{reply && reply.message}</p>
                              </div>
                              <div className="flex-shrink-0">
                                <button
                                  type="button"
                                  id="close_toggle"
                                  className="btn btn-sm btn-link mt-n2 me-n3 fs-18"
                                  onClick={() => setreply("")}
                                >
                                  <i className="bx bx-x align-middle"></i>
                                </button>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "100px",
                }}
              >
                <div>
                  <img
                    src={NoChatIcon}
                    alt="no-active-conversation-icon"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "45px",
                      fontWeight: "bold",
                      margin: "0",
                      color: "#495057",
                    }}
                  >
                    No Active Conversation
                  </p>

                  <p style={{ fontSize: "20px", margin: "0" }}>
                    Please click on visitor's chat to see their messages
                  </p>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <button className="btn btn-primary">
                    See your open chats
                  </button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>

      <PersonalInfo
        show={isInfoDetails}
        onCloseClick={() => setIsInfoDetails(false)}
        currentuser={Chat_Box_Username}
        cuurentiseImg={Chat_Box_Image}
      />
    </React.Fragment>
  );
};

export default MyOpen;
