//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";

// action
import {
  profileSuccess,
  profileError,
  resetProfileFlagChange,
} from "./reducer";

const fireBaseBackend = getFirebaseBackend();

export const editProfile = (user) => async (dispatch) => {
  try {
    let response;

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      response = fireBaseBackend.editProfileAPI(user.username, user.idx);
    }
    const data = await response;

    if (data) {
      dispatch(profileSuccess(data));
    }
  } catch (error) {
    dispatch(profileError(error));
  }
};

export const resetProfileFlag = () => {
  try {
    const response = resetProfileFlagChange();
    return response;
  } catch (error) {
    return error;
  }
};