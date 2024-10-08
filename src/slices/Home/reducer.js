import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getHomeData } from "./thunk";

export const initialState = {
  teams: [],
  teamMembers: [],
  employee: null,
  error: "",
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomeData.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.teams = action.payload?.data.teamWithEmployees;
        state.teamMembers = action.payload?.data.teamMembers;
        state.employee = action.payload?.data.employee;
        state.error = "";
      }
    });
  },
});

export default homeSlice.reducer;
