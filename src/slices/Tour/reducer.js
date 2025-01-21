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
  tourStateWorkspaceMember: {
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
          next: "/unassigned",
        },
        styles: {
          options: {
            zIndex: 99999,
          },
        },
      },
      {
        target: ".member-tour-step-two",
        content:
          "When a visitor message it will show up here, click join conversation button to chat with that visitor.",
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        spotlightClicks: true,
        styles: {
          options: {
            zIndex: 99999,
          },
        },
        data: {
          next: "/my-open",
          previous: "/unassigned",
        },
      },
      {
        target: ".member-tour-step-three",
        content:
          "After joining the chat you can chat with the visitor here. click on the solve button if the visitor's query has been resolved.",
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        spotlightClicks: true,
        styles: {
          options: {
            zIndex: 99999,
          },
        },
        data: {
          next: "/solved",
          previous: "/my-open",
        },
      },
      {
        target: ".member-tour-step-four",
        content:
          "Solved chats will appear here click start converstation button to start the conversation again with that visitor.",
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        spotlightClicks: true,
        styles: {
          options: {
            zIndex: 99999,
          },
        },
        data: {
          // next: "/solved",
          previous: "/my-open",
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

    handleMemberNextStep(state, action) {
      state.tourStateWorkspaceMember = {
        ...state.tourStateWorkspaceMember,
        stepIndex: action.payload,
      };
    },
    handleMemberRunningStatus(state, action) {
      state.tourStateWorkspaceMember = {
        ...state.tourStateWorkspaceMember,
        run: action.payload,
      };
    },
    handleMemberTourActiveStatus(state, action) {
      state.tourStateWorkspaceMember = {
        ...state.tourStateWorkspaceMember,
        run: action.payload,
      };
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
  handleMemberNextStep,
  handleMemberRunningStatus,
  handleMemberTourActiveStatus,
} = toruSlice.actions;

export default toruSlice.reducer;
