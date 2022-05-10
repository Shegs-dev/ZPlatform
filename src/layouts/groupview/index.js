// import { Form } from "react-bootstrap";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Card from "@mui/material/Card";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import { useState, useEffect, React } from "react";
// import GHeaders from "getHeader";
// import { useNavigate } from "react-router-dom";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";
// import withReactContent from "sweetalert2-react-content";
// import Swal from "sweetalert2";
// import PHeaders from "postHeader";

// function Checkbox() {
//   const MySwal = withReactContent(Swal);

//   const [namex, setName] = useState("");
//   const [descripx, setDescrip] = useState("");

//   const [opened, setOpened] = useState(false);

//   const data11 = JSON.parse(localStorage.getItem("user1"));

//   const orgIDs = data11.orgID;

//   const navigate = useNavigate();

//   // 0683357418

//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const id = urlParams.get("id");
//   // const idVal = JSON.parse([id]);

//   const { allPHeaders: myHeaders } = PHeaders();

//   const { allGHeaders: miHeaders } = GHeaders();

//   const handleOnClick = (e, apix) => {
//     setOpened(true);

//     const raw = JSON.stringify({
//       orgID: data11.orgID,
//       name: namex,
//       descrip: descripx,
//     });
//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     // const headers = miHeaders;
//     //   fetch(`${process.env.REACT_APP_KUBU_URL}/rolestep/save`, requestOptions)
//     //     .then(async (res) => {
//     //       const aToken = res.headers.get("token-1");
//     //       localStorage.setItem("rexxdex", aToken);
//     //       return res.json();
//     //     })
//     //     .then((result) => {
//     //       setOpened(false);
//     //       if (result.message === "Expired Access") {
//     //         navigate("/authentication/sign-in");
//     //         window.location.reload();
//     //       }
//     //       if (result.message === "Token Does Not Exist") {
//     //         navigate("/authentication/sign-in");
//     //         window.location.reload();
//     //       }
//     //       if (result.message === "Unauthorized Access") {
//     //         navigate("/authentication/forbiddenPage");
//     //         window.location.reload();
//     //       }
//     //       MySwal.fire({
//     //         title: result.status,
//     //         type: "success",
//     //         text: result.message,
//     //       }).then(() => {
//     //         window.location.reload();
//     //       });
//     //     })
//     //     .catch((error) => {
//     //       MySwal.fire({
//     //         title: error.status,
//     //         type: "error",
//     //         text: error.message,
//     //       });
//     //     });
//   };

//   useEffect(() => {
//     // setOpened(true);

//     const headers = miHeaders;
//     let isMounted = true;
//     fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${id}`, { headers })
//       .then(async (res) => {
//         const aToken = res.headers.get("token-1");
//         localStorage.setItem("rexxdex", aToken);
//         return res.json();
//       })
//       .then((resultg) => {
//         // setOpened(false);
//         if (resultg.message === "Expired Access") {
//           navigate("/authentication/sign-in");
//         }
//         if (resultg.message === "Token Does Not Exist") {
//           navigate("/authentication/sign-in");
//         }
//         if (resultg.message === "Unauthorized Access") {
//           navigate("/authentication/forbiddenPage");
//         }
//       });
//     return () => {
//       isMounted = false;
//     };
//   });

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Card>
//         <MDBox
//           variant="gradient"
//           bgColor="info"
//           borderRadius="lg"
//           coloredShadow="success"
//           mx={30}
//           mt={2}
//           p={2}
//           mb={1}
//           textAlign="center"
//         >
//           <MDTypography variant="h4" fontWeight="medium" color="white" textAlign="center" mt={1}>
//             {rolName}
//           </MDTypography>
//         </MDBox>
//         <MDTypography
//           variant="h4"
//           textAlign="left"
//           fontWeight="medium"
//           color="secondary"
//           mx={4}
//           mt={2}
//         >
//           Steps
//         </MDTypography>
//         <MDBox pt={0} px={4}>
//           &nbsp;
//           <Form>
//             {vPermissions.map((api) => (
//               <div key={api.id} className="mb-3">
//                 <Form.Check type="checkbox">
//                   <Form.Check.Input
//                     type="checkbox"
//                     defaultChecked={api.isCheck}
//                     onClick={(e) => handleOnClick(e, api)}
//                   />
//                   <Form.Check.Label>{api.name}</Form.Check.Label>
//                 </Form.Check>
//               </div>
//             ))}
//           </Form>
//         </MDBox>
//       </Card>
//       <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
//         <CircularProgress color="info" />
//       </Backdrop>
//     </DashboardLayout>
//   );
// }

// export default Checkbox;
