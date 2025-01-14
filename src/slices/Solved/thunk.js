import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  updateSolvedChat as updateSolvedChatApi,
  getSolvedChats as getSolvedChatsApi,
  getSolvedChatMessages as getSolvedChatMessagesApi,
} from "../../helpers/fakebackend_helper";

export const updateSolvedChat = createAsyncThunk(
  "solved/updateSolvedChat",
  async (data) => {
    try {
      const response = await updateSolvedChatApi(data);

      return response;
    } catch (error) {
      console.log("error inside update solved chat thunk", error);
    }
  }
);
export const getSolvedChats = createAsyncThunk(
  "solved/getSolvedChats",
  async (data) => {
    try {
      const response = await getSolvedChatsApi(data);

      return response;
    } catch (error) {
      console.log("error inside get solved chats thunk", error);
    }
  }
);
export const getSolvedChatMessages = createAsyncThunk(
  "solved/getSolvedChatMessages",
  async (data) => {
    try {
      const response = await getSolvedChatMessagesApi(data);

      return response;
    } catch (error) {
      console.log("error inside get solved chat messages thunk", error);
    }
  }
);
