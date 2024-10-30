import { createSlice, current } from "@reduxjs/toolkit";
import { getWorkspaces, createWorkspace } from "./thunk";

export const initialState = {
  workspaces: [],
  alreadyRegisteredError: null,
  error: "",
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorkspaces.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.workspaces = action.payload?.data || [];
        state.error = "";
      }
    });
    builder.addCase(createWorkspace.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        console.log("first workspace ->", action.payload?.data);
        console.log("workspaces in reducer ->", state.workspaces);

        state.workspaces = [...state.workspaces, action.payload?.data];
        state.error = "";
      }
    });
  },
});

export default workspaceSlice.reducer;
