import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getWorkspaceMembers as getWorkspaceMembersApi,
  inviteWorkspaceMember as inviteWorkspaceMemberApi,
  setPasswordWorkspaceMember as setPasswordWorkspaceMemberApi,
} from "../../helpers/fakebackend_helper";

export const getWorkspaceMembers = createAsyncThunk(
  "workspaceMembers/getWorkspaceMembers",
  async (workspaceId) => {
    try {
      console.log("RESPONSE FOR WORKSPACE MEMBERS ->", workspaceId);
      const response = await getWorkspaceMembersApi(workspaceId);

      return response;
    } catch (error) {
      console.log("error inside getting workspace members thunk", error);
    }
  }
);
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
