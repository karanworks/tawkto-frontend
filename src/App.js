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

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);

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

  // useEffect(() => {
  //   if (Object.keys(user).length === 0) {
  //     return;
  //   }

  //   socket.emit("agent-join", {
  //     id: user?.id,
  //     workspaceId: user.workspace?.id,
  //   });

  //   // Clean up socket event listener when component unmounts
  //   return () => {
  //     console.log("Cleaning up socket connection");
  //     socket.off("agent-join"); // Ensure cleanup if needed
  //   };
  // }, [user]);

  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;
