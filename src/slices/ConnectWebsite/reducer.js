import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getWorkspaces, createWorkspace } from "./thunk";

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
    builder.addCase(getWorkspaces.fulfilled, (state, action) => {
      // if (action.payload?.status === "failure") {
      //   state.error = action.payload.message;
      // } else {
      //   state.campaigns = action.payload?.data.campaigns;
      //   state.error = "";
      // }
    });

    builder.addCase(createWorkspace.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        console.log(
          "WORKSPACE WITH SAME WEBSITE ALREADY EXIST ->",
          action.payload
        );

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
