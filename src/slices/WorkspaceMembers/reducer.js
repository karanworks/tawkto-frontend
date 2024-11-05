import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { inviteWorkspaceMember, setPasswordWorkspaceMember } from "./thunk";

export const initialState = {
  members: [],
  error: "",
};

const campaignSlice = createSlice({
  name: "workspaceMembers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(inviteWorkspaceMember.fulfilled, (state, action) => {
      console.log("workSpace member reducer", action.payload);
    });
    builder.addCase(setPasswordWorkspaceMember.fulfilled, (state, action) => {
      console.log("workSpace member reducer", action.payload);
    });
  },
});

export default campaignSlice.reducer;
