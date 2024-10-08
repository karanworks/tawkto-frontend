import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getDesignsByCampaign,
  createDesign,
  updateDesign,
  removeDesign,
} from "./thunk";

export const initialState = {
  designs: [],
  filteredCampaigns: [], // centers that gets filtered after searching
  alreadyRegisteredError: null,
  error: "",
};

const campaignSlice = createSlice({
  name: "design",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDesignsByCampaign.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.designs = action.payload?.data.designs;
        state.error = "";
      }
    });

    builder.addCase(createDesign.fulfilled, (state, action) => {
      if (action.payload?.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        state.designs = [...state.designs, action.payload.data];
        state.alreadyRegisteredError = null;
        state.error = "";
        toast.success("Design has been created !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateDesign.fulfilled, (state, action) => {
      if (action.payload?.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        const updatedDesign = action.payload.data.updatedDesign;

        state.designs = state.designs.map((design) => {
          if (design.id == updatedDesign.id) {
            design = action.payload.data.updatedDesign;
            return design;
          } else {
            return design;
          }
        });

        state.alreadyRegisteredError = null;
        state.error = "";

        toast.success("Design details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
    builder.addCase(removeDesign.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        const removedDesign = action.payload.data.removedDesign;

        state.designs = state.designs.filter(
          (design) => design.id !== removedDesign.id
        );

        state.alreadyRegisteredError = null;
        state.error = "";

        toast.error("Design removed!", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  },
});

export default campaignSlice.reducer;
