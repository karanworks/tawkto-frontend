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
import FeatherIcon from "feather-icons-react";
import PersonalInfo from "./PersonalInfo";

import Picker from "emoji-picker-react";

//redux
import { useSelector, useDispatch } from "react-redux";

import avatar2 from "../../assets/images/users/avatar-2.jpg";

//Import Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";
import { getOpenChatMessages, getOpenChats } from "../../slices/MyOpen/thunk";
import socket from "../../socket/socket";
import moment from "moment/moment";
import {
  handleOpenActiveChat,
  handleIncomingMessageUpdate,
} from "../../slices/MyOpen/reducer";
import "./typingAnimation.css";
import ChatListItem from "./ChatListItem";
import NoActiveConversation from "./NoActiveConversation";
import ActiveOpenChat from "./ActiveOpenChat";

const MyOpen = () => {
  const containerRef = useRef(null);

  const dispatch = useDispatch();

  const [Chat_Box_Username, setChat_Box_Username] = useState("Lisa Parker");
  const [Chat_Box_Image, setChat_Box_Image] = useState(avatar2);
  const [curMessage, setcurMessage] = useState("");
  const [reply, setreply] = useState("");
  const [emojiPicker, setemojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Inside your component
  const loggedInUser = getLoggedInUser();
  const workspace = JSON.parse(localStorage.getItem("workspace"));
  const { openChats, activeOpenChat } = useSelector((state) => state.MyOpen);

  console.log("OPEN CHATS IN MY OPEN PAGE ->", openChats);

  //Info details offcanvas

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

  useEffect(() => {
    if (containerRef.current) {
      const simpleBar = containerRef.current;
      const contentEl = simpleBar.getScrollElement();
      contentEl.scrollTop = contentEl.scrollHeight;
    }
  }, [activeOpenChat]);

  const handleVisitorChatWidgetState = (state) => {
    console.log("CURRENT STATE OF THE VISITOR'S WIDGET ->", state);
  };

  useEffect(() => {
    socket.on("visitor-chat-widget-state", handleVisitorChatWidgetState);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!curMessage) {
      return;
    }

    socket.emit("message", {
      message: { content: curMessage },
      chatId: activeOpenChat.id,
      sender: {
        name: loggedInUser.name,
        agentId: loggedInUser.id,
        type: "agent",
      },
      to: activeOpenChat.visitorId,
    });

    setcurMessage("");
  };

  function handleTypingStatus(user) {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  }

  useEffect(() => {
    socket.on("typing", handleTypingStatus);

    return () => {
      socket.off(handleTypingStatus);
    };
  }, []);

  const onKeyPress = (e) => {
    const { key } = e;
    if (key === "Enter") {
      e.preventDefault();

      socket.emit("message", {
        message: { content: curMessage },
        chatId: activeOpenChat.id,
        sender: {
          name: loggedInUser.name,
          agentId: loggedInUser.id,
          type: "agent",
        },
        to: activeOpenChat.visitorId,
      });

      setcurMessage("");
    }
  };

  function handleTypingMessage(e) {
    console.log("SENDING TYPING MESSAGE ->", e.target.value);

    setcurMessage(e.target.value);
    socket.emit("typing", {
      user: {
        name: loggedInUser.name,
        agentId: loggedInUser.id,
        visitorId: activeOpenChat.visitor.id,
        workspaceId: workspace.id,

        type: "agent",
      },
    });
  }

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
                        isTyping={isTyping}
                      />
                      // <li
                      //   style={{
                      //     background:
                      //       activeOpenChat?.id === request?.id
                      //         ? "#F3F6F9"
                      //         : "transparent",
                      //   }}
                      //   key={i}
                      //   onClick={() => handleActiveChat(request.id)}
                      // >
                      //   <Link to="#" onClick={(e) => {}}>
                      //     <div className="d-flex align-items-center">
                      //       <div
                      //         className={`flex-shrink-0 chat-user-img ${
                      //           request?.status &&
                      //           request.status.status === "online"
                      //             ? "online"
                      //             : "away"
                      //         } align-self-start me-2 ms-0`}
                      //       >
                      //         <div className="avatar-xxs">
                      //           <div
                      //             className={
                      //               "avatar-title rounded-circle bg-primary userprofile"
                      //             }
                      //           >
                      //             {/* {request.visitor.name.charAt(0)} */}
                      //             {/* {request.messages.length !== 0 &&
                      //               request.messages[
                      //                 request.messages.length - 1
                      //               ].sender.name.charAt(0)} */}

                      //             {request.visitor.name.charAt(0)}
                      //           </div>
                      //         </div>

                      //         <span className="user-status"></span>
                      //       </div>
                      //       <div className="flex-grow-1 overflow-hidden">
                      //         <div className="d-flex justify-content-between">
                      //           <p className="text-truncate mb-0 text-muted">
                      //             {/* {request.visitor.name} */}
                      //             {/* {request.messages.length !== 0 &&
                      //               request.messages[
                      //                 request.messages.length - 1
                      //               ].sender.name} */}
                      //             {request.visitor.name}
                      //           </p>
                      //           <p className="mb-0 text-muted">8min</p>
                      //         </div>

                      //         <div className="d-flex justify-content-between">
                      //           {isTyping ? (
                      //             <div style={{ color: "#25A0E2" }}>
                      //               Typing ...
                      //             </div>
                      //           ) : (
                      //             <>
                      //               {" "}
                      //               <p className="text-truncate mb-0">
                      //                 {request.messages.length !== 0 &&
                      //                   request.messages[
                      //                     request.messages.length - 1
                      //                   ].content}
                      //               </p>
                      //               <div
                      //                 style={{
                      //                   width: "18px",
                      //                   height: "18px",
                      //                   color: "white",
                      //                   background: "#25A0E2",
                      //                   display: "flex",
                      //                   justifyContent: "center",
                      //                   alignItems: "center",
                      //                   borderRadius: "50%",
                      //                   fontSize: "10px",
                      //                 }}
                      //               >
                      //                 <p className="mb-0">
                      //                   {request.messages.length}
                      //                 </p>
                      //               </div>{" "}
                      //             </>
                      //           )}
                      //         </div>
                      //       </div>
                      //     </div>
                      //   </Link>
                      // </li>
                    ))}
                  </ul>
                </div>
              </SimpleBar>
            </div>
            {activeOpenChat ? (
              // <div className="user-chat w-100 overflow-hidden border">
              //   <div className="chat-content d-lg-flex">
              //     <div className="w-100 overflow-hidden position-relative">
              //       <div className="position-relative">
              //         <div className="p-3 user-chat-topbar">
              //           <Row className="align-items-center">
              //             <Col sm={4} xs={8}>
              //               <div className="d-flex align-items-center">
              //                 <div className="flex-shrink-0 d-block d-lg-none me-3">
              //                   <Link
              //                     to="#"
              //                     className="user-chat-remove fs-18 p-1"
              //                   >
              //                     <i className="ri-arrow-left-s-line align-bottom"></i>
              //                   </Link>
              //                 </div>
              //                 <div className="flex-grow-1 overflow-hidden">
              //                   <div
              //                     className="d-flex align-items-center"
              //                     style={{ gap: "10px" }}
              //                   >
              //                     <div className="avatar-xxs">
              //                       <div
              //                         className={
              //                           "avatar-title rounded-circle bg-primary userprofile"
              //                         }
              //                       >
              //                         {activeOpenChat.visitor.name.charAt(0)}
              //                       </div>
              //                     </div>
              //                     <div className="flex-grow-1 overflow-hidden">
              //                       <div
              //                         className="d-flex"
              //                         style={{ gap: "8px" }}
              //                       >
              //                         <h5 className="text-truncate mb-0 fs-16">
              //                           {/* <a
              //                           className="text-reset username"
              //                           data-bs-toggle="offcanvas"
              //                           href="#userProfileCanvasExample"
              //                           aria-controls="userProfileCanvasExample"
              //                         > */}
              //                           {activeOpenChat.visitor.name} -
              //                           {/* </a> */}
              //                         </h5>
              //                         <h5 className="text-truncate mb-0 fs-16">
              //                           {/* <a
              //                           className="text-reset username"
              //                           data-bs-toggle="offcanvas"
              //                           href="#userProfileCanvasExample"
              //                           aria-controls="userProfileCanvasExample"
              //                         > */}

              //                           {activeOpenChat.visitor.email}
              //                           {/* </a> */}
              //                         </h5>
              //                       </div>
              //                       <p className="text-truncate text-muted fs-14 mb-0 userStatus">
              //                         {isTyping ? (
              //                           <small style={{ color: "#25A0E2" }}>
              //                             Typing ...
              //                           </small>
              //                         ) : (
              //                           <small>
              //                             {activeOpenChat?.status &&
              //                             activeOpenChat.status.status ===
              //                               "online"
              //                               ? "Online"
              //                               : "Offline"}
              //                           </small>
              //                         )}
              //                       </p>
              //                     </div>
              //                   </div>
              //                 </div>
              //               </div>
              //             </Col>
              //             <Col sm={8} xs={4}>
              //               <ul className="list-inline user-chat-nav text-end mb-0">
              //                 <li
              //                   className="list-inline-item"
              //                   style={{ marginRight: "10px" }}
              //                 >
              //                   <button
              //                     className="d-flex gap-1"
              //                     style={{
              //                       background: "white",
              //                       border: "1px solid #00BD9D",
              //                       padding: "3px 10px",
              //                       borderRadius: "5px",
              //                     }}
              //                   >
              //                     <span>✅</span>
              //                     <span>Solve</span>
              //                   </button>
              //                 </li>
              //                 <li className="list-inline-item d-none d-lg-inline-block m-0">
              //                   <button
              //                     type="button"
              //                     className="btn btn-ghost-secondary btn-icon"
              //                     onClick={toggleInfo}
              //                   >
              //                     <FeatherIcon
              //                       icon="info"
              //                       className="icon-sm"
              //                     />
              //                   </button>
              //                 </li>

              //                 <li className="list-inline-item m-0">
              //                   <Dropdown
              //                     isOpen={settings_Menu}
              //                     toggle={toggleSettings}
              //                   >
              //                     <DropdownToggle
              //                       className="btn btn-ghost-secondary btn-icon"
              //                       tag="button"
              //                     >
              //                       <FeatherIcon
              //                         icon="more-vertical"
              //                         className="icon-sm"
              //                       />
              //                     </DropdownToggle>
              //                     <DropdownMenu>
              //                       <DropdownItem
              //                         href="#"
              //                         className="d-block d-lg-none user-profile-show"
              //                       >
              //                         <i className="ri-user-2-fill align-bottom text-muted me-2"></i>{" "}
              //                         View Profile
              //                       </DropdownItem>
              //                       <DropdownItem href="#">
              //                         <i className="ri-inbox-archive-line align-bottom text-muted me-2"></i>{" "}
              //                         Archive
              //                       </DropdownItem>
              //                       <DropdownItem href="#">
              //                         <i className="ri-mic-off-line align-bottom text-muted me-2"></i>{" "}
              //                         Muted
              //                       </DropdownItem>
              //                       <DropdownItem href="#">
              //                         {" "}
              //                         <i className="ri-delete-bin-5-line align-bottom text-muted me-2"></i>{" "}
              //                         Delete
              //                       </DropdownItem>
              //                     </DropdownMenu>
              //                   </Dropdown>
              //                 </li>
              //               </ul>
              //             </Col>
              //           </Row>
              //         </div>

              //         <div className="position-relative" id="users-chat">
              //           <SimpleBar
              //             className="chat-conversation p-3 p-lg-4"
              //             id="chat-conversation"
              //             ref={containerRef}
              //           >
              //             <div id="elmLoader"></div>
              //             <ul
              //               className="list-unstyled chat-conversation-list"
              //               id="users-conversation"
              //             >
              //               {activeOpenChat?.id &&
              //                 activeOpenChat?.messages.map((message, key) => (
              //                   <li
              //                     className={
              //                       message.sender.type === "visitor"
              //                         ? "chat-list left"
              //                         : "chat-list right"
              //                     }
              //                     key={key}
              //                   >
              //                     <div className="conversation-list">
              //                       <div className="user-chat-content">
              //                         <div className="ctext-wrap">
              //                           <div className="ctext-wrap-content shadow-none">
              //                             <p className="mb-0 ctext-content">
              //                               {message.content}
              //                             </p>
              //                           </div>

              //                           <UncontrolledDropdown className="align-self-start message-box-drop">
              //                             <DropdownToggle
              //                               href="#"
              //                               className="btn nav-btn"
              //                               tag="i"
              //                             >
              //                               <i className="ri-more-2-fill"></i>
              //                             </DropdownToggle>
              //                             <DropdownMenu>
              //                               <DropdownItem
              //                                 href="#"
              //                                 className="reply-message"
              //                                 onClick={() => setreply(message)}
              //                               >
              //                                 {" "}
              //                                 <i className="ri-reply-line me-2 text-muted align-bottom"></i>
              //                                 Reply
              //                               </DropdownItem>
              //                               <DropdownItem href="#">
              //                                 <i className="ri-share-line me-2 text-muted align-bottom"></i>
              //                                 Forward
              //                               </DropdownItem>
              //                               <DropdownItem href="#">
              //                                 <i className="ri-file-copy-line me-2 text-muted align-bottom"></i>
              //                                 Copy
              //                               </DropdownItem>
              //                               <DropdownItem href="#">
              //                                 <i className="ri-bookmark-line me-2 text-muted align-bottom"></i>
              //                                 Bookmark
              //                               </DropdownItem>
              //                               <DropdownItem
              //                                 href="#"
              //                                 onClick={() =>
              //                                   dispatch(
              //                                     onDeleteMessage(message.id)
              //                                   )
              //                                 }
              //                               >
              //                                 <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
              //                                 Delete
              //                               </DropdownItem>
              //                             </DropdownMenu>
              //                           </UncontrolledDropdown>
              //                         </div>
              //                         <div className="conversation-name">
              //                           {message.sender.type === "agent" ? (
              //                             <small className="text-muted time">
              //                               {message.sender.name}
              //                             </small>
              //                           ) : null}{" "}
              //                           <small className="text-muted time">
              //                             {moment(message.createdAt).fromNow()}
              //                           </small>{" "}
              //                           <span className="text-success check-message-icon">
              //                             <i className="ri-check-double-line align-bottom"></i>
              //                           </span>
              //                         </div>
              //                       </div>
              //                     </div>
              //                   </li>
              //                 ))}
              //               {isTyping && (
              //                 <li className="chat-list left ">
              //                   <div className="conversation-list ">
              //                     <div className="user-chat-content ">
              //                       <div className="ctext-wrap ">
              //                         <div className="ctext-wrap-content shadow-none typing-indicator">
              //                           {/* <p className="mb-0 ctext-content ">...</p> */}
              //                           <div className="typing-dot"></div>
              //                           <div className="typing-dot"></div>
              //                           <div className="typing-dot"></div>
              //                         </div>
              //                       </div>
              //                     </div>
              //                   </div>
              //                 </li>
              //               )}
              //             </ul>
              //           </SimpleBar>
              //           <div
              //             className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show "
              //             id="copyClipBoard"
              //             role="alert"
              //           >
              //             Message copied
              //           </div>
              //           {emojiPicker && (
              //             <div className="alert pickerEmoji">
              //               <Picker
              //                 disableSearchBar={true}
              //                 // onEmojiClick={onEmojiClick}
              //               />
              //             </div>
              //           )}
              //         </div>

              //         <div className="chat-input-section p-3 p-lg-4">
              //           <form id="chatinput-form" onSubmit={handleSendMessage}>
              //             <Row className="g-0 align-items-center">
              //               {/* <div className="col-auto">
              //                 <div className="chat-input-links me-2">
              //                   <div className="links-list-item">
              //                     <button
              //                       type="button"
              //                       className="btn btn-link text-decoration-none emoji-btn"
              //                       id="emoji-btn"
              //                       onClick={() => setemojiPicker(!emojiPicker)}
              //                     >
              //                       <i className="bx bx-smile align-middle"></i>
              //                     </button>
              //                   </div>
              //                 </div>
              //               </div> */}

              //               <div className="col">
              //                 <div className="chat-input-feedback">
              //                   Please Enter a Message
              //                 </div>
              //                 <input
              //                   type="text"
              //                   value={curMessage}
              //                   onKeyPress={onKeyPress}
              //                   onChange={handleTypingMessage}
              //                   className="form-control chat-input bg-light border-light fs-13"
              //                   id="chat-input"
              //                   placeholder="Type your message..."
              //                 />
              //               </div>
              //               <div className="col-auto">
              //                 <div className="chat-input-links ms-2">
              //                   <div className="links-list-item">
              //                     <Button
              //                       type="submit"
              //                       color="primary"
              //                       className="chat-send waves-effect waves-light fs-13"
              //                     >
              //                       <i className="ri-send-plane-2-fill align-bottom"></i>
              //                     </Button>
              //                   </div>
              //                 </div>
              //               </div>
              //             </Row>
              //           </form>
              //         </div>

              //         <div className={reply ? "replyCard show" : "replyCard"}>
              //           <Card className="mb-0">
              //             <CardBody className="py-3">
              //               <div className="replymessage-block mb-0 d-flex align-items-start">
              //                 <div className="flex-grow-1">
              //                   <h5 className="conversation-name">
              //                     {reply && reply.sender}
              //                   </h5>
              //                   <p className="mb-0">{reply && reply.message}</p>
              //                 </div>
              //                 <div className="flex-shrink-0">
              //                   <button
              //                     type="button"
              //                     id="close_toggle"
              //                     className="btn btn-sm btn-link mt-n2 me-n3 fs-18"
              //                     onClick={() => setreply("")}
              //                   >
              //                     <i className="bx bx-x align-middle"></i>
              //                   </button>
              //                 </div>
              //               </div>
              //             </CardBody>
              //           </Card>
              //         </div>
              //       </div>
              //     </div>
              //   </div>
              // </div>

              <ActiveOpenChat
                activeOpenChat={activeOpenChat}
                isTyping={isTyping}
              />
            ) : (
              // <div
              //   style={{
              //     display: "flex",
              //     flexDirection: "column",
              //     alignItems: "center",
              //     width: "100%",
              //     marginTop: "100px",
              //   }}
              // >
              //   <div>
              //     <img
              //       src={NoChatIcon}
              //       alt="no-active-conversation-icon"
              //       style={{ width: "100px", height: "100px" }}
              //     />
              //   </div>
              //   <div
              //     style={{
              //       display: "flex",
              //       flexDirection: "column",
              //       alignItems: "center",
              //     }}
              //   >
              //     <p
              //       style={{
              //         fontSize: "45px",
              //         fontWeight: "bold",
              //         margin: "0",
              //         color: "#495057",
              //       }}
              //     >
              //       No Active Conversation
              //     </p>

              //     <p style={{ fontSize: "20px", margin: "0" }}>
              //       Please click on visitor's chat to see their messages
              //     </p>
              //   </div>

              //   <div style={{ marginTop: "40px" }}>
              //     <button className="btn btn-primary">
              //       See your open chats
              //     </button>
              //   </div>
              // </div>

              <NoActiveConversation />
            )}
          </div>
        </Container>
      </div>

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
