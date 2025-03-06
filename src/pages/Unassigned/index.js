import React, { useEffect, useState, useRef } from "react";
import {
  Container,
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
import { Link, useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";
import Select from "react-select";
import NoChatIcon from "./no-chat-icon.svg";

//Import Icons
import FeatherIcon from "feather-icons-react";
import PersonalInfo from "./PersonalInfo";

//redux
import { useSelector, useDispatch } from "react-redux";

import avatar2 from "../../assets/images/users/avatar-2.jpg";

import "react-perfect-scrollbar/dist/css/styles.css";
import socket from "../../socket/socket";
import { getLoggedInUser } from "../../helpers/fakebackend_helper";
import {
  getChatRequestMessages,
  getUnassignedChats,
} from "../../slices/Unassigned/thunk";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import {
  handleOpenActiveChat,
  handleIncomingMessageUpdate,
  handleVisitorRequestUpdate,
} from "../../slices/Unassigned/reducer";
import { handleOpenActiveChat as handleOpenActiveChatMyOpen } from "../../slices/MyOpen/reducer";

const SingleOptions = [
  { value: "Choices 1", label: "Choices 1" },
  { value: "Choices 2", label: "Choices 2" },
  { value: "Choices 3", label: "Choices 3" },
  { value: "Choices 4", label: "Choices 4" },
];

const Unassigned = () => {
  const [customActiveTab, setcustomActiveTab] = useState("1");

  const ref = useRef();
  const dispatch = useDispatch();
  const [isInfoDetails, setIsInfoDetails] = useState(false);
  const [Chat_Box_Username, setChat_Box_Username] = useState(avatar2);
  const [Chat_Box_Image, setChat_Box_Image] = useState(avatar2);
  const [curMessage, setcurMessage] = useState("");
  const [settings_Menu, setsettings_Menu] = useState(false);
  const [reply, setreply] = useState("");

  const [selectedSingle, setSelectedSingle] = useState(null);

  const { unassignedChats, activeChat } = useSelector(
    (state) => state.Unassigned
  );

  const loggedInUser = getLoggedInUser();
  const workspace = JSON.parse(localStorage.getItem("workspace"));
  const navigate = useNavigate();

  useEffect(() => {
    if (workspace) {
      dispatch(
        getUnassignedChats({
          agentId: loggedInUser.id,
          workspaceId: workspace.id,
        })
      );
    }
  }, [dispatch]);

  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle);
  }

  function handleVisitorMessageRequest(chatRequest) {
    dispatch(handleVisitorRequestUpdate(chatRequest));
  }

  useEffect(() => {
    socket.on("visitor-message-request", handleVisitorMessageRequest);

    return () => {
      socket.off("visitor-message-request", handleVisitorMessageRequest);
    };
  });

  const handleMessage = (message) => {
    dispatch(handleIncomingMessageUpdate(message));
  };

  useEffect(() => {
    socket.on("message", handleMessage);
    return () => {
      socket.off("message", handleMessage);
    };
  }, [handleMessage]);

  useEffect(() => {
    const handleJoinedConversation = (data) => {
      navigate("/my-open");
    };

    socket.on("joined-conversation", handleJoinedConversation);

    return () => {
      socket.off("joined-conversation", handleJoinedConversation);
    };
  }, [activeChat, dispatch, navigate]);

  function handleActiveChat(chatId) {
    dispatch(getChatRequestMessages({ chatId })).then((res) => {
      dispatch(handleOpenActiveChat(res.payload.data));
    });
  }

  //Info details offcanvas
  const toggleInfo = () => {
    setIsInfoDetails(!isInfoDetails);
  };

  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu);
  };

  function handleJoinConversation() {
    socket.emit("join-conversation", {
      agentId: loggedInUser.id,
      visitorId: activeChat.visitorId,
      chatId: activeChat.id,
      workspaceId: workspace.id,
    });

    dispatch(handleOpenActiveChat(null));

    dispatch(handleOpenActiveChatMyOpen(activeChat));

    // toast.success("Chat moved to open chats !", {
    //   position: "bottom-center",
    //   autoClose: 3000,
    //   theme: "colored",
    // });
  }

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
                    <h5 className="mb-4">👋 Unassigned</h5>
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
                    {/* className="active" removed this class because it was changin the text color as well will modify it in the future */}

                    {(unassignedChats || []).map((request, i) => (
                      <li
                        style={{
                          background:
                            activeChat?.id === request?.id
                              ? "#F3F6F9"
                              : "transparent",
                        }}
                        key={i}
                        onClick={() => handleActiveChat(request.id)}
                      >
                        <Link to="#" onClick={(e) => {}}>
                          <div className="d-flex align-items-center">
                            <div
                              className={`flex-shrink-0 chat-user-img ${
                                request?.status &&
                                request.status.status === "online"
                                  ? "online"
                                  : "away"
                              } align-self-start me-2 ms-0`}
                            >
                              <div className="avatar-xxs">
                                <div
                                  className={
                                    "avatar-title rounded-circle bg-primary userprofile"
                                  }
                                >
                                  {/* {request.visitor.name.charAt(0)} */}
                                  {/* {request.messages.length !== 0 &&
                                    request.messages[
                                      request.messages.length - 1
                                    ].sender.name.charAt(0)} */}
                                  {request.visitor.name.charAt(0)}
                                </div>
                              </div>

                              <span className="user-status"></span>
                            </div>
                            <div className="flex-grow-1 overflow-hidden">
                              <div className="d-flex justify-content-between">
                                <p className="text-truncate mb-0 text-muted">
                                  {/* {request.visitor.name} */}
                                  {/* {request.messages.length !== 0 &&
                                    request.messages[
                                      request.messages.length - 1
                                    ].sender.name} */}
                                  {request.visitor.name}
                                </p>
                                <p className="mb-0 text-muted">
                                  {moment(request.createdAt).fromNow()}
                                </p>
                              </div>

                              <div className="d-flex justify-content-between">
                                <p className="text-truncate mb-0">
                                  {request.messages.length !== 0 &&
                                    request.messages[
                                      request.messages.length - 1
                                    ].content}
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

            {activeChat?.id ? (
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
                              <div className="flex-grow-1 ">
                                <div className="d-flex align-items-center">
                                  <div className="mb-3">
                                    <Select
                                      value={selectedSingle}
                                      onChange={() => {
                                        handleSelectSingle();
                                      }}
                                      options={SingleOptions}
                                      className="form-select-sm"
                                      placeholder="Select Assignee"
                                    />
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
                        >
                          <div id="elmLoader"></div>
                          <ul
                            className="list-unstyled chat-conversation-list"
                            id="users-conversation"
                          >
                            {activeChat?.id &&
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
                                        ) : null}
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
                      </div>

                      <div
                        className="chat-input-section p-3 p-lg-4"
                        style={{ borderTop: "1px solid #E9EBEC" }}
                      >
                        <Row className="g-0 align-items-center">
                          <div className="col d-flex flex-column align-items-center justify-center">
                            <button
                              type="button"
                              className="btn btn-primary "
                              onClick={() => handleJoinConversation()}
                            >
                              Join Conversation
                            </button>
                            <p className="text-muted">To start typing</p>
                            {/* <input
                              type="text"
                              value={curMessage}
                              onKeyPress={onKeyPress}
                              onChange={(e) => setcurMessage(e.target.value)}
                              className="form-control chat-input bg-light border-light fs-13"
                              id="chat-input"
                              placeholder="Type your message..."
                            /> */}
                          </div>
                        </Row>
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
      <ToastContainer />
    </React.Fragment>
  );
};

export default Unassigned;
