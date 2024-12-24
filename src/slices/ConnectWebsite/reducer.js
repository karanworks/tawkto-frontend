import { createSlice } from "@reduxjs/toolkit";
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
      toast.success("Workspace has been created !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export default campaignSlice.reducer;
