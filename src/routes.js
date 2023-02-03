// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Userlogin from "layouts/authentication/userlogin";

// // @mui icons
import Icon from "@mui/material/Icon";
import ForgotPass from "layouts/authentication/forgot-password";
import Verification from "layouts/authentication/verification";
import ComResetPass from "layouts/authentication/complete-reset-Password";

const routes = [
  {
    type: "collapse",
    name: "User Profile",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Verify Profile",
    key: "verification",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/verification",
    component: <Verification />,
  },
  {
    name: "Complete Reset Password",
    key: "complete-ResetPassword",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "authentication/complete-reset-Password",
    component: <ComResetPass />,
  },
  {
    name: "user login",
    key: "userlogin",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/authentication/userlogin",
    component: <Userlogin />,
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
    name: "Reset Password",
    key: "forgot-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/forgot-password",
    component: <ForgotPass />,
  },
];

export default routes;
