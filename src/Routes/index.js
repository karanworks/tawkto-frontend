import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected } from "./AuthProtected";
// import Joyride, { CallBackProps, EVENTS } from "react-joyride";
// import { useNavigate } from "react-router-dom";
// import { handleNextStep, handleRunningStatus } from "../slices/Tour/reducer";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

const Index = () => {
  // const { tourState } = useSelector((state) => state.Tour);
  // const { run, steps, stepIndex } = tourState;

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

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
      <Routes>
        <Route>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
              key={idx}
              exact={true}
            />
          ))}
        </Route>

        <Route>
          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AuthProtected>
                  <VerticalLayout>{route.component}</VerticalLayout>
                </AuthProtected>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Route>
      </Routes>
      {/* <Joyride
          callback={handleCallback}
          continuous
          run={run}
          stepIndex={stepIndex}
          steps={steps}
        /> */}
    </React.Fragment>
  );
};

export default Index;
