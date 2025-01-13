import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUnassignedChats, getChatRequestMessages } from "./thunk";

export const initialState = {
  unassignedChats: [],
  activeChat: null,
  error: "",
};

const unassignedSlice = createSlice({
  name: "unassigned",
  initialState,
  reducers: {
    handleOpenActiveChat(state, action) {
      state.activeChat = action.payload;
    },

    handleIncomingMessageUpdate(state, action) {
      const newMessage = action.payload;

      state.unassignedChats = state.unassignedChats.map((chat) => {
        if (newMessage.chatId === chat.id) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
          };
        } else {
          return chat;
        }
      });

      if (state.activeChat && newMessage.chatId === state.activeChat.id) {
        state.activeChat = {
          ...state.activeChat,
          messages: [...state.activeChat.messages, newMessage],
        };
      }

      console.log(
        "UNASSIGNED CHATS ON MESSAGE IN REDUCER ->",
        state.unassignedChats
      );
    },

    handleVisitorRequestUpdate(state, action) {
      const chatRequest = action.payload;

      const alreadyExist = state.unassignedChats.find(
        (chat) => chat.id === chatRequest.id
      );

      if (!alreadyExist) {
        state.unassignedChats = [
          ...state.unassignedChats,
          {
            ...chatRequest,
            messages: chatRequest.messages || [],
          },
        ];
      }
    },
    handleVisitorOnlineStatus(state, action) {
      const status = action.payload;

      state.unassignedChats = state.unassignedChats.map((chat) => {
        if (chat.id === status.visitor.chatId) {
          return {
            ...chat,
            status,
          };
        } else {
          return chat;
        }
      });

      if (status.visitor.chatId === state.activeChat?.id) {
        state.activeChat = { ...state.activeChat, status };
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUnassignedChats.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.unassignedChats = action.payload?.data;
        state.error = "";
      }
    });
    builder.addCase(getChatRequestMessages.fulfilled, (state, action) => {
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
  handleVisitorRequestUpdate,
  handleVisitorOnlineStatus,
} = unassignedSlice.actions;

export default unassignedSlice.reducer;
