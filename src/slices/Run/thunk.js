import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getRun as getRunApi,
  createRun as createRunApi,
  updateRun as updateRunApi,
  removeRun as removeRunApi,
} from "../../helpers/fakebackend_helper";

export const getRun = createAsyncThunk("run/getRun", async () => {
  try {
    const response = await getRunApi();
    return response;
  } catch (error) {
    console.log("error inside get run thunk", error);
  }
});

export const createRun = createAsyncThunk("run/createRun", async (values) => {
  try {
    const response = await createRunApi(values);

    return response;
  } catch (error) {
    console.log("error inside create run thunk", error);
  }
});

export const updateRun = createAsyncThunk("run/updateRun", async (data) => {
  try {
    console.log("UPDATE DATA ->", data);

    const response = await updateRunApi(data);
    return response;
  } catch (error) {
    console.log("error inside update run thunk", error);
  }
});

export const removeRun = createAsyncThunk("run/removeRun", async (runId) => {
  try {
    const response = await removeRunApi(runId);
    return response;
  } catch (error) {
    console.log("error inside remove run thunk", error);
  }
});
