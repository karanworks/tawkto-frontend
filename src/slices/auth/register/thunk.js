//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postRegister } from "../../../helpers/fakebackend_helper";

// action
import {
  registerUserSuccessful,
  registerUserFailed,
  resetRegisterFlagChange,
  apiErrorChange,
} from "./reducer";

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend();

// Is user register successfull then direct plot user in redux.
export const registerUser = (user) => async (dispatch) => {
  try {
    let response;

    if (process.env.REACT_APP_SERVER_URL) {
      response = postRegister(user);
      const data = await response;

      console.log("Registration Error In Reducer ->", data);

      if (data.status === "success") {
        dispatch(registerUserSuccessful(data));
      } else {
        console.log("REGISTER ERROR ->", data);

        dispatch(registerUserFailed(data));
      }
    }
  } catch (error) {
    console.log("REGISTER ERROR 2 ->", error);
    dispatch(registerUserFailed(error));
  }
};

export const resetRegisterFlag = () => {
  try {
    const response = resetRegisterFlagChange();
    return response;
  } catch (error) {
    return error;
  }
};

export const apiError = () => {
  try {
    const response = apiErrorChange();
    return response;
  } catch (error) {
    return error;
  }
};
