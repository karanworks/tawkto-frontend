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
// import Joyride, { EVENTS } from "react-joyride";
// import { useNavigate } from "react-router-dom";
// import { handleNextStep, handleRunningStatus } from "./slices/Tour/reducer";

// Activating fake backend
fakeBackend();

function App() {
  let loggedInUser;

  const { user } = useSelector((state) => state.Login);
  // const { tourState } = useSelector((state) => state.Tour);
  // const { run, steps, stepIndex } = tourState;

  loggedInUser =
    Object.keys(user).length !== 0 ? user : getLoggedInUser() || null;

  // useEffect(() => {
  //   // Restart tour after login
  //   if (loggedInUser) {
  //     dispatch(handleRunningStatus(true)); // Start tour
  //   }
  // }, [loggedInUser, dispatch]);

  const workspace = JSON.parse(localStorage.getItem("workspace"));

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  console.log("APP COMPONENT RENDERED");

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
  }, [loggedInUser, workspace?.id, dispatch]);

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

  // const handleCallback = (data) => {
  //   const {
  //     action,
  //     index,
  //     step: {
  //       data: { next, previous },
  //     },
  //     type,
  //   } = data;
  //   const isPreviousAction = action === "prev";

  //   if (type === EVENTS.STEP_AFTER) {
  //     if (index < 2) {
  //       dispatch(handleNextStep(1));
  //       // setState({ run: false });
  //       navigate(isPreviousAction && previous ? previous : next);
  //     }

  //     if (index === 1) {
  //       if (isPreviousAction && previous) {
  //         // setState({ run: false });
  //         dispatch(handleNextStep(0));
  //         navigate(previous);
  //       } else {
  //         dispatch(handleRunningStatus(false));
  //         // setState({ run: false, stepIndex: 0, tourActive: false });
  //       }
  //     }
  //   }
  // };

  return (
    <React.Fragment>
      <Route />
      {/* <Joyride
        callback={handleCallback}
        continuous
        run={run}
        stepIndex={stepIndex}
        steps={steps}
        debug={true}
      /> */}
    </React.Fragment>
  );
}

export default App;
