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

//Import Icons
import FeatherIcon from "feather-icons-react";
import PersonalInfo from "./PersonalInfo";

import { chatContactData } from "../../common/data";

import Picker from "emoji-picker-react";

//redux
import { useSelector, useDispatch } from "react-redux";

import avatar2 from "../../assets/images/users/avatar-2.jpg";
import userDummayImage from "../../assets/images/users/user-dummy-img.jpg";

//Import Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";
import { createSelector } from "reselect";
import { io } from "socket.io-client";
import {
  getSolvedChatMessages,
  getSolvedChats,
} from "../../slices/Solved/thunk";
import { getLoggedInUser } from "../../helpers/fakebackend_helper";
import ChatListItem from "./ChatListItem";
import { handleSolvedActiveChat } from "../../slices/Solved/reducer";
import ActiveSolvedChat from "./ActiveSolvedChat";
import NoActiveConversation from "./NoActiveConversation";
import socket from "../../socket/socket";

const Solved = () => {
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  const ref = useRef();
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
  const [isTyping, setIsTyping] = useState({});

  const dispatch = useDispatch();

  const workspace = JSON.parse(localStorage.getItem("workspace"));
  const loggedInUser = getLoggedInUser();

  const { solvedChats, activeSolvedChat } = useSelector(
    (state) => state.Solved
  );

  console.log("GETTING SOLVED CHATS FROM BACKEND ->", solvedChats);

  useEffect(() => {
    if (workspace) {
      dispatch(
        getSolvedChats({ workspaceId: workspace.id, agentId: loggedInUser?.id })
      );
    }
  }, [dispatch]);

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

  const scrollToBottom = useCallback(() => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
    }
  }, [messageBox]);

  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom();
  }, [messages, scrollToBottom]);

  const onKeyPress = (e) => {
    const { key, value } = e;
    if (key === "Enter") {
      e.preventDefault();
      setcurMessage(value);
      addMessage(currentRoomId, currentUser.name);
      sendMessage();
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

  //Search Message
  const searchMessages = () => {
    var searchInput, searchFilter, searchUL, searchLI, a, i, txtValue;
    searchInput = document.getElementById("searchMessage");
    searchFilter = searchInput.value.toUpperCase();
    searchUL = document.getElementById("users-conversation");
    searchLI = searchUL.getElementsByTagName("li");
    Array.prototype.forEach.call(searchLI, function (search) {
      a = search.getElementsByTagName("p")[0]
        ? search.getElementsByTagName("p")[0]
        : "";
      txtValue =
        a.textContent || a.innerText ? a.textContent || a.innerText : "";
      if (txtValue.toUpperCase().indexOf(searchFilter) > -1) {
        search.style.display = "";
      } else {
        search.style.display = "none";
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

  function handleActiveChat(chatId) {
    dispatch(getSolvedChatMessages({ chatId })).then((res) => {
      // setActiveChat(res.payload.data);
      dispatch(handleSolvedActiveChat(res.payload.data));
    });
  }

  function handleTypingStatus({ id: userId }) {
    setIsTyping((prevStatus) => ({
      ...prevStatus,
      [userId]: true,
    }));

    setTimeout(() => {
      setIsTyping((prevStatus) => ({
        ...prevStatus,
        [userId]: false,
      }));
    }, 2000);
  }

  useEffect(() => {
    socket.on("typing", handleTypingStatus);

    return () => {
      socket.off(handleTypingStatus);
    };
  }, []);

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
                    <h5 className="mb-4">✅ Solved</h5>
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
                    {/* className="active" removed this class because it was changin the text color as well will modify it in the future */}
                    {(solvedChats || []).map((chat, i) => (
                      <ChatListItem
                        key={chat.id}
                        chat={chat}
                        activeSolvedChat={activeSolvedChat}
                        handleActiveChat={handleActiveChat}
                        isTyping={isTyping[chat.visitor.id] || false}
                      />
                    ))}
                  </ul>
                </div>
              </SimpleBar>
            </div>

            {activeSolvedChat ? (
              <ActiveSolvedChat
                activeSolvedChat={activeSolvedChat}
                isTyping={isTyping[activeSolvedChat.visitor.id] || false}
              />
            ) : (
              <NoActiveConversation />
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

export default Solved;
