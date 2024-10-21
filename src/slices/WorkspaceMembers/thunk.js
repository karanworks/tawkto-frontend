import { createAsyncThunk } from "@reduxjs/toolkit";

import { inviteWorkspaceMember as inviteWorkspaceMemberApi } from "../../helpers/fakebackend_helper";

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
