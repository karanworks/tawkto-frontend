import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUser as deleteUserApi } from "../../helpers/fakebackend_helper";

// export const getUsers = createAsyncThunk("users/getUsers", async () => {
//   try {
//     const response = await getUsersApi();
//     return response;
//   } catch (error) {
//     console.log("error inside getUsers thunk", error);
//   }
// });

// export const createUser = createAsyncThunk(
//   "users/createUser",
//   async (values) => {
//     try {
//       const response = await createUserApi(values);

//       return response;
//     } catch (error) {
//       console.log("error inside createUser thunk", error);
//     }
//   }
// );

// export const updateUser = createAsyncThunk("users/updateUser", async (data) => {
//   try {
//     const response = await updateUserApi(data);
//     return response;
//   } catch (error) {
//     console.log("error inside remove user thunk", error);
//   }
// });

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ userId }) => {
    try {
      const response = await deleteUserApi(userId);

      return response.data.deletedUser;
    } catch (error) {
      console.log("error inside remove user thunk", error);
    }
  }
);
