/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import ChangePassword from "layouts/authentication/changepassword";
import Userlogin from "layouts/authentication/userlogin";
import Position from "layouts/position";

// @mui icons
import Icon from "@mui/material/Icon";
import Departments from "layouts/departments";
import AnnouncementType from "layouts/announcementtype";
import Branches from "layouts/branches/index";
import SysRoles from "layouts/systemRoles";
import RolesAndPerms from "layouts/systemRoles/addRolesAndPerms";
import UserManagement from "layouts/userManagement";
import UserProfile from "layouts/userProfile";
import ViewUser from "layouts/userManagement/viewUser";
import Groupview from "layouts/groupview";
import ForgotPass from "layouts/authentication/forgot-password";
import ComForgotPass from "layouts/authentication/complete-forgotPassword";
import UserAudit from "layouts/userHistory";
import InviteUser from "layouts/inviteUser";
import Checklists from "layouts/checklists";

import ForbiddenPage from "layouts/authentication/forbiddenPage";
import PaymentHis from "layouts/paymentHistory";

import RenewLog from "layouts/authentication/renewSubscription/renewLogin";
import RenewSub from "layouts/authentication/renewSubscription";

import Groups from "layouts/groups";
import Skills from "layouts/skills";
import JobApplication from "layouts/JobApplication";
import ApplyJob from "layouts/JobApplication/applyjobmanually";
import Education from "layouts/education";
import WorkHistory from "layouts/workHistory";
import PositionHeld from "layouts/positionHeld";
import ViewJobPost from "layouts/JobApplication/ManualApplication/View";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Job Application",
    key: "JobApplication",
    icon: <Icon fontSize="small">JobApplication</Icon>,
    route: "/Job-application",
    component: <JobApplication />,
  },
  {
    name: "Job Application",
    key: "ApplyJobManually",
    icon: <Icon fontSize="small">JobApplication</Icon>,
    route: "/applyjobmanually",
    component: <ApplyJob />,
  },
  {
    name: "View This Job",
    key: "ViewThisJob",
    icon: <Icon fontSize="small">JobApplication</Icon>,
    route: "/jobApplication/ManualApplication/View",
    component: <ViewJobPost />,
  },
  {
    type: "collapse",
    name: "User Management",
    key: "userManagement",
    icon: <Icon fontSize="small">supervised_user_circle</Icon>,
    route: "/user-Management",
    component: <UserManagement />,
  },
  {
    type: "collapse",
    name: "Skills",
    key: "skills",
    icon: <Icon fontSize="small">accessibility</Icon>,
    route: "/Skills",
    component: <Skills />,
  },
  {
    type: "collapse",
    name: "Education",
    key: "education",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/Education",
    component: <Education />,
  },
  {
    type: "collapse",
    name: "Work History",
    key: "workHistory",
    icon: <Icon fontSize="small">work_history</Icon>,
    route: "/Work-History",
    component: <WorkHistory />,
  },
  {
    type: "collapse",
    name: "Position Held",
    key: "positionHeld",
    icon: <Icon fontSize="small">perm_identity</Icon>,
    route: "/Position-Held",
    component: <PositionHeld />,
  },
  {
    type: "divider",
    name: "",
    key: "div1",
    route: "",
  },
  {
    type: "title",
    title: "Settings",
    key: "tit1",
    route: "",
  },
  {
    type: "collapse",
    name: "Announcement Type",
    key: "announcementtype",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Announcement-Type",
    component: <AnnouncementType />,
  },
  {
    type: "collapse",
    name: "Branches",
    key: "branches",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/branches",
    component: <Branches />,
  },
  {
    type: "collapse",
    name: "Departments",
    key: "departments",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/departments",
    component: <Departments />,
  },
  {
    type: "collapse",
    name: "Groups",
    key: "groups",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Groups",
    component: <Groups />,
  },
  {
    type: "collapse",
    name: "Positions",
    key: "position",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/position",
    component: <Position />,
  },
  {
    name: "Add Roles And Permissions",
    key: "addRolesAndPerms",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/System-Roles/Add-Permissions",
    component: <RolesAndPerms />,
  },
  {
    type: "collapse",
    name: "System Roles",
    key: "systemRoles",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/system-Roles",
    component: <SysRoles />,
  },
  {
    name: "Checklists",
    key: "checklists",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Company-Roles/Add-Steps",
    component: <Checklists />,
  },
  {
    name: "View Group",
    key: "viewgroup",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/View-Group",
    component: <Groupview />,
  },

  {
    type: "divider",
    name: "",
    key: "divSet",
    route: "",
  },
  {
    type: "collapse",
    name: "Change Password",
    key: "ChangePassword",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/authentication/change-password",
    component: <ChangePassword />,
  },
  {
    type: "collapse",
    name: "User History",
    key: "userHistory",
    icon: <Icon fontSize="small">history</Icon>,
    route: "/user-History",
    component: <UserAudit />,
  },
  {
    name: "user login",
    key: "userlogin",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/authentication/userlogin",
    component: <Userlogin />,
  },
  {
    name: "User Profile",
    key: "userProfile",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/user-Profile",
    component: <UserProfile />,
  },
  {
    name: "User Info",
    key: "viewUser",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/user-Management/view-User",
    component: <ViewUser />,
  },
  {
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    name: "Log In",
    key: "renewLogin",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/renew-Login",
    component: <RenewLog />,
  },
  {
    name: "Renew Subscription",
    key: "renewSubscription",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/renew-Subscription",
    component: <RenewSub />,
  },
  {
    name: "Invite User",
    key: "inviteUser",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/inviteUser",
    component: <InviteUser />,
  },
  {
    name: "Reset Password",
    key: "forgot-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/forgot-password",
    component: <ForgotPass />,
  },
  {
    name: "Complete Reset Password",
    key: "complete-ResetPassword",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "authentication/complete-forgot-Password",
    component: <ComForgotPass />,
  },
  {
    name: "Payment",
    key: "paymentHistory",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/payment",
    component: <PaymentHis />,
  },
  {
    name: "Forbidden",
    key: "forbiddenPage",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/forbiddenPage",
    component: <ForbiddenPage />,
  },
];

export default routes;
