import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getCampaigns,
  createCampaign,
  updateCampaign,
  removeCampaign,
} from "./thunk";

export const initialState = {
  campaigns: [],
  filteredCampaigns: [], // centers that gets filtered after searching
  alreadyRegisteredError: null,
  error: "",
};

const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCampaigns.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.campaigns = action.payload?.data.campaigns;
        state.error = "";
      }
    });

    builder.addCase(createCampaign.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        state.campaigns = [...state.campaigns, action.payload.data];
        state.alreadyRegisteredError = null;
        state.error = "";
        toast.success("Campaign has been created !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateCampaign.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        const updatedCampaign = action.payload.data.updatedCampaign;

        state.campaigns = state.campaigns.map((campaign) => {
          if (campaign.id == updatedCampaign.id) {
            campaign = action.payload.data.updatedCampaign;
            return campaign;
          } else {
            return campaign;
          }
        });

        state.alreadyRegisteredError = null;
        state.error = "";

        toast.success("Campaign details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
    builder.addCase(removeCampaign.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        const removedCampaign = action.payload.data.removedCampaign;

        state.campaigns = state.campaigns.filter(
          (campaign) => campaign.id !== removedCampaign.id
        );

        state.alreadyRegisteredError = null;
        state.error = "";

        toast.error("Campaign removed!", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  },
});

export default campaignSlice.reducer;
