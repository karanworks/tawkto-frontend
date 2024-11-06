import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  inviteWorkspaceMember,
  setPasswordWorkspaceMember,
  getWorkspaceMembers,
} from "./thunk";

export const initialState = {
  workspaceMembers: [],
  error: "",
};

const campaignSlice = createSlice({
  name: "workspaceMembers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorkspaceMembers.fulfilled, (state, action) => {
      state.workspaceMembers = action.payload.workspaceMembers;
    });
    builder.addCase(inviteWorkspaceMember.fulfilled, (state, action) => {
      console.log(
        "RESULT OF INVITATION WORKSPACE MEMBER ->",
        action.payload.data
      );

      state.workspaceMembers = [...state.workspaceMembers, action.payload.data];

      console.log("invite workspace member reducer", action.payload);
    });
    builder.addCase(setPasswordWorkspaceMember.fulfilled, (state, action) => {
      console.log("invite set password reducer", action.payload);
    });
  },
});

export default campaignSlice.reducer;
