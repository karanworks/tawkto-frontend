import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getRun, createRun, updateRun, removeRun } from "./thunk";

export const initialState = {
  runs: [],
  error: "",
};

const runSlice = createSlice({
  name: "run",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRun.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.runs = action.payload?.data.campaignDataSettings;
        state.error = "";
      }
    });

    builder.addCase(createRun.fulfilled, (state, action) => {
      console.log("RUN CREATION UPDATE PAYLOAD ->", action.payload.data);

      if (action.payload?.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        state.runs = [...state.runs, action.payload.data];
        state.alreadyRegisteredError = null;
        state.error = "";
        toast.success("Run has been created !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateRun.fulfilled, (state, action) => {
      if (action.payload?.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        const updatedRun = action.payload.data.updatedRun;

        state.runs = state.runs.map((run) => {
          if (run.id == updatedRun.id) {
            run = updatedRun;
            return run;
          } else {
            return run;
          }
        });

        state.alreadyRegisteredError = null;
        state.error = "";

        toast.success("Run details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removeRun.fulfilled, (state, action) => {
      if (action.payload?.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        const removedRun = action.payload.data.removedRun;

        // state.runs = state.runs.filter((run) => run.id !== removedRun.id);
        state.runs = state.runs.map((run) => {
          if (run.id == removedRun.id) {
            run = removedRun;
            return run;
          } else {
            return run;
          }
        });

        state.alreadyRegisteredError = null;
        state.error = "";

        if (removedRun.status === 0) {
          toast.error("Campaign Deactivated!", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored",
          });
        } else {
          toast.success("Campaign Activated!", {
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
