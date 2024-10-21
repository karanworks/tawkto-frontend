import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCampaigns as getCampaignsApi,
  createCampaign as createCampaignApi,
} from "../../helpers/fakebackend_helper";

export const getUnassignedChats = createAsyncThunk(
  "unassigned/getUnassignedChats",
  async () => {
    try {
      const response = await getCampaignsApi();
      return response;
    } catch (error) {
      console.log("error inside get campaign thunk", error);
    }
  }
);

export const createUnassignedChat = createAsyncThunk(
  "unassigned/createUnassignedChat",
  async (values) => {
    try {
      const response = await createCampaignApi(values);

      return response;
    } catch (error) {
      console.log("error inside create campaign thunk", error);
    }
  }
);
