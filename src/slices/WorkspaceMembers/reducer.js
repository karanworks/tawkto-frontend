import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { inviteWorkspaceMember } from "./thunk";

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
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        state.campaigns = [...state.campaigns, action.payload.data];
        state.alreadyRegisteredError = null;
        state.error = "";
      }
    });
  },
});

export default campaignSlice.reducer;
