import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUnassignedChats } from "./thunk";

export const initialState = {
  unassignedChats: [],
  error: "",
};

const unassignedSlice = createSlice({
  name: "unassigned",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUnassignedChats.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.unassignedChats = action.payload?.data;
        state.error = "";
      }
    });

    // builder.addCase(createCampaign.fulfilled, (state, action) => {
    //   if (action.payload.status == "failure") {
    //     state.alreadyRegisteredError = action.payload.message;
    //     state.error = "";
    //   } else {
    //     state.campaigns = [...state.campaigns, action.payload.data];
    //     state.alreadyRegisteredError = null;
    //     state.error = "";
    //     toast.success("Campaign has been created !", {
    //       position: "bottom-center",
    //       autoClose: 3000,
    //       theme: "colored",
    //     });
    //   }
    // });
  },
});

export default unassignedSlice.reducer;
