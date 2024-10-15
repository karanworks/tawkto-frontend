import React from "react";
import { Input } from "reactstrap";

function ChatWidgetSettings({
  welcomeMessage,
  handleChangeWelcomeMessage,
  handleChangeWidgetColor,
  suggestedMessages,
  setSuggestedMessages,
}) {
  function handleSuggestedMessage() {
    setSuggestedMessages([
      ...suggestedMessages,
      { id: suggestedMessages.length + 1, message: "" },
    ]);
  }

  function handleDeleteSuggestedMessage(messageId) {
    const filteredSuggestedMessages = suggestedMessages?.filter(
      (message) => message.id !== messageId
    );

    setSuggestedMessages(filteredSuggestedMessages);
  }

  function handleChangeSuggestedMessage(e, messageId) {
    const messageValue = e.target.value;

    const modifiedSuggestedMessage = suggestedMessages.map((message) => {
      if (message.id === messageId) {
        return { id: message.id, message: messageValue };
      } else {
        return message;
      }
    });

    setSuggestedMessages(modifiedSuggestedMessage);
  }

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <div
          style={{
            marginBottom: "5px",
            fontWeight: "bold",
            color: "#495057",
          }}
        >
          <span>Logo</span>
        </div>
        <div
          style={{
            width: "70px",
            height: "70px",
            background: "#25A0E2",
            borderRadius: "5px",
          }}
        ></div>
      </div>
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            marginBottom: "5px",
            fontWeight: "bold",
            color: "#495057",
          }}
        >
          <span>Color</span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#005EFF",
              height: "30px",
              width: "30px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleChangeWidgetColor("#005EFF")}
          ></div>
          <div
            style={{
              background: "#D42300",
              height: "30px",
              width: "30px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleChangeWidgetColor("#D42300")}
          ></div>
          <div
            style={{
              background: "#7866FF",
              height: "30px",
              width: "30px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleChangeWidgetColor("#7866FF")}
          ></div>
          <div
            style={{
              background: "#03A84E",
              height: "30px",
              width: "30px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleChangeWidgetColor("#03A84E")}
          ></div>
          <div style={{ width: "100px" }}>
            <input
              type="color"
              className="form-control form-control-color w-100"
              id="colorPicker"
              value="#a6003a"
              onChange={(e) => handleChangeWidgetColor(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <div
          style={{
            marginBottom: "5px",
            fontWeight: "bold",
            color: "#495057",
          }}
        >
          <span>Welcome Message</span>
        </div>
        <Input
          id="welcomeMessage"
          name="welcomeMessage"
          type="textarea"
          style={{ width: "50%" }}
          value={welcomeMessage}
          onChange={handleChangeWelcomeMessage}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <div
          style={{
            marginBottom: "5px",
            fontWeight: "bold",
            color: "#495057",
          }}
        >
          <span>Suggested Message</span>
        </div>

        <div>
          {suggestedMessages.map((message) => (
            <div
              style={{
                marginBottom: "5px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                width: "300px",
              }}
            >
              <Input
                value={message.message}
                onChange={(e) => handleChangeSuggestedMessage(e, message.id)}
              />

              <div
                onClick={() => handleDeleteSuggestedMessage(message.id)}
                style={{ cursor: "pointer" }}
              >
                <i
                  className="ri-delete-bin-6-line"
                  style={{ color: "#828282" }}
                ></i>
              </div>
            </div>
          ))}
          {suggestedMessages.length === 4 ? null : (
            <button
              type="button"
              className="btn btn-outline-primary waves-effect waves-light"
              onClick={handleSuggestedMessage}
            >
              Add Message
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatWidgetSettings;
