import { createAsyncThunk } from "@reduxjs/toolkit";

import { getReports as getReportsApi } from "../../helpers/fakebackend_helper";

export const getReports = createAsyncThunk(
  "report/getReports",
  async (filters) => {
    try {
      const response = await getReportsApi(filters);
      return response;
    } catch (error) {
      console.log("error inside report thunk", error);
    }
  }
);
