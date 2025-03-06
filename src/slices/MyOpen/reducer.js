import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getOpenChats, getOpenChatMessages } from "./thunk";

export const initialState = {
  openChats: [],
  activeOpenChat: null,
  error: "",
};

const myOpenSlice = createSlice({
  name: "myOpen",
  initialState,
  reducers: {
    handleOpenActiveChat(state, action) {
      // const filteredChat = state.openChats.find(
      //   (chat) => chat.id === action.payload.id
      // );

      state.activeOpenChat = action.payload;
    },

    handleIncomingMessageUpdate(state, action) {
      const newMessage = action.payload;

      state.openChats = state.openChats.map((chat) => {
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
        state.activeOpenChat &&
        newMessage.chatId === state.activeOpenChat.id
      ) {
        state.activeOpenChat = {
          ...state.activeOpenChat,
          messages: [...state.activeOpenChat.messages, newMessage],
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

    updateOpenChats(state, action) {
      const chatId = action.payload;

      if (chatId) {
        state.openChats = state.openChats.filter((chat) => chat.id !== chatId);

        toast.success("Chat moved to solved !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOpenChats.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.openChats = action.payload?.data;
        state.error = "";
      }
    });
    builder.addCase(getOpenChatMessages.fulfilled, (state, action) => {
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
  handleOpenActiveChat,
  handleIncomingMessageUpdate,
  handleVisitorOnlineStatus,
  updateOpenChats,
} = myOpenSlice.actions;
export default myOpenSlice.reducer;
