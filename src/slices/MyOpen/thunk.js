import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getOpenChats as getOpenChatsApi,
  getOpenChatMessages as getOpenChatMessagesApi,
} from "../../helpers/fakebackend_helper";

export const getOpenChats = createAsyncThunk(
  "myOpen/getOpenChats",
  async (data) => {
    try {
      const response = await getOpenChatsApi(data);

      return response;
    } catch (error) {
      console.log("error inside get my open chats thunk", error);
    }
  }
);
export const getOpenChatMessages = createAsyncThunk(
  "myOpen/getOpenChatMessages",
  async (data) => {
    try {
      const response = await getOpenChatMessagesApi(data);

      return response;
    } catch (error) {
      console.log("error inside get my open chats thunk", error);
    }
  }
);
