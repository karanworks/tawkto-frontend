import React, { useEffect, useLayoutEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slices/auth/login/thunk";
import { useProfile } from "../Components/Hooks/UserHooks";
import axios from "axios";

const AuthProtected = (props) => {
  const { userProfile, loading, token } = useProfile();

  useEffect(() => {
    axios.interceptors.request.use(function (config) {
      let access_token = localStorage.getItem("access_token")
        ? localStorage.getItem("access_token").replace(/^"|"$/g, "")
        : null;

      config.headers.Authorization = `bearer ${access_token}`;

      console.log("REQUEST INTERCEPTOR CALLED->", config);

      return config;
    });
  }, []);

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

export { AuthProtected, AccessRoute };
