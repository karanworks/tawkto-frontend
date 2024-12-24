import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getChatRequests as getChatRequestsApi,
  getChatRequestMessages as getChatRequestMessagesApi,
} from "../../helpers/fakebackend_helper";

export const getUnassignedChats = createAsyncThunk(
  "unassigned/getUnassignedChats",
  async (data) => {
    try {
      const response = await getChatRequestsApi(data);

      return response;
    } catch (error) {
      console.log("error inside get visitor requests thunk", error);
    }
  }
);
export const getChatRequestMessages = createAsyncThunk(
  "unassigned/getChatRequestMessages",
  async (data) => {
    try {
      const response = await getChatRequestMessagesApi(data);

      return response;
    } catch (error) {
      console.log("error inside get visitor request messages thunk", error);
    }
  }
);

// export const createUnassignedChat = createAsyncThunk(
//   "unassigned/createUnassignedChat",
//   async (values) => {
//     try {
//       const response = await createCampaignApi(values);

//       return response;
//     } catch (error) {
//       console.log("error inside create campaign thunk", error);
//     }
//   }
// );
