import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withRouter from "../Components/Common/withRouter";

//import Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import RightSidebar from "../Components/Common/RightSidebar";
import Joyride, { EVENTS } from "react-joyride";
import { handleNextStep, handleRunningStatus } from "../slices/Tour/reducer";

//import actions
import {
  changeLayout,
  changeSidebarTheme,
  changeLayoutMode,
  changeLayoutWidth,
  changeLayoutPosition,
  changeTopbarTheme,
  changeLeftsidebarSizeType,
  changeLeftsidebarViewType,
  changeSidebarVisibility,
} from "../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import ChatRequestAlertStack from "../pages/ChatRequestAlert";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../helpers/fakebackend_helper";
import { updateTourStatus } from "../slices/Tour/thunk";

const Layout = (props) => {
  const [headerClass, setHeaderClass] = useState("");
  const { tourState, isWorkspaceCreated } = useSelector((state) => state.Tour);
  const { run, steps, stepIndex } = tourState;

  const loggedInUser = getLoggedInUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state.Layout;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      layoutType: layout.layoutType,
      leftSidebarType: layout.leftSidebarType,
      layoutModeType: layout.layoutModeType,
      layoutWidthType: layout.layoutWidthType,
      layoutPositionType: layout.layoutPositionType,
      topbarThemeType: layout.topbarThemeType,
      leftsidbarSizeType: layout.leftsidbarSizeType,
      leftSidebarViewType: layout.leftSidebarViewType,
      leftSidebarImageType: layout.leftSidebarImageType,
      preloader: layout.preloader,
      sidebarVisibilitytype: layout.sidebarVisibilitytype,
    })
  );
  // Inside your component
  const {
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
    preloader,
    sidebarVisibilitytype,
  } = useSelector(selectLayoutProperties);
  // class add remove in header
  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });
  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setHeaderClass("topbar-shadow");
    } else {
      setHeaderClass("");
    }
  }
  /*
    layout settings
    */
  useEffect(() => {
    if (
      layoutType ||
      leftSidebarType ||
      layoutModeType ||
      layoutWidthType ||
      layoutPositionType ||
      topbarThemeType ||
      leftsidbarSizeType ||
      leftSidebarViewType ||
      sidebarVisibilitytype
    ) {
      window.dispatchEvent(new Event("resize"));
      dispatch(changeLeftsidebarViewType(leftSidebarViewType));
      dispatch(changeLeftsidebarSizeType(leftsidbarSizeType));
      dispatch(changeSidebarTheme(leftSidebarType));
      dispatch(changeLayoutMode(layoutModeType));
      dispatch(changeLayoutWidth(layoutWidthType));
      dispatch(changeLayoutPosition(layoutPositionType));
      dispatch(changeTopbarTheme(topbarThemeType));
      dispatch(changeLayout(layoutType));
      dispatch(changeSidebarVisibility(sidebarVisibilitytype));
    }
  }, [
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    sidebarVisibilitytype,
    dispatch,
  ]);
  /*
    call dark/light mode
    */
  const onChangeLayoutMode = (value) => {
    if (changeLayoutMode) {
      dispatch(changeLayoutMode(value));
    }
  };

  useEffect(() => {
    if (
      sidebarVisibilitytype === "show" ||
      layoutType === "vertical" ||
      layoutType === "twocolumn"
    ) {
      document.querySelector(".hamburger-icon")?.classList.remove("open");
    } else {
      document.querySelector(".hamburger-icon")?.classList.add("open");
    }
  }, [sidebarVisibilitytype, layoutType]);

  const handleCallback = (data) => {
    const {
      action,
      index,
      step: {
        data: { next, previous },
      },
      type,
    } = data;
    const isPreviousAction = action === "prev";

    console.log("DATA ON TOUR SKIP ->", data);
    console.log("EVENT ON TOUR SKIP ->", EVENTS);

    if (action === "skip" && type === EVENTS.TOUR_END) {
      dispatch(updateTourStatus()).then(() => {
        localStorage.setItem(
          "authUser",
          JSON.stringify({
            ...loggedInUser,
            isTourCompleted: true,
          })
        );
        sessionStorage.setItem(
          "authUser",
          JSON.stringify({
            ...loggedInUser,
            isTourCompleted: true,
          })
        );
      });
    }

    if (type === EVENTS.STEP_AFTER) {
      if (index < 1) {
        dispatch(handleNextStep(1));
        navigate(isPreviousAction && previous ? previous : next);
      }

      if (index === 1) {
        if (isPreviousAction && previous) {
          navigate(previous);
        } else {
          navigate(isPreviousAction && previous ? previous : next);
          setTimeout(() => {
            dispatch(handleRunningStatus(true));
          }, 400);
        }
      }

      if (index === 2) {
        if (isPreviousAction && previous) {
          dispatch(handleNextStep(1));
          navigate(previous);
        } else {
          dispatch(handleNextStep(3));
          navigate(isPreviousAction && previous ? previous : next);
        }
      }

      if (index === 3) {
        if (isPreviousAction && previous) {
          navigate(previous);
        } else {
          dispatch(updateTourStatus()).then(() => {
            localStorage.setItem(
              "authUser",
              JSON.stringify({
                ...loggedInUser,
                isTourCompleted: true,
              })
            );
            sessionStorage.setItem(
              "authUser",
              JSON.stringify({
                ...loggedInUser,
                isTourCompleted: true,
              })
            );
          });
          dispatch(handleRunningStatus(false));
        }
      }
    }
    // if (type === EVENTS.STEP_AFTER) {
    //   if (index < 1) {
    //     dispatch(handleNextStep(1));
    //     navigate(isPreviousAction && previous ? previous : next);
    //   }

    //   if (index === 1) {
    //     if (isPreviousAction && previous) {
    //       navigate(previous);
    //     } else {
    //       navigate(isPreviousAction && previous ? previous : next);
    //     }
    //   }

    //   console.log(
    //     "AFTER WORKSPACE CREATION ->",
    //     isWorkspaceCreated,
    //     index,
    //     isWorkspaceCreated && index === 2
    //   );

    //   if (isWorkspaceCreated && index === 2) {
    //     if (isPreviousAction && previous) {
    //       dispatch(handleNextStep(1));
    //       navigate(previous);
    //     } else {
    //       console.log("STEP TWO EXECUTED", stepIndex);
    //       console.log("STEP TWO RUN EXECUTED", run);
    //       dispatch(handleRunningStatus(false));
    //       dispatch(updateTourStatus());
    //       console.log("WEBSITE TOUR COMPLETED ✅");
    //     }
    //   }
    // }
  };

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header
          headerClass={headerClass}
          layoutModeType={layoutModeType}
          onChangeLayoutMode={onChangeLayoutMode}
        />
        <Sidebar layoutType={layoutType} />
        <div className="main-content">
          {props.children}
          {/* <Footer /> */}
          <ChatRequestAlertStack />

          {!loggedInUser?.isTourCompleted && (
            <Joyride
              callback={handleCallback}
              continuous
              run={run}
              stepIndex={stepIndex}
              steps={steps}
              debug
              showProgress={true}
              showSkipButton={true}
              locale={{
                last: "Finish",
              }}
              styles={{
                options: {
                  backgroundColor: "#fff",
                  overlayColor: "rgba(0, 0, 0, 0.5)",
                  spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
                  primaryColor: "#25A0E2",
                  textColor: "#333",
                  zIndex: 1000,
                },
              }}
            />
          )}
        </div>
      </div>
      <RightSidebar />
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
};

export default withRouter(Layout);
