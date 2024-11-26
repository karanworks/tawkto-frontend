import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import ChatReducer from "./Chat/reducer";
import LoginReducer from "./auth/login/reducer";
import WorkspaceReducer from "./Workspace/reducer";
import WorkspaceMembersReducer from "./WorkspaceMembers/reducer";
import UsersReducer from "./Users/reducer";
import MappingReducer from "./Mapping/reducer";
import CampaignsReducer from "./Campaigns/reducer";
import DesignReducer from "./Design/reducer";
import RunReducer from "./Run/reducer";
import GatewayReducer from "./Gateway/reducer";
import ReportReducer from "./Report/reducer";
import UnassignedReducer from "./Unassigned/reducer";

// SEPARATER
import AccountReducer from "./auth/register/reducer";
import ProfileReducer from "./auth/profile/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Workspace: WorkspaceReducer,
  WorkspaceMembers: WorkspaceMembersReducer,
  Account: AccountReducer,
  Users: UsersReducer,
  Mapping: MappingReducer,
  Campaigns: CampaignsReducer,
  Run: RunReducer,
  Gateways: GatewayReducer,
  Design: DesignReducer,
  Profile: ProfileReducer,
  Report: ReportReducer,
  Chat: ChatReducer,
  Unassigned: UnassignedReducer,
});

export default rootReducer;
