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
import Roles from "layouts/companyroles";
import Status from "layouts/companystatustype";
import Announcement from "layouts/announcement";
import AnnouncementType from "layouts/announcementtype";
import Steps from "layouts/companysteps";
import Branches from "layouts/branches/index";
import CompanyReg from "layouts/authentication/companyRegistration";
import SysRoles from "layouts/systemRoles";
import RolesAndPerms from "layouts/systemRoles/addRolesAndPerms";
import TimeOffType from "layouts/timeofftype";
import UserManagement from "layouts/userManagement";
import UserProfile from "layouts/userProfile";
import CompanyProfile from "layouts/companiesProfile";
import ViewUser from "layouts/userManagement/viewUser";
import Groupview from "layouts/groupview";
import ForgotPass from "layouts/authentication/forgot-password";
import ComForgotPass from "layouts/authentication/complete-forgotPassword";
import UserAudit from "layouts/userHistory";
import InviteUser from "layouts/inviteUser";
import FreeDay from "layouts/free-days";
import Checklists from "layouts/checklists";
import UserTOT from "layouts/userManagement/userTimeOffType";

import TimeOffRequests from "layouts/timeoffRequests";
import ForbiddenPage from "layouts/authentication/forbiddenPage";
import AddTimeOffType from "layouts/timeofftype/addDetailsToTimeOffType";
import AddUserpayment from "layouts/userManagement/addUserSalaryToUserManagement";
import PaymentHis from "layouts/paymentHistory";

import Birthdays from "layouts/birthdays/data/birthdays";
import TimeOffRequestJourney from "layouts/timeoffRequests/timeOffRequestJourney";
import ForwardTimeOff from "layouts/timeoffRequests/forwardTimeOffRequests";
import MattersArising from "layouts/mattersArising";
import EditMattersArising from "layouts/mattersArising/update";
import ChatApp from "layouts/mattersArising/viewMatter/App";
import RenewLog from "layouts/authentication/renewSubscription/renewLogin";
import RenewSub from "layouts/authentication/renewSubscription";
import SalaryPayment from "layouts/salaryPayment";

import Bonusdeduction from "layouts/bonusdeduction";
import CloneBonusDeduction from "layouts/bonusdeduction/clone";
import UpdateBonusOrDeduction from "layouts/bonusdeduction/update";
import Groups from "layouts/groups";
import AppraisalQues from "layouts/appraisal/appraisalQuestions";
import VuAppraisalQuestion from "layouts/appraisal/appraisalQuestions/viewAppraisalQues";
import AppraisalGrade from "layouts/appraisal/appraisalGrading";
// import View from "layouts/timeoffRequests/view";
import TimeoffRequestUpdate from "layouts/timeoffRequests/update";
import SalaryTime from "layouts/salaryPayment/salaryTime";
import SalaryProrate from "layouts/salaryPayment/salaryProrate";
import VuUserProrate from "layouts/salaryPayment/salaryProrate/viewUserProrate";
import SalaryAdvance from "layouts/salary-advance";
import UpdateSalaryAdvance from "layouts/salary-advance/update-salary-advance";

import Appraisal from "layouts/appraisal/appraisal";
import ViewAppraisal from "layouts/appraisal/appraisal/viewAppraisal";
import Polls from "layouts/polls";
import SetAppraisalQuestion from "layouts/appraisal/appraisal/questions";
import AppraisalAppraisers from "layouts/appraisal/appraisers";
import AppraiseQandA from "layouts/appraisal/appaisalQandA";
import GradeAppraisal from "layouts/appraisal/appraisalResult";

