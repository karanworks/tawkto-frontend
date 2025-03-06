import React, { useEffect, useState } from "react";
import "./chatRequestAlert.css";
import { handleOpenActiveChat } from "../../slices/MyOpen/reducer";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import socket from "../../socket/socket";
import { getLoggedInUser } from "../../helpers/fakebackend_helper";
import { useNavigate } from "react-router-dom";
import { getOpenChats } from "../../slices/MyOpen/thunk";
import { getChatRequestMessages } from "../../slices/Unassigned/thunk";
import notificationSound from "../../assets/chatRequestAlert/notification-sound.ogg";

function ChatRequestAlert({ chat, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const workspace = JSON.parse(localStorage.getItem("workspace"));
  const loggedInUser = getLoggedInUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(chat.id); // Automatically remove the alert after 3 seconds
    }, 5000);

    return () => clearTimeout(timer); // Clear timeout if the component unmounts early
  }, [chat.id, onClose]);

  function handleJoinConversation() {
    socket.emit("join-conversation", {
      agentId: loggedInUser.id,
      visitorId: chat.visitorId,
      chatId: chat.id,
      workspaceId: workspace.id,
    });

    // dispatch(handleOpenActiveChatMyOpen(chat));

    dispatch(
      getOpenChats({ agentId: loggedInUser?.id, workspaceId: workspace.id })
    ).then(() => {
      navigate("/my-open");
      onClose(chat.id);

      return dispatch(getChatRequestMessages({ chatId: chat.id })).then(
        (res) => {
          dispatch(handleOpenActiveChat(res.payload.data));
        }
      );

      // return dispatch(handleOpenActiveChatMyOpen(chat));
    });

    // toast.success("Chat moved to open chats !", {
    //   position: "bottom-center",
    //   autoClose: 3000,
    //   theme: "colored",
    // });
  }

  return (
    <div className="chat-request-alert-container">
      <div className="chat-request-alert-wrapper">
        <div className="chat-request-alert-head">
          <div className="chat-request-alert-user-icon">
            <i className="ri-user-line"></i>
          </div>

          <div className="chat-request-alert-body-text">
            <span className="chat-request-alert-body-text-first">
              New Chat Request
            </span>
            <span className="chat-request-alert-body-text-second">
              {chat.visitor.name}
            </span>
          </div>
        </div>

        <div className="chat-request-alert-button-container">
          <button
            className="chat-request-alert-button"
            onClick={handleJoinConversation}
          >
            <span className="icon-on">
              <i className="ri-user-add-line align-bottom me-1"></i> Join
            </span>
          </button>
          <button
            className="chat-request-alert-button"
            onClick={() => onClose(chat.id)}
          >
            <span className="icon-on">
              <i className="ri-spam-3-line align-bottom me-1"></i> Ignore
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatRequestAlertStack() {
  const [alerts, setAlerts] = useState([]);

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  function handleVisitorMessageRequest(chatRequest) {
    const notificationRingtone = new Audio(notificationSound);

    notificationRingtone.play();

    setAlerts((prev) => [...prev, chatRequest]);
  }

  useEffect(() => {
    socket.on("visitor-message-request", handleVisitorMessageRequest);

    return () => {
      socket.off("visitor-message-request", handleVisitorMessageRequest);
    };
  }, []);

  return (
    <div className="chat-request-alert-stack">
      {alerts.map((alert) => (
        <ChatRequestAlert
          key={alert.id}
          // id={alert.id}
          // name={alert.visitor.name}
          chat={alert}
          onClose={removeAlert}
        />
      ))}
    </div>
  );
}

export default ChatRequestAlertStack;
