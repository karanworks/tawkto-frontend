import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  inviteWorkspaceMember,
  setPasswordWorkspaceMember,
  getWorkspaceMembers,
} from "./thunk";

export const initialState = {
  workspaceMembers: [],
  error: "",
};

const campaignSlice = createSlice({
  name: "workspaceMembers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorkspaceMembers.fulfilled, (state, action) => {
      state.workspaceMembers = action.payload.workspaceMembers;
    });
    builder.addCase(inviteWorkspaceMember.fulfilled, (state, action) => {
      state.workspaceMembers = [...state.workspaceMembers, action.payload.data];

      toast.success("User has been invited !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
    builder.addCase(setPasswordWorkspaceMember.fulfilled, (state, action) => {
      const payloadData = action.payload;

      console.log("PAYLOAD ON SET PASSWORD ->", payloadData);

      if (payloadData?.status === "success") {
        sessionStorage.setItem(
          "authUser",
          JSON.stringify(payloadData.data.user)
        );
        localStorage.setItem("authUser", JSON.stringify(payloadData.data.user));
        localStorage.setItem(
          "workspace",
          JSON.stringify(payloadData.data.workspace)
        );
      }
      console.log("invite set password reducer", action.payload);
    });
  },
});

export default campaignSlice.reducer;
