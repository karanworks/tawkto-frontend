import React from "react";
import FeatherIcon from "feather-icons-react";
import avatar from "./avatar.png";

function ChatWidgetPreview({
  widgetColour,
  welcomeMessage,
  suggestedMessages,
}) {
  return (
    <div className="widget-preview-wrapper">
      <div
        className="widget-preview-container"
        style={{
          width: "310px",
          height: "425px",
          border: "1px solid #dbdbdb",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          className="widget-head d-flex align-items-center justify-content-between"
          style={{
            height: "50px",
            background: `${widgetColour}`,
            paddingInline: "10px",
          }}
        >
          <div>
            <FeatherIcon
              icon="chevron-left"
              className="icon-dual"
              style={{
                color: "white",
              }}
            />
          </div>

          <div className="d-flex align-items-center" style={{ gap: "10px" }}>
            <FeatherIcon
              icon="menu"
              className="icon-dual"
              style={{
                color: "white",
              }}
            />
            <FeatherIcon
              icon="x"
              className="icon-dual"
              style={{
                color: "white",
              }}
            />
          </div>
        </div>
        <div
          className="widget-body d-flex flex-column justify-content-end "
          style={{
            height: "325px",
            gap: "5px",
            paddingInline: "5px",
          }}
        >
          <div
            className="widget-chat d-flex align-items-center"
            style={{ gap: "5px" }}
          >
            <img
              src={avatar}
              style={{
                width: "35px",
                height: "35px",
              }}
            />

            <div
              style={{
                background: `${widgetColour}`,
                color: "white",
                paddingBlock: "5px",
                paddingInline: "8px",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
              }}
            >
              <span>{welcomeMessage}</span>
            </div>
          </div>

          {suggestedMessages?.map(
            (message) =>
              message.message && (
                <div
                  className="widget-chat d-flex align-items-center"
                  style={{
                    gap: "5px",
                    marginLeft: "auto",
                  }}
                  key={message.id}
                >
                  <div
                    style={{
                      //   background: "#25A0E2",
                      color: `${widgetColour}`,
                      border: `1px solid ${widgetColour}`,
                      paddingBlock: "3px",
                      paddingInline: "8px",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                      borderBottomLeftRadius: "8px",
                    }}
                  >
                    <span>{message.message}</span>
                  </div>
                  <img
                    src={avatar}
                    style={{
                      width: "35px",
                      height: "35px",
                    }}
                  />
                </div>
              )
          )}
        </div>
        <div
          className="widget-footer d-flex justify-content-between align-items-center"
          style={{
            borderTop: "1px solid #dbdbdb",
            paddingInline: "10px",
            height: "40px",
            marginTop: "10px",
          }}
        >
          <div>
            <span className="text-muted">Type your message here...</span>
          </div>

          <div className="d-flex align-items-center" style={{ gap: "10px" }}>
            <i
              className="ri-thumb-up-line"
              style={{
                fontSize: "20px",
                color: "gray",
              }}
            ></i>
            <i
              className="ri-link"
              style={{
                fontSize: "20px",
                color: "gray",
              }}
            ></i>
            <i
              className="ri-emotion-happy-line"
              style={{
                fontSize: "20px",
                color: "gray",
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWidgetPreview;
