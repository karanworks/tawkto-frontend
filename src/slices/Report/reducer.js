import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getReports } from "./thunk";

export const initialState = {
  reports: [],
  filteredCampaigns: [], // centers that gets filtered after searching
  error: "",
};

const campaignSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReports.fulfilled, (state, action) => {
      console.log("REPORTS ->", action.payload);

      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.reports = action.payload?.data.reports;
        state.error = "";
      }
    });
  },
});

export default campaignSlice.reducer;
