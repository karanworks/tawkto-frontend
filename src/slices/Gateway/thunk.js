import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getGateway as getGatewayApi,
  createGateway as createGatewayApi,
  updateGateway as updateGatewayApi,
  removeGateway as removeGatewayApi,
} from "../../helpers/fakebackend_helper";

export const getGateway = createAsyncThunk("gateway/getGateway", async () => {
  try {
    const response = await getGatewayApi();
    return response;
  } catch (error) {
    console.log("error inside get gateway thunk", error);
  }
});

export const createGateway = createAsyncThunk(
  "gateway/createGateway",
  async (values) => {
    try {
      const response = await createGatewayApi(values);

      return response;
    } catch (error) {
      console.log("error inside create gateway thunk", error);
    }
  }
);

export const updateGateway = createAsyncThunk(
  "gateway/updateGateway",
  async (data) => {
    try {
      const response = await updateGatewayApi(data);
      return response;
    } catch (error) {
      console.log("error inside update gateway thunk", error);
    }
  }
);

export const removeGateway = createAsyncThunk(
  "gateway/removeGateway",
  async (runId) => {
    try {
      const response = await removeGatewayApi(runId);
      return response;
    } catch (error) {
      console.log("error inside remove gateway thunk", error);
    }
  }
);
