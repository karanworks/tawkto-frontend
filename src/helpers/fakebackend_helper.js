import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("authUser");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postRegister = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/register`, data);
};
// Default Login Method
// export const postFakeLogin = (data) => api.create(url.POST_FAKE_LOGIN, data);

// Login Method
export const postLogin = (data) => {
  console.log("LOGIN URL ->", `${process.env.REACT_APP_SERVER_URL}/login`);

  return api.create(`${process.env.REACT_APP_SERVER_URL}/login`, data);
  // return api.create("http://localhost:3008/login", data);
};

// *****************************************************************
// ************************* WORKSPACE *****************************
// *****************************************************************
export const getUserDetails = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/get-user-details`);
};
export const getWorkspaces = (userId) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/workspace/${userId}`);
};
export const createWorkspace = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/workspace`, data);
};

// *****************************************************************
// *********************** WORKSPACE MEMBERS ***********************
// *****************************************************************
export const getWorkspaceMembers = (workspaceId) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/workspace-members/${workspaceId}`
  );
};
export const inviteWorkspaceMember = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/invite-member`, data);
};
export const setPasswordWorkspaceMember = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/set-password`, data);
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
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/user/${userId}/edit`,
    values
  );
};

export const removeRole = (roleId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/role/${roleId}/delete`
  );
};

// *****************************************************************
// **************************** HOME *******************************
// *****************************************************************

export const getHomeData = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/home`);
};

// *****************************************************************
// ************************** UNASSIGNED ***************************
// *****************************************************************
export const getChatRequests = ({ agentId, workspaceId }) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/chat-requests/${workspaceId}/${agentId}`
  );
};
export const getChatRequestMessages = ({ chatId }) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/chat-request/${chatId}`);
};
// *****************************************************************
// *************************** MY OPEN *****************************
// *****************************************************************
export const getOpenChats = ({ agentId, workspaceId }) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/my-open/${workspaceId}/${agentId}`
  );
};
export const getOpenChatMessages = ({ chatId }) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/my-open/${chatId}`);
};
// *****************************************************************
// ************************* SOLVED CHAT ***************************
// *****************************************************************
export const updateSolvedChat = ({ chatId, status }) => {
  return api.update(`${process.env.REACT_APP_SERVER_URL}/solved/${chatId}`, {
    status,
  });
};
export const getSolvedChats = ({ agentId, workspaceId }) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/solved/${workspaceId}/${agentId}`
  );
};
export const getSolvedChatMessages = ({ chatId }) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/solved/${chatId}`);
};
// *****************************************************************
// ***************************** TOUR ******************************
// *****************************************************************
export const updateTourStatus = () => {
  return api.update(`${process.env.REACT_APP_SERVER_URL}/tour-status-update`);
};

// *****************************************************************
// ************************* VERIFY EMAIL **************************
// *****************************************************************
export const verifyEmail = ({ token }) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/verify-email?token=${token}`
  );
};
// *****************************************************************
// ************************* VERIFY EMAIL **************************
// *****************************************************************
export const refreshAccessToken = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/refresh-token`);
};
