import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postRegister = (data) =>
  api.create("http://192.168.1.5:3010/api/register", data);

// Default Login Method
// export const postFakeLogin = data => api.create(url.POST_FAKE_LOGIN, data);

// Login Method
export const postLogin = (data) => {
  return api.create(url.POST_LOGIN, data);
};
// *****************************************************************
// *************************** USERS *******************************
// *****************************************************************
export const getUsers = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/users`);
};

export const createUser = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/user/register`, data);
};
export const removeUser = (userId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/user/${userId}/delete`
  );
};

export const updateUser = ({ userId, values }) => {
  console.log("USER ID ->", userId, "VALUES ->", values);

  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/user/${userId}/edit`,
    values
  );
};

// *****************************************************************
// **************************** MAPPING ****************************
// *****************************************************************

export const getMenus = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/mapping`);
};
export const getMenusByRole = (roleId) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/role/${roleId}/mapping`);
};
export const getRoles = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/roles`);
};
export const changePermission = ({ menuId, subMenuId, roleId }) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/role/${roleId}/mapping`,
    { menuId, subMenuId, roleId }
  );
};

export const createRole = (values) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/role/create`, values);
};

export const updateRole = (roleId, values) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/role/${roleId}/edit`,
    values
  );
};

export const removeRole = (roleId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/role/${roleId}/delete`
  );
};

// *****************************************************************
// ************************* CAMPAIGNS *****************************
// *****************************************************************
export const getCampaigns = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/campaigns`);
};

export const createCampaign = (data) => {
  console.log("CREATING CAMPAIGN AFTER MODIFICATION ->", data);

  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/campaign/create`,
    data,
    {
      "Content-type": "multipart/form-data",
    }
  );
};

export const updateCampaign = (data) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/campaign/${data.campaignId}/edit`,
    data,
    {
      "Content-type": "multipart/form-data",
    }
  );
};
export const removeCampaign = (campaignId) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/campaign/${campaignId}/remove`
  );
};
// *****************************************************************
// **************************** DESIGN *****************************
// *****************************************************************
export const getDesigns = (campaignId) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/campaign/${campaignId}/designs`
  );
};

export const createDesign = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/design/create`, data, {
    "Content-type": "multipart/form-data",
  });
};

export const updateDesign = ({ designId, values }) => {
  console.log("VALUES AND DESIGN ID ->", designId, values);

  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/design/${designId}/edit`,
    values,
    {
      "Content-type": "multipart/form-data",
    }
  );
};
export const removeDesign = (designId) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/design/${designId}/remove`
  );
};

// *****************************************************************
// **************************** HOME *******************************
// *****************************************************************

export const getHomeData = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/home`);
};

// *****************************************************************
// ****************************** RUN ******************************
// *****************************************************************
export const getRun = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/run`);
};

export const createRun = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/run/create`, data, {
    "Content-type": "multipart/form-data",
  });
};

export const updateRun = ({ runId, values, workDays }) => {
  return api.update(`${process.env.REACT_APP_SERVER_URL}/run/${runId}/edit`, {
    ...values,
    workDays,
  });
};
export const removeRun = (runId) => {
  return api.update(`${process.env.REACT_APP_SERVER_URL}/run/${runId}/remove`);
};
// *****************************************************************
// *************************** GATEWAY *****************************
// *****************************************************************
export const getGateway = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/gateways`);
};

export const createGateway = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/gateway/create`, data);
};

export const updateGateway = ({ gatewayId, values }) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/gateway/${gatewayId}/edit`,
    values
  );
};
export const removeGateway = (gatewayId) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/gateway/${gatewayId}/remove`
  );
};
// *****************************************************************
// ************************** TEST IVR *****************************
// *****************************************************************
export const testIvr = ({ phoneNumber, campaignId }) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/campaign/${campaignId}/test-ivr`,
    { phoneNumber }
  );
};
// *****************************************************************
// ************************** REPORTS ******************************
// *****************************************************************
export const getReports = (filters) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/reports`, filters);
};

//Chat
export const getDirectContact = () => api.get(url.GET_DIRECT_CONTACT);

// get Messages
export const getMessages = (roomId) =>
  api.get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } });

// add Message
export const addMessage = (message) => api.create(url.ADD_MESSAGE, message);

// add Message
export const deleteMessage = (message) =>
  api.delete(url.DELETE_MESSAGE, { headers: { message } });

// get Channels
export const getChannels = () => api.get(url.GET_CHANNELS);
