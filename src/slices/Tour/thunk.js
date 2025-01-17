import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateTourStatus as updateTourStatusApi } from "../../helpers/fakebackend_helper";

export const updateTourStatus = createAsyncThunk(
  "tour/updateTourStatus",
  async () => {
    try {
      const response = await updateTourStatusApi();

      return response;
    } catch (error) {
      console.log("error inside update update tour status thunk", error);
    }
  }
);
