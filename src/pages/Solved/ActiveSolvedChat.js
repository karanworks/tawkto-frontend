import React, { useEffect, useRef, useState } from "react";
import {
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
import { Link, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import SimpleBar from "simplebar-react";
import socket from "../../socket/socket";
import moment from "moment/moment";
import { getLoggedInUser } from "../../helpers/fakebackend_helper";
import { updateSolvedChat } from "../../slices/Solved/thunk";
import { useDispatch } from "react-redux";
import { handleOpenActiveChat } from "../../slices/MyOpen/reducer";

function ActiveSolvedChat({ activeSolvedChat, isTyping }) {
  const [isInfoDetails, setIsInfoDetails] = useState(false);
  const [settings_Menu, setsettings_Menu] = useState(false);
  const [emojiPicker, setemojiPicker] = useState(false);
  const [curMessage, setcurMessage] = useState("");
  const [reply, setreply] = useState("");

  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const loggedInUser = getLoggedInUser();
  const workspace = JSON.parse(localStorage.getItem("workspace"));
  const navigate = useNavigate();

  const toggleInfo = () => {
    setIsInfoDetails(!isInfoDetails);
  };
  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu);
  };

  useEffect(() => {
    if (containerRef.current) {
      const simpleBar = containerRef.current;
      const contentEl = simpleBar.getScrollElement();
      contentEl.scrollTop = contentEl.scrollHeight;
    }
  }, [activeSolvedChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!curMessage) {
      return;
    }

    socket.emit("message", {
      message: { content: curMessage },
      chatId: activeSolvedChat.id,
      sender: {
        name: loggedInUser.name,
        agentId: loggedInUser.id,
        type: "agent",
      },
      to: activeSolvedChat.visitorId,
    });

    setcurMessage("");
  };

  function handleTypingMessage(e) {
    setcurMessage(e.target.value);
    socket.emit("typing", {
      user: {
        name: loggedInUser.name,
        agentId: loggedInUser.id,
        visitorId: activeSolvedChat.visitor.id,
        workspaceId: workspace.id,

        type: "agent",
      },
    });
  }

  const onKeyPress = (e) => {
    const { key } = e;
    if (key === "Enter") {
      e.preventDefault();

      socket.emit("message", {
        message: { content: curMessage },
        chatId: activeSolvedChat.id,
        sender: {
          name: loggedInUser.name,
          agentId: loggedInUser.id,
          type: "agent",
        },
        to: activeSolvedChat.visitorId,
      });

      setcurMessage("");
    }
  };

  function handleSolveChat(chatId) {
    dispatch(updateSolvedChat({ chatId, status: "accepted" })).then(() => {
      dispatch(handleOpenActiveChat(activeSolvedChat));
      navigate("/my-open");
    });
  }

  return (
    <div className="user-chat w-100 overflow-hidden border">
      <div className="chat-content d-lg-flex">
        <div className="w-100 overflow-hidden position-relative">
          <div className="position-relative">
            <div className="p-3 user-chat-topbar">
              <Row className="align-items-center">
                <Col sm={4} xs={8}>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 d-block d-lg-none me-3">
                      <Link to="#" className="user-chat-remove fs-18 p-1">
                        <i className="ri-arrow-left-s-line align-bottom"></i>
                      </Link>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <div
                        className="d-flex align-items-center"
                        style={{ gap: "10px" }}
                      >
                        <div className="avatar-xxs">
                          <div
                            className={
                              "avatar-title rounded-circle bg-primary userprofile"
                            }
                          >
                            {activeSolvedChat.visitor.name.charAt(0)}
                          </div>
                        </div>
                        <div className="flex-grow-1 overflow-hidden">
                          <div className="d-flex" style={{ gap: "8px" }}>
                            <h5 className="text-truncate mb-0 fs-16">
                              {/* <a
                                           className="text-reset username"
                                           data-bs-toggle="offcanvas"
                                           href="#userProfileCanvasExample"
                                           aria-controls="userProfileCanvasExample"
                                         > */}
                              {activeSolvedChat.visitor.name} -{/* </a> */}
                            </h5>
                            <h5 className="text-truncate mb-0 fs-16">
                              {/* <a
                                           className="text-reset username"
                                           data-bs-toggle="offcanvas"
                                           href="#userProfileCanvasExample"
                                           aria-controls="userProfileCanvasExample"
                                         > */}

                              {activeSolvedChat.visitor.email}
                              {/* </a> */}
                            </h5>
                          </div>
                          <p className="text-truncate text-muted fs-14 mb-0 userStatus">
                            {isTyping ? (
                              <small style={{ color: "#25A0E2" }}>
                                Typing ...
                              </small>
                            ) : (
                              <small>
                                {activeSolvedChat?.status &&
                                activeSolvedChat.status.status === "online"
                                  ? "Online"
                                  : "Offline"}
                              </small>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm={8} xs={4}>
                  <ul className="list-inline user-chat-nav text-end mb-0">
                    {/* <li
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
                        onClick={() => handleSolveChat(activeSolvedChat.id)}
                      >
                        <span>✅</span>
                        <span>Solve</span>
                      </button>
                    </li> */}
                    <li className="list-inline-item d-none d-lg-inline-block m-0">
                      <button
                        type="button"
                        className="btn btn-ghost-secondary btn-icon"
                        onClick={toggleInfo}
                      >
                        <FeatherIcon icon="info" className="icon-sm" />
                      </button>
                    </li>

                    <li className="list-inline-item m-0">
                      <Dropdown isOpen={settings_Menu} toggle={toggleSettings}>
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
                  {activeSolvedChat?.id &&
                    activeSolvedChat?.messages.map((message, key) => (
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
                                  <DropdownItem href="#">
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
                                      ch(onDeleteMessage(message.id))
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
                  {isTyping && (
                    <li className="chat-list left ">
                      <div className="conversation-list ">
                        <div className="user-chat-content ">
                          <div className="ctext-wrap ">
                            <div className="ctext-wrap-content shadow-none typing-indicator">
                              {/* <p className="mb-0 ctext-content ">...</p> */}
                              <div className="typing-dot"></div>
                              <div className="typing-dot"></div>
                              <div className="typing-dot"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
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
                    // onEmojiClick={onEmojiClick}
                  />
                </div>
              )}
            </div>

            <div
              className="chat-input-section p-3 p-lg-4"
              style={{ borderTop: "1px solid #E9EBEC" }}
            >
              <Row className="g-0 align-items-center">
                <div className="col d-flex flex-column align-items-center justify-center">
                  <p className="text-muted">
                    This conversation is marked as solved. Click the button to
                    start conversation with the same visitor.
                  </p>
                  {/* <input
                                         type="text"
                                         value={curMessage}
                                         onKeyPress={onKeyPress}
                                         onChange={(e) => setcurMessage(e.target.value)}
                                         className="form-control chat-input bg-light border-light fs-13"
                                         id="chat-input"
                                         placeholder="Type your message..."
                                       /> */}
                  <button
                    type="button"
                    className="btn btn-primary "
                    onClick={() => handleSolveChat(activeSolvedChat.id)}
                  >
                    Start Conversation
                  </button>
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
  );
}

export default ActiveSolvedChat;
