import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import WorkspaceReducer from "./Workspace/reducer";
import WorkspaceMembersReducer from "./WorkspaceMembers/reducer";
import UsersReducer from "./Users/reducer";
import UnassignedReducer from "./Unassigned/reducer";
import MyOpenReducer from "./MyOpen/reducer";
import ConnectWebsiteReducer from "./ConnectWebsite/reducer";

// SEPARATER
import AccountReducer from "./auth/register/reducer";
import ProfileReducer from "./auth/profile/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  ConnectWebsite: ConnectWebsiteReducer,
  Workspace: WorkspaceReducer,
  WorkspaceMembers: WorkspaceMembersReducer,
  Account: AccountReducer,
  Users: UsersReducer,
  Profile: ProfileReducer,
  Unassigned: UnassignedReducer,
  MyOpen: MyOpenReducer,
});

export default rootReducer;