import UpdateAnnouncement from "layouts/announcement/updateannouncement";
import UpdateSystemRole from "layouts/userManagement/updatesystemrole";
import UpdatePolls from "layouts/polls/updatepolls";
import Addpolloptions from "layouts/polls/addpolloptions";
import Disapprove from "layouts/timeoffRequests/disapprove";
import VotePolls from "layouts/polls/votePolls";
import EscalateMatter from "layouts/mattersArising/escalateMatter";
import PollsView from "layouts/polls/view";
import UpdateAppraisalGrading from "layouts/appraisal/appraisalGrading/update";
import JobApplication from "layouts/JobApplication";

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
    type: "collapse",
    name: "User Management",
    key: "userManagement",
    icon: <Icon fontSize="small">supervised_user_circle</Icon>,
    route: "/user-Management",
    component: <UserManagement />,
  },
  {
    name: "Add Time-Off Type To User",
    key: "userTimeOffType",
    icon: <Icon fontSize="small">supervised_user_circle</Icon>,
    route: "/user-Management/user-TimeOff-Type",
    component: <UserTOT />,
  },
  {
    name: "Update User System Role",
    key: "userSystemRole",
    icon: <Icon fontSize="small">supervised_user_circle</Icon>,
    route: "/update-system-role",
    component: <UpdateSystemRole />,
  },
  {
    type: "collapse",
    name: "Birthdays",
    key: "birthdays",
    icon: <Icon fontSize="small">supervised_user_circle</Icon>,
    route: "/birthdays",
    component: <Birthdays />,
  },
  {
    name: "User Salary",
    key: "userSalary",
    icon: <Icon fontSize="small">supervised_user_circle</Icon>,
    route: "/user-Management/user-Salary",
    component: <AddUserpayment />,
  },
  {
    type: "collapse",
    name: "Announcement",
    key: "announcement",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Announcement",
    component: <Announcement />,
  },
  {
    name: "Update announcement",
    key: "updateannouncement",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Update-Announcement",
    component: <UpdateAnnouncement />,
  },
  // {
  //   name: "View",
  //   key: "view",
  //   icon: <Icon fontSize="small">meeting_room</Icon>,
  //   route: "/timeoffRequests/view",
  //   component: <View />,
  // },
  {
    type: "collapse",
    name: "Matters Arising",
    key: "mattersarising",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/matters-Arising",
    component: <MattersArising />,
  },
  {
    name: "Escalate Matter",
    key: "escalatematter",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/matters-Arising/escalateMatter",
    component: <EscalateMatter />,
  },
  {
    name: "Chats",
    key: "viewMatter",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/view-Matter",
    component: <ChatApp />,
  },
  {
    type: "collapse",
    name: "Polls",
    key: "polls",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/polls",
    component: <Polls />,
  },
  {
    name: "Update polls",
    key: "updatepolls",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Update-Poll",
    component: <UpdatePolls />,
  },
  {
    name: "Add Poll Option",
    key: "editaddpolloption",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/polls/Option",
    component: <Addpolloptions />,
  },
  {
    name: "View polls",
    key: "viewpolls",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/polls/vote-polls",
    component: <VotePolls />,
  },
  {
    name: "Vote polls",
    key: "votepolls",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/polls/view",
    component: <PollsView />,
  },
  {
    name: "Edit Matters Arising",
    key: "editmattersarising",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/matters-Arising/update",
    component: <EditMattersArising />,
  },
  // {
  //   type: "collapse",
  //   name: "Chats",
  //   key: "chats",
  //   icon: <Icon fontSize="small">meeting_room</Icon>,
  //   route: "/matters-Arising/viewChats",
  //   component: <App />,
  // },
  {
    type: "divider",
    name: "",
    key: "div3",
    route: "",
  },
  {
    type: "title",
    title: "Appraisal",
    key: "tit3",
    route: "",
  },
  {
    type: "collapse",
    name: "Appraisals",
    key: "appraisalz",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Appraisals",
    component: <Appraisal />,
  },
  {
    name: "View Appraisal",
    key: "viewAppraisal",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/View-Appraisals",
    component: <ViewAppraisal />,
  },
  {
    name: "Set Appraisal Questions",
    key: "setAppraisalQuestions",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Set-Appraisal-Questions",
    component: <SetAppraisalQuestion />,
  },
  {
    name: "Grade Appraisal",
    key: "gradeAppraisal",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Grade-Appraisal",
    component: <GradeAppraisal />,
  },
  {
    name: "Set Appraisal Appraisers",
    key: "setAppraisalAppraisers",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Set-Appraisal-Appraisers",
    component: <AppraisalAppraisers />,
  },
  {
    type: "collapse",
    name: "Appraisal Questions",
    key: "appraisalQuestions",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Appraisal-Questions",
    component: <AppraisalQues />,
  },
  {
    name: "Appraisal Answers",
    key: "appraisalQandA",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Appraisal-Question-and-Answers",
    component: <AppraiseQandA />,
  },
  {
    name: "Update Appraisal Questions",
    key: "viewAppraisalQues",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Update-Appraisal-Questions",
    component: <VuAppraisalQuestion />,
  },
  {
    type: "collapse",
    name: "Appraisal Grading",
    key: "appraisalGrading",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Appraisal-Grading",
    component: <AppraisalGrade />,
  },
  {
    name: "Update appraisal grading",
    key: "updateappraisalgrading",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/appraisal/update",
    component: <UpdateAppraisalGrading />,
  },
  {
    type: "divider",
    name: "",
    key: "div4",
    route: "",
  },
  {
    type: "title",
    title: "Salary Management",
    key: "tit4",
    route: "",
  },
  {
    type: "collapse",
    name: "Salary Prorate",
    key: "salaryProrate",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/salary-Prorate",
    component: <SalaryProrate />,
  },
  {
    name: "View User Prorate",
    key: "viewUserProrate",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/view-Salary-Prorate",
    component: <VuUserProrate />,
  },
  {
    type: "collapse",
    name: "Salary Time Settings",
    key: "salaryTime",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/salary-Time-Settings",
    component: <SalaryTime />,
  },
  {
    type: "collapse",
    name: "Bonus/Deduction",
    key: "bonusdeduction",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Bonus-And-Deduction",
    component: <Bonusdeduction />,
  },
  {
    name: "Clone Bonus/Deduction",
    key: "cloneBonusDeduction",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Bonus-And-Deduction/Clone",
    component: <CloneBonusDeduction />,
  },
  {
    name: "Update Bonus or Deduction",
    key: "updateBonusDeduction",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Bonus-And-Deduction/Update",
    component: <UpdateBonusOrDeduction />,
  },
  {
    type: "collapse",
    name: "Salary Payment",
    key: "salaryPayment",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Salary-Payment",
    component: <SalaryPayment />,
  },
  {
    type: "collapse",
    name: "Salary Advance",
    key: "salaryAdvance",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Salary-Advance",
    component: <SalaryAdvance />,
  },
  {
    name: "Update Salary Advance",
    key: "updateSalaryAdvance",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Salary-Advance/Update",
    component: <UpdateSalaryAdvance />,
  },
  {
    type: "divider",
    name: "",
    key: "div2",
    route: "",
  },
  {
    type: "title",
    title: "Leave Management",
    key: "tit2",
    route: "",
  },
  {
    type: "collapse",
    name: "Free Days",
    key: "free-days",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/free-days",
    component: <FreeDay />,
  },
  {
    type: "collapse",
    name: "Time-Off Type",
    key: "timeofftype",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Time-Off-Type",
    component: <TimeOffType />,
  },
  {
    type: "collapse",
    name: "Time Off Requests",
    key: "timeOffRequest",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/time-off-Requests",
    component: <TimeOffRequests />,
  },
  {
    name: "disapprove Time Off Requests",
    key: "timeOffRequest",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/timeoff-Requests/disapprove",
    component: <Disapprove />,
  },
  {
    // type: "collapse",
    name: "update Time Off Requests",
    key: "timeOffRequest",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/time-off-Requests/update-time-off-Requests",
    component: <TimeoffRequestUpdate />,
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
    type: "collapse",
    name: "Company Roles",
    key: "companyroles",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Company-Roles",
    component: <Roles />,
  },
  {
    type: "collapse",
    name: "Status Types",
    key: "companystatus",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Company-Status",
    component: <Status />,
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
    name: "Company Profile",
    key: "companyProfile",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/company-Profile",
    component: <CompanyProfile />,
  },
  {
    name: "User Info",
    key: "viewUser",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/user-Management/view-User",
    component: <ViewUser />,
  },
  {
    name: "Company Regitration",
    key: "companyRegistration",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/company-Registration",
    component: <CompanyReg />,
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
    name: "Time Off Requests Journey",
    key: "timeOffRequestjourney",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/timeoff-Requests/timeOff-Request-Journey",
    component: <TimeOffRequestJourney />,
  },
  {
    name: "Time Off Requests Journey",
    key: "timeOffRequestjourney",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/timeoff-Requests/forward-TimeOff-Requests",
    component: <ForwardTimeOff />,
  },
  {
    name: "Reset Password",
    key: "forgot-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/forgot-password",
    component: <ForgotPass />,
  },
  {
    name: "Add Details To Time Off Type",
    key: "adddetailtotimeofftype",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/timeoff-type/add-Details-To-Time-Off-Type",
    component: <AddTimeOffType />,
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
