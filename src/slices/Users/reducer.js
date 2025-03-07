import { createSlice } from "@reduxjs/toolkit";
import { deleteUser } from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  users: [], // list of all users
  alreadyRegisteredError: null, // if user with same email, mobile number already registered
  error: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const deletedUserId = action.payload.id;
      state.users = state.users.filter((user) => user.id !== deletedUserId);
      state.error = "";
      toast.error("User has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export default usersSlice.reducer;
