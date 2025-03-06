import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getWorkspaces, getUserDetails, createWorkspace } from "./thunk";

export const initialState = {
  workspaces: [],
  filteredCampaigns: [], // centers that gets filtered after searching
  alreadyRegisteredError: null,
  error: "",
};

const connectWebsiteSlice = createSlice({
  name: "connectWebsite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorkspaces.fulfilled, (state, action) => {});
    builder.addCase(getUserDetails.fulfilled, (state, action) => {});

    builder.addCase(createWorkspace.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.error = "";
        toast.success("Workspace has been created !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  },
});

export default connectWebsiteSlice.reducer;
