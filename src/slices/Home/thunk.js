import { createAsyncThunk } from "@reduxjs/toolkit";

import { getHomeData as getHomeDataApi } from "../../helpers/fakebackend_helper";

export const getHomeData = createAsyncThunk("home/getHomeData", async () => {
  try {
    const response = await getHomeDataApi();
    return response;
  } catch (error) {
    console.log("error inside get home data thunk", error);
  }
});
