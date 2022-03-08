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
import Position from "layouts/position";

// @mui icons
import Icon from "@mui/material/Icon";
import Departments from "layouts/departments";
import Roles from "layouts/companyroles";
import Steps from "layouts/companysteps";
import Checklists from "layouts/checklists";
import Branches from "layouts/branches/index";
import CompanyReg from "layouts/authentication/companyRegistration";
import SysRoles from "layouts/systemRoles";
import RolesAndPerms from "layouts/systemRoles/addRolesAndPerms";
import UserManagement from "layouts/userManagement";
import UserProfile from "layouts/userProfile";
import CompanyProfile from "layouts/companiesProfile";
import VIewUser from "layouts/userManagement/viewUser";

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
    name: "User Management",
    key: "userManagement",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/userManagement",
    component: <UserManagement />,
  },
  {
    type: "collapse",
    name: "Branches",
    key: "branches",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/branches",
    component: <Branches />,
  },
  {
    type: "collapse",
    name: "Departments",
    key: "departments",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/departments",
    component: <Departments />,
  },
  {
    type: "collapse",
    name: "Company Roles",
    key: "companyroles",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Company-Roles",
    component: <Roles />,
  },
  {
    type: "collapse",
    name: "Company Steps",
    key: "companysteps",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Company-Steps",
    component: <Steps />,
  },
  {
    name: "Add Roles And Permissions",
    key: "addRolesAndPerms",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/systemRoles/addRolesAndPerms",
    component: <RolesAndPerms />,
  },
  {
    name: "Checklists",
    key: "checklists",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/checklists",
    component: <Checklists />,
  },
  {
    type: "collapse",
    name: "System Roles",
    key: "systemRoles",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/systemRoles",
    component: <SysRoles />,
  },
  {
    type: "collapse",
    name: "Change Password",
    key: "ChangePassword",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/authentication/changepassword",
    component: <ChangePassword />,
  },
  {
    type: "collapse",
    name: "Position",
    key: "position",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/position",
    component: <Position />,
  },
  {
    name: "User Profile",
    key: "userProfile",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/userProfile",
    component: <UserProfile />,
  },
  {
    name: "Company Profile",
    key: "companyProfile",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/companiesProfile",
    component: <CompanyProfile />,
  },
  {
    name: "User Info",
    key: "viewUser",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/userManagement/viewUser",
    component: <VIewUser />,
  },
  {
    name: "Company Regitration",
    key: "companyRegistration",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/companyRegistration",
    component: <CompanyReg />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
