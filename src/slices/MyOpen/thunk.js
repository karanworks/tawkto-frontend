import { createAsyncThunk } from "@reduxjs/toolkit";

import { getOpenChats as getOpenChatsApi } from "../../helpers/fakebackend_helper";

export const getOpenChats = createAsyncThunk(
  "myOpen/getOpenChats",
  async (data) => {
    try {
      const response = await getOpenChatsApi(data);
      console.log("GOT RESPONSE FOR OPEN CHATS ->", response);

      return response;
    } catch (error) {
      console.log("error inside get my open chats thunk", error);
    }
  }
);
