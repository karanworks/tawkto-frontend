import { createSlice, current } from "@reduxjs/toolkit";
import { updateTourStatus } from "./thunk";

export const initialState = {
  tourState: {
    run: true,
    stepIndex: 0,
    steps: [
      {
        target: "html",
        placement: "center",
        content:
          "Hi, there! Let me guide you through the features of our website.",
        disableBeacon: true,
        hideCloseButton: true,
        disableOverlayClose: true,
        data: {
          next: "/connect-website",
        },
        styles: {
          options: {
            zIndex: 99999,
          },
        },
      },
      {
        target: ".tour-step-two",
        content: "Create a workspace to connect your website.",
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        hideFooter: true,
        spotlightClicks: true,
        data: {
          next: "/overview",
        },
      },
      {
        target: ".tour-step-three",
        content:
          "Copy the widget code widget code and paste it at the bottom of your body tag.",
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        data: {
          next: "/workspace-members",
          previous: "/connect-website",
        },
      },
      {
        target: ".tour-step-four",
        content:
          "Invite members via Email and Get Them Onboard for Live Chat!.",
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        data: {
          // previous: "/overview",
        },
      },
    ],
    tourActive: true,
    isWorkspaceCreated: false,
  },
  error: null,
};

const toruSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    handleNextStep(state, action) {
      console.log("STEP INDEX AFTER WORKSPACE CREATION ->", action.payload);

      state.tourState = { ...state.tourState, stepIndex: action.payload };
    },
    handleRunningStatus(state, action) {
      state.tourState = { ...state.tourState, run: action.payload };
    },
    handleTourActiveStatus(state, action) {
      state.tourState = { ...state.tourState, run: action.payload };
    },
    handleisWorkspaceCreated(state, action) {
      state.isWorkspaceCreated = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updateTourStatus.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.error = "";
      }
    });
  },
});

export const {
  handleNextStep,
  handleRunningStatus,
  handleTourActiveStatus,
  handleisWorkspaceCreated,
} = toruSlice.actions;

export default toruSlice.reducer;
