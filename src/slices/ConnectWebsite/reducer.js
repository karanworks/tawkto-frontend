import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getWorkspaces, createWorkspace } from "./thunk";

export const initialState = {
  workspaces: [],
  filteredCampaigns: [], // centers that gets filtered after searching
  alreadyRegisteredError: null,
  error: "",
};

const campaignSlice = createSlice({
  name: "connectWebsite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorkspaces.fulfilled, (state, action) => {
      // if (action.payload?.status === "failure") {
      //   state.error = action.payload.message;
      // } else {
      //   state.campaigns = action.payload?.data.campaigns;
      //   state.error = "";
      // }
    });

    builder.addCase(createWorkspace.fulfilled, (state, action) => {
      console.log("CREATE WORKSPACE RESULT ->", action.payload);
    });
  },
});

export default campaignSlice.reducer;
