// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import GHeaders from "getHeader";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";
// // import MDButton from "components/MDButton";
// import Card from "@mui/material/Card";
// import { Container, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import { Grid } from "@mui/material";

// function CBTRESULT() {
//   const navigate = useNavigate();
//   const { allGHeaders: miHeaders } = GHeaders();

//   const [opened, setOpened] = useState(false);
//   const [application, setApplications] = useState([]);
//   const [jobx, setJobx] = useState("");
//   const [mapp, setMapp] = useState([]);

//   useEffect(() => {
//     const headers = miHeaders;

//     const data11 = JSON.parse(localStorage.getItem("MonoUser1"));

//     const orgIDs = data11.orgID;
//     // const empIdx = data11.personalID;
//     const personalIds = data11.id;
//     const personalID = data11.id;
//     console.log(personalIds);
//     console.log(personalID);
//     console.log(orgIDs);
//     console.log(jobx);
//     let isMounted = true;
//     fetch(`${process.env.REACT_APP_RAGA_URL}/cbt/gets/${}`, { headers })
//       .then(async (res) => {
//         const aToken = res.headers.get("token-1");
//         localStorage.setItem("rexxdex", aToken);
//         return res.json();
//       })
//       .then((result) => {
//         if (result.message === "Expired Access") {
//           navigate("/authentication/sign-in");
//           window.location.reload();
//         }
//         if (result.message === "Token Does Not Exist") {
//           navigate("/authentication/sign-in");
//           window.location.reload();
//         }
//         if (result.message === "Unauthorized Access") {
//           navigate("/authentication/forbiddenPage");
//           window.location.reload();
//         }
//         console.log(personalIds);
//         console.log(orgIDs);
//         console.log(result);
//         if (result.length !== 0 && result !== "") {
//           const ids = result.id;
//           fetch(`${process.env.REACT_APP_RAGA_URL}/cbt/getCBTResultsForEmp/${ids}/${personalIds}`, {
//             headers,
//           })
//             .then(async (res) => {
//               const aToken = res.headers.get("token-1");
//               localStorage.setItem("rexxdex", aToken);
//               return res.json();
//             })
//             .then((resultx) => {
//               if (result.message === "Expired Access") {
//                 navigate("/authentication/sign-in");
//                 window.location.reload();
//               }
//               if (resultx.message === "Token Does Not Exist") {
//                 navigate("/authentication/sign-in");
//                 window.location.reload();
//               }
//               if (resultx.message === "Unauthorized Access") {
//                 navigate("/authentication/forbiddenPage");
//                 window.location.reload();
//               }
//               console.log(personalIds);
//               console.log(orgIDs);
//               console.log(result);
//               console.log(resultx);
//               if (isMounted) {
//                 setMapp(resultx);
//               }
//             });
//           console.log(personalIds);
//           console.log(orgIDs);
//         }
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const handleGets = () => {
//     setOpened(true);
//     const headers = miHeaders;
//     const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
//     const personalID = data11.id;

//     fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplication/getUserHistory/${personalID}`, {
//       headers,
//     })
//       .then(async (res) => {
//         const aToken = res.headers.get("token-1");
//         localStorage.setItem("rexxdex", aToken);
//         const result = await res.text();
//         if (result === null || result === undefined || result === "") {
//           return {};
//         }
//         return JSON.parse(result);
//       })
//       .then((result) => {
//         setOpened(false);
//         if (result.message === "Expired Access") {
//           navigate("/authentication/sign-in");
//           window.location.reload();
//         }
//         if (result.message === "Token Does Not Exist") {
//           navigate("/authentication/sign-in");
//           window.location.reload();
//         }
//         if (result.message === "Unauthorized Access") {
//           navigate("/authentication/forbiddenPage");
//           window.location.reload();
//         }
//         console.log(result);
//         setApplications(result);
//         // if (jobx !== 0) {
//         //   fetch(`${process.env.REACT_APP_RAGA_URL}/cbt/gets/${jobx}`, { headers })
//         //     .then(async (res) => {
//         //       const aToken = res.headers.get("token-1");
//         //       localStorage.setItem("rexxdex", aToken);
//         //       return res.json();
//         //     })
//         //     .then((resulty) => {
//         //       if (result.message === "Expired Access") {
//         //         navigate("/authentication/sign-in");
//         //         window.location.reload();
//         //       }
//         //       if (resulty.message === "Token Does Not Exist") {
//         //         navigate("/authentication/sign-in");
//         //         window.location.reload();
//         //       }
//         //       if (resulty.message === "Unauthorized Access") {
//         //         navigate("/authentication/forbiddenPage");
//         //         window.location.reload();
//         //       }
//         //       //   console.log(personalIds);
//         //       //   console.log(orgIDs);
//         //       console.log(resulty);
//         //       if (resulty.length !== 0 && resulty !== "") {
//         //         const ids = result.id;
//         //         fetch(
//         //           `${process.env.REACT_APP_RAGA_URL}/cbt/getCBTResultsForEmp/${ids}/${personalID}`,
//         //           {
//         //             headers,
//         //           }
//         //         )
//         //           .then(async (res) => {
//         //             const aToken = res.headers.get("token-1");
//         //             localStorage.setItem("rexxdex", aToken);
//         //             return res.json();
//         //           })
//         //           .then((resultx) => {
//         //             if (result.message === "Expired Access") {
//         //               navigate("/authentication/sign-in");
//         //               window.location.reload();
//         //             }
//         //             if (resultx.message === "Token Does Not Exist") {
//         //               navigate("/authentication/sign-in");
//         //               window.location.reload();
//         //             }
//         //             if (resultx.message === "Unauthorized Access") {
//         //               navigate("/authentication/forbiddenPage");
//         //               window.location.reload();
//         //             }
//         //             // console.log(personalIds);
//         //             // console.log(orgIDs);
//         //             console.log(result);
//         //             // if (isMounted) {
//         //             //   setApplications(resulty);
//         //             // }
//         //           });
//         //         // console.log(personalIds);
//         //         // console.log(orgIDs);
//         //       }
//         //     });
//         // }
//       });
//   };
//   useEffect(() => {
//     let isMounted = true;

//     if (isMounted) {
//       //   fetches the table data
//       handleGets();
//     }
//     return () => {
//       isMounted = false;
//     };
//   }, []);
//   console.log(mapp);

//   console.log(jobx);
//   console.log(application);
//   const result = (e) => {
//     // const statusTYpexx = e.target.value;
//     console.log(e);
//     setJobx(e);
//     const cbtresult = e;
//     if (cbtresult !== "") {
//       handleCbtResult(e);
//     }
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox>
//         <Grid container spacing={2}>
//           <Grid item xs={8}>
//             <Card>
//               <MDBox mb={2}>
//                 <Container>
//                   <div className="row">
//                     <div className="col-sm-8">
//                       <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
//                         Job Post
//                       </MDTypography>
//                       <MDBox textAlign="right">
//                         <Form.Select
//                           value={jobx || ""}
//                           aria-label="Default select example"
//                           //   onChange={(e) => setJobx(e.target.value)}
//                           onChange={(e) => result(e.target.value)}
//                         >
//                           <option>--Select Job Post--</option>
//                           {application.map((apic) => (
//                             <option key={apic.id} value={apic.jobPost.orgID}>
//                               {apic.jobPost.title}
//                             </option>
//                           ))}
//                         </Form.Select>
//                       </MDBox>
//                     </div>
//                   </div>
//                 </Container>
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//       <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
//         <CircularProgress color="info" />
//       </Backdrop>
//     </DashboardLayout>
//   );
// }

// export default CBTRESULT;
