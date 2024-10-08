import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCampaigns as getCampaignsApi,
  createCampaign as createCampaignApi,
  updateCampaign as updateCampaignApi,
  removeCampaign as removeCampaignApi,
} from "../../helpers/fakebackend_helper";

export const getCampaigns = createAsyncThunk(
  "campaigns/getCampaigns",
  async () => {
    try {
      const response = await getCampaignsApi();
      return response;
    } catch (error) {
      console.log("error inside get campaign thunk", error);
    }
  }
);

export const createCampaign = createAsyncThunk(
  "campaigns/createCampaign",
  async (values) => {
    try {
      const response = await createCampaignApi(values);

      return response;
    } catch (error) {
      console.log("error inside create campaign thunk", error);
    }
  }
);

export const updateCampaign = createAsyncThunk(
  "campaigns/updateCampaign",
  async (data) => {
    try {
      // const response = await updateCampaignApi(campaignId, values, status);
      const response = await updateCampaignApi(data);
      return response;
    } catch (error) {
      console.log("error inside update team thunk", error);
    }
  }
);

export const removeCampaign = createAsyncThunk(
  "campaigns/removeCampaign",
  async (campaignId) => {
    try {
      const response = await removeCampaignApi(campaignId);
      return response;
    } catch (error) {
      console.log("error inside update team thunk", error);
    }
  }
);
