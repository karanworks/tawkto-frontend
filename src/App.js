import React, { useEffect, useState } from "react";
import socket from "./socket/socket";

//import Scss
import "./assets/scss/themes.scss";

//imoprt Route
import Route from "./Routes";
// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

import fakeBackend from "./helpers/AuthType/fakeBackend";
import { useSelector } from "react-redux";
import { getLoggedInUser } from "./helpers/fakebackend_helper";
import { handleVisitorOnlineStatus } from "./slices/MyOpen/reducer";
import { handleVisitorOnlineStatus as handleVisitorOnlineStatusUnassigned } from "./slices/Unassigned/reducer";
import { useDispatch } from "react-redux";

// Activating fake backend
fakeBackend();

function App() {
  let loggedInUser;

  const { user } = useSelector((state) => state.Login);

  const workspace = JSON.parse(localStorage.getItem("workspace"));

  const dispatch = useDispatch();

  if (Object.keys(user).length !== 0) {
    loggedInUser = user;
  } else if (getLoggedInUser()) {
    loggedInUser = getLoggedInUser();
  } else {
    loggedInUser = null;
  }

  useEffect(() => {
    if (loggedInUser && workspace?.id) {
      console.log("WORKSPACE ID WHILE AGENT JOIN ->", workspace?.id);

      socket.emit("agent-join", {
        agentId: loggedInUser?.id,
        workspaceId: workspace?.id,
      });
    }
  }, [loggedInUser, workspace?.id]);

  function handleVisitorOnlineStaus(status) {
    console.log("USER ONLINE STATUS ->", status);
    dispatch(handleVisitorOnlineStatus(status));
    dispatch(handleVisitorOnlineStatusUnassigned(status));
  }

  useEffect(() => {
    socket.on("visitor-status-update", handleVisitorOnlineStaus);

    return () => {
      socket.off("visitor-status-update", handleVisitorOnlineStaus);
    };
  }, []);

  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;
