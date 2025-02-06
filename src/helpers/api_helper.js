import axios from "axios";
import { api } from "../config";

// const axiosInstance = axios.create({
//   headers: {
//     "Content-Type": "application/json", // Default headers
//   },
// });

// default
axios.defaults.withCredentials = true;

axios.defaults.baseURL = api.API_URL;
// axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// axios.defaults.headers["Authorization"] = `Bearer ${access_token}`;

// content type
// const token = JSON.parse(localStorage.getItem("authUser"))
//   ? JSON.parse(localStorage.getItem("authUser")).token
//   : null;

// console.log("GETTING TOKEN TO ADD INSIDE AUTHORIZATION HEADER ->", token);

// if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token;

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    // console.log("GETTING THE RESPONSE OF OF EVERY REQUEST ->", response);

    console.log("RESPONSE IS BEING RETURNED AS WELL", response);

    return response.data ? response.data : response;
  },
  async function (error) {
    // console.log("GOT THE ERROR FROM INTERCEPTOR ->", error.response);

    try {
      const errorResponse = error.response;

      if (
        errorResponse.status === 401 &&
        errorResponse.data.message === "Unauthorized"
      ) {
        localStorage.clear();
        location.href("/login");
      }

      return Promise.reject(error);
    } catch (error) {
      console.log("Error while re-requesting the access token ->", error);
      return Promise.reject(error); //
    }
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
// const setAuthorization = (token) => {
//   axios.defaults.headers.common["Authorization"] = "Bearer " + token;
// };

class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  // get = (url, params) => {
  //   let response;

  //   let paramKeys = [];

  //   if (params) {
  //     Object.keys(params).map((key) => {
  //       paramKeys.push(key + "=" + params[key]);
  //       return paramKeys;
  //     });

  //     const queryString =
  //       paramKeys && paramKeys.length ? paramKeys.join("&") : "";
  //     response = axios.get(`${url}?${queryString}`, params);
  //   } else {
  //     response = axios.get(`${url}`, params);
  //   }

  //   return response;
  // };
  /**
   * post given data to url
   */

  // get = (url) => {
  //   return axios.get(url, { withCredentials: true });
  // };

  get = (url, params) => {
    let response;

    let paramKeys = [];

    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, {
        withCredentials: true,
      });
    }

    return response;
  };

  create = (url, data, headers) => {
    return axios.post(url, data, {
      withCredentials: true,
      // Authorization: token,
      headers,
    });
  };
  /**
   * Updates data
   */
  update = (url, data, headers) => {
    return axios.patch(url, data, {
      withCredentials: true,
      headers,
    });
  };

  put = (url, data) => {
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url) => {
    return axios.delete(url, { withCredentials: true });
  };
}
const getLoggedinUser = () => {
  // const user = sessionStorage.getItem("authUser");
  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, getLoggedinUser };
// export { APIClient, setAuthorization, getLoggedinUser };
