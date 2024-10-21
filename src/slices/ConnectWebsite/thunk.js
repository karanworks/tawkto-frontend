import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getWorkspaces as getWorkspacesApi,
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
