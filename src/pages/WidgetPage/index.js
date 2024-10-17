import React from "react";
import FeatherIcon from "feather-icons-react";
import avatar from "./avatar.png";

const WidgetPage = () => {
  const suggestedMessages = [
    { id: 1, message: "I have a question" },
    { id: 2, message: "Tell me more" },
  ];

  document.title = "Widget Page";
  return (
    <div>
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
            className="widget-head"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "50px",
              background: `#44AEE6`,
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

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
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
            className="widget-body"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              height: "325px",
              gap: "5px",
              paddingInline: "5px",
            }}
          >
            <div
              className="widget-chat"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
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
                  background: `#44AEE6`,
                  color: "white",
                  paddingBlock: "5px",
                  paddingInline: "8px",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
              >
                <span> Hey, How are you doing</span>
              </div>
            </div>

            {suggestedMessages?.map(
              (message) =>
                message.message && (
                  <div
                    className="widget-chat"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      marginLeft: "auto",
                    }}
                    key={message.id}
                  >
                    <div
                      style={{
                        color: `#44AEE6`,
                        border: `1px solid #44AEE6`,
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
            className="widget-footer"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #dbdbdb",
              height: "40px",
              marginTop: "10px",
            }}
          >
            <div>
              <input
                type="text"
                placeholder="Type your message here..."
                style={{ width: "200px", border: "none", paddingLeft: "10px" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                style={{
                  border: "none",
                  background: "white",
                }}
              >
                <i
                  className="ri-thumb-up-line"
                  style={{
                    fontSize: "20px",
                    color: "gray",
                  }}
                ></i>
              </button>

              <button
                style={{
                  border: "none",
                  background: "white",
                }}
              >
                <i
                  className="ri-link"
                  style={{
                    fontSize: "20px",
                    color: "gray",
                  }}
                ></i>
              </button>

              <button
                style={{
                  border: "none",
                  background: "white",
                }}
              >
                <i
                  className="ri-emotion-happy-line"
                  style={{
                    fontSize: "20px",
                    color: "gray",
                  }}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetPage;
