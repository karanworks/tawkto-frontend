import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getDesigns as getDesignsApi,
  createDesign as createDesignApi,
  updateDesign as updateDesignApi,
  removeDesign as removeDesignApi,
} from "../../helpers/fakebackend_helper";

export const getDesignsByCampaign = createAsyncThunk(
  "design/getDesigns",
  async (campaignId) => {
    try {
      const response = await getDesignsApi(campaignId);
      return response;
    } catch (error) {
      console.log("error inside get campaign thunk", error);
    }
  }
);

export const createDesign = createAsyncThunk(
  "design/createDesign",
  async (values) => {
    try {
      const response = await createDesignApi(values);

      console.log("RESPONSE CHECK FOR AUDIO FILE ->", response);

      return response;
    } catch (error) {
      console.log("error inside create design thunk", error);
    }
  }
);

export const updateDesign = createAsyncThunk(
  "design/updateDesign",
  async (values) => {
    try {
      console.log("UPDATE DESIGN THUNK BEING CALLED ->", values);

      const response = await updateDesignApi(values);
      return response;
    } catch (error) {
      console.log("error inside update design thunk", error);
    }
  }
);

export const removeDesign = createAsyncThunk(
  "design/removeDesign",
  async (designId) => {
    try {
      const response = await removeDesignApi(designId);
      return response;
    } catch (error) {
      console.log("error inside remove design thunk", error);
    }
  }
);
