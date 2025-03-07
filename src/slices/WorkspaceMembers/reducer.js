import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  inviteWorkspaceMember,
  setPasswordWorkspaceMember,
  getWorkspaceMembers,
  deleteUser,
  updateMember,
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
    builder.addCase(updateMember.fulfilled, (state, action) => {
      const user = action.payload?.data;

      state.workspaceMembers = state.workspaceMembers.map((member) => {
        if (member.id === user.id) {
          return user;
        }
        return member;
      });

      toast.success("User has been updated !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const user = action.payload?.data;
      state.workspaceMembers = state.workspaceMembers.filter(
        (member) => member.id !== user.id
      );

      toast.error("User has been deleted !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
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

      if (payloadData?.status === "success") {
        sessionStorage.setItem(
          "authUser",
          JSON.stringify(payloadData.data.user)
        );
        sessionStorage.setItem(
          "workspace",
          JSON.stringify(payloadData.data.user)
        );
        sessionStorage.setItem(
          "access_token",
          payloadData.data.user.accessToken
        );
        localStorage.setItem("authUser", JSON.stringify(payloadData.data.user));
        localStorage.setItem("access_token", payloadData.data.user.accessToken);
        localStorage.setItem(
          "workspace",
          JSON.stringify(payloadData.data.workspace)
        );
      }
    });
  },
});

export default campaignSlice.reducer;
