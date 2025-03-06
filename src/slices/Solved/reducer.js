import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  updateSolvedChat,
  getSolvedChats,
  getSolvedChatMessages,
} from "./thunk";

export const initialState = {
  solvedChats: [],
  activeSolvedChat: null,
  error: "",
};

const solvedSlice = createSlice({
  name: "solved",
  initialState,
  reducers: {
    handleSolvedActiveChat(state, action) {
      // const filteredChat = state.openChats.find(
      //   (chat) => chat.id === action.payload.id
      // );

      state.activeSolvedChat = action.payload;
    },

    handleIncomingMessageUpdate(state, action) {
      const newMessage = action.payload;

      state.solvedChats = state.solvedChats.map((chat) => {
        if (newMessage.chatId === chat.id) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
          };
        } else {
          return chat;
        }
      });

      if (
        state.activeSolvedChat &&
        newMessage.chatId === state.activeSolvedChat.id
      ) {
        state.activeSolvedChat = {
          ...state.activeSolvedChat,
          messages: [...state.activeSolvedChat.messages, newMessage],
        };
      }
    },

    handleVisitorOnlineStatus(state, action) {
      const status = action.payload;

      state.openChats = state.openChats.map((chat) => {
        if (chat.id === status.visitor.chatId) {
          return {
            ...chat,
            status,
          };
        } else {
          return chat;
        }
      });

      if (status.visitor.chatId === state.activeOpenChat?.id) {
        state.activeOpenChat = { ...state.activeOpenChat, status };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateSolvedChat.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.error = "";
      }
    });
    builder.addCase(getSolvedChats.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.solvedChats = action.payload?.data;
        state.error = "";
      }
    });
    builder.addCase(getSolvedChatMessages.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        // state.unassignedChats = action.payload?.data;
        state.error = "";
      }
    });
  },
});

export const {
  handleSolvedActiveChat,
  handleIncomingMessageUpdate,
  handleVisitorOnlineStatus,
} = solvedSlice.actions;
export default solvedSlice.reducer;
