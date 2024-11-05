import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  inviteWorkspaceMember as inviteWorkspaceMemberApi,
  setPasswordWorkspaceMember as setPasswordWorkspaceMemberApi,
} from "../../helpers/fakebackend_helper";

export const inviteWorkspaceMember = createAsyncThunk(
  "workspaceMembers/inviteWorkspaceMember",
  async (values) => {
    try {
      const response = await inviteWorkspaceMemberApi(values);

      return response;
    } catch (error) {
      console.log("error inside invite workspace member thunk", error);
    }
  }
);
export const setPasswordWorkspaceMember = createAsyncThunk(
  "workspaceMembers/setPasswordWorkspaceMember",
  async (values) => {
    try {
      const response = await setPasswordWorkspaceMemberApi(values);

      return response;
    } catch (error) {
      console.log("error inside set password workspace member thunk", error);
    }
  }
);
