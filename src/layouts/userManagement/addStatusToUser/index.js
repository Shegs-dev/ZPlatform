// import MDTypography from "components/MDTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Card from "@mui/material/Card";
// import MDBox from "components/MDBox";

// import withReactContent from "sweetalert2-react-content";
// import { useState } from "react";

// import Swal from "sweetalert2";

// function addStatusToUser() {
//   const MySwal = withReactContent(Swal);
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   const [roleIDs, setRoleID] = useState("");
//   const [meIDx, setMeID] = useState("");
//   const [emailx, setEmail] = useState("");
//   console.log(setMeID);
//   console.log(setRoleID);
//   console.log(setEmail);

//   const handleAddME = (e) => {
//     e.preventDefault();
//     const data11 = JSON.parse(localStorage.getItem("user1"));
//     console.log(data11);
//     const orgIDs = data11.orgID;
//     console.log(orgIDs);
//     let isMounted = true;
//     fetch(`${process.env.REACT_APP_ZAVE_URL}/roles/getForOrganization/${orgIDs}`)
//       .then((res) => res.json())
//       .then((result) => {
//         if (isMounted) {
//           setRoleID(result);
//         }
//       });
//     return () => {
//       isMounted = false;
//     };
//   };

//   const handleGetPersonalID = (e) => {
//     e.preventDefault();
//     const data11 = JSON.parse(localStorage.getItem("user1"));

//     const orgIDs = data11.orgID;
//     const raw = JSON.stringify({
//       orgID: orgIDs,
//       personalID: result.data.id,
//       roleID: roleIDs,
//       email: emailx,
//       staffID: "string",
//       statusID: 0,
//     });
//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     fetch(`${process.env.REACT_APP_ZAVE_URL}/personalcompany/update`, requestOptions)
//       .then((res) => res.json())
//       .then((result) => {
//         MySwal.fire({
//           title: result.status,
//           type: "success",
//           text: result.message,
//         }).then(() => {
//           window.location.reload();
//         });
//       })
//       .catch((error) => {
//         MySwal.fire({
//           title: error.status,
//           type: "error",
//           text: error.message,
//         });
//       });
//   };

//   const handleMEAddUpdate = (e) => {
//     e.preventDefault();
//     if (meIDx == null) {
//       handleAddME(e);
//     }
//   };
//   console.log(handleMEAddUpdate);

//   const handleGetByPersonalID = (e) => {
//     e.preventDefault();
//     if (meIDx == null) {
//       handleGetPersonalID(e);
//     }
//   };
//   console.log(handleGetByPersonalID);

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <div className="row">
//         <div className="col-sm-2">&nbsp;</div>
//         <div className="col-sm-8" align="center">
//           <Card>
//             <MDBox pt={4} pb={3} px={3}>
//               <MDBox component="form" role="form">
//                 <MDBox
//                   variant="gradient"
//                   bgColor="info"
//                   borderRadius="lg"
//                   coloredShadow="success"
//                   mx={25}
//                   mt={-6}
//                   p={3}
//                   mb={1}
//                   textAlign="center"
//                 >
//                   <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
//                     BASIC INFO
//                   </MDTypography>
//                 </MDBox>
//               </MDBox>
//             </MDBox>
//           </Card>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

// export default addStatusToUser;
