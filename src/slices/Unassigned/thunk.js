import { createAsyncThunk } from "@reduxjs/toolkit";

import { getChatRequests as getChatRequestsApi } from "../../helpers/fakebackend_helper";

export const getUnassignedChats = createAsyncThunk(
  "unassigned/getUnassignedChats",
  async (workspaceId) => {
    try {
      const response = await getChatRequestsApi(workspaceId);
      console.log("VISITOR REQUESTS INSIDE THUNK ->", response);

      return response;
    } catch (error) {
      console.log("error inside get visitor requests thunk", error);
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
