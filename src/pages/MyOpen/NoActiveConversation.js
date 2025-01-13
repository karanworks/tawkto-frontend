import React from "react";
import NoChatIcon from "./no-chat-icon.svg";

function NoActiveConversatino() {
  return (
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
        <button className="btn btn-primary">See your open chats</button>
      </div>
    </div>
  );
}

export default NoActiveConversatino;
