import React from "react";
import { Link } from "react-router-dom";

function ChatListItem({ chat, activeSolvedChat, handleActiveChat, isTyping }) {
  console.log("IS TYPING STATUS UPDATES  ->", chat);

  return (
    <li
      style={{
        background:
          activeSolvedChat?.id === chat?.id ? "#F3F6F9" : "transparent",
      }}
      onClick={() => handleActiveChat(chat.id)}
    >
      <Link to="#" onClick={(e) => {}}>
        <div className="d-flex align-items-center">
          <div
            className={`flex-shrink-0 chat-user-img ${
              chat?.status && chat.status.status === "online"
                ? "online"
                : "away"
            } align-self-start me-2 ms-0`}
          >
            <div className="avatar-xxs">
              <div
                className={"avatar-title rounded-circle bg-primary userprofile"}
              >
                {/* {request.visitor.name.charAt(0)} */}
                {/* {request.messages.length !== 0 &&
                                        request.messages[
                                          request.messages.length - 1
                                        ].sender.name.charAt(0)} */}

                {chat.visitor.name.charAt(0)}
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
                {chat.visitor.name}
              </p>
              <p className="mb-0 text-muted">8min</p>
            </div>

            <div className="d-flex justify-content-between">
              {isTyping ? (
                <div style={{ color: "#25A0E2" }}>Typing ...</div>
              ) : (
                <>
                  {" "}
                  <p className="text-truncate mb-0">
                    {chat.messages.length !== 0 &&
                      chat.messages[chat.messages.length - 1].content}
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
                    <p className="mb-0">{chat.messages.length}</p>
                  </div>{" "}
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ChatListItem;
