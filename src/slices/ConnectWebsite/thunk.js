import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getWorkspaces as getWorkspacesApi,
  getUserDetails as getUserDetailsApi,
  createWorkspace as createWorkspaceApi,
} from "../../helpers/fakebackend_helper";

export const getWorkspaces = createAsyncThunk(
  "connectWebsite/getWorkspaces",
  async () => {
    try {
      const response = await getWorkspacesApi();
      return response;
    } catch (error) {
      console.log("error inside get campaign thunk", error);
    }
  }
);
export const getUserDetails = createAsyncThunk(
  "connectWebsite/getUserDetails",
  async () => {
    try {
      const response = await getUserDetailsApi();
      return response;
    } catch (error) {
      console.log("error inside get user details thunk", error);
    }
  }
);

export const createWorkspace = createAsyncThunk(
  "connectWebsite/createWorkspace",
  async (values) => {
    try {
      const response = await createWorkspaceApi(values);

      return response;
    } catch (error) {
      console.log("error inside create workspace thunk", error);
    }
  }
);
