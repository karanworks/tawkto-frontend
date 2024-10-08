import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getGateway,
  createGateway,
  updateGateway,
  removeGateway,
} from "./thunk";

export const initialState = {
  gateways: [],
  error: "",
};

const runSlice = createSlice({
  name: "gateway",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGateway.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.gateways = action.payload?.data.gateways;
        state.error = "";
      }
    });

    builder.addCase(createGateway.fulfilled, (state, action) => {
      if (action.payload?.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        state.gateways = [...state.gateways, action.payload.data];
        state.alreadyRegisteredError = null;
        state.error = "";
        toast.success("Gateway has been created !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateGateway.fulfilled, (state, action) => {
      if (action.payload?.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        const updatedGateway = action.payload.data.updatedGateway;

        state.gateways = state.gateways.map((gateway) => {
          if (gateway.id == updatedGateway.id) {
            gateway = updatedGateway;
            return gateway;
          } else {
            return gateway;
          }
        });

        state.alreadyRegisteredError = null;
        state.error = "";

        toast.success("Gateway details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removeGateway.fulfilled, (state, action) => {
      if (action.payload?.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        const updatedGateway = action.payload.data.updatedGateway;

        // state.runs = state.runs.filter((run) => run.id !== removedRun.id);
        state.gateways = state.gateways.map((gateway) => {
          if (gateway.id == updatedGateway.id) {
            gateway = updatedGateway;
            return gateway;
          } else {
            return gateway;
          }
        });

        state.alreadyRegisteredError = null;
        state.error = "";

        if (updatedGateway.status === 0) {
          toast.error("Gateway Deactivated!", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored",
          });
        } else {
          toast.success("Gateway Activated!", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  },
});

export default runSlice.reducer;
