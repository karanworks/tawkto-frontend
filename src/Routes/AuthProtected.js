import React, { useEffect, useLayoutEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slices/auth/login/thunk";

import { useProfile } from "../Components/Hooks/UserHooks";

import axios from "axios";

let access_token = localStorage.getItem("access_token")
  ? localStorage.getItem("access_token")
  : null;
const setAccessToken = (token) => {
  access_token = token;
  localStorage.setItem("access_token", token);
};

const AuthProtected = (props) => {
  const { userProfile, loading, token } = useProfile();

  // content type
  const authToken = JSON.parse(localStorage.getItem("authUser"))
    ? JSON.parse(localStorage.getItem("authUser")).access_token
    : null;

  useEffect(() => {
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${access_token}`;

      console.log("REQUEST INTERCEPTOR CALLED->", config);

      return config;
    });
  }, [access_token]);

  // it was causing to logout but we wanted a feature that would not allow to login if the user was logged out accidentally previously

  // useEffect(() => {
  //   if (userProfile && !loading && token) {
  //     setAuthorization(token);
  //   } else if (!userProfile && loading && !token) {
  //     console.log("auth protected error called");

  //     dispatch(logoutUser());
  //   }
  // }, [token, userProfile, loading, dispatch]);

  /*
    Navigate is un-auth access protected routes via url
    */

  if (!userProfile && loading && !token) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {" "}
            <Component {...props} />{" "}
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute, setAccessToken };
