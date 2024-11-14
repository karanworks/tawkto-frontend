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

  if (Object.keys(user).length !== 0) {
    loggedInUser = user;
  } else if (getLoggedInUser()?.data) {
    loggedInUser = getLoggedInUser()?.data;
  } else {
    loggedInUser = null;
  }

  if (loggedInUser) {
    socket.emit("agent-join", {
      id: loggedInUser?.id,
      workspaceId: loggedInUser.workspace?.id,
    });

    console.log("AGENT JOIN EVENT RENDERED");
  }

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
