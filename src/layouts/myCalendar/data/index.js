// /* eslint-disable react/prop-types */

// // @mui material components

// // Soft UI Dashboard React components
// import { useEffect, useState } from "react";
// import { Dropdown } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Icon from "@mui/material/Icon";
// // import Swal from "sweetalert2";
// // import withReactContent from "sweetalert2-react-content";
// import GHeaders from "getHeader";
// import { useNavigate } from "react-router-dom";

// export default function CalendarData() {
//   // const MySwal = withReactContent(Swal);
//   // const axios = require("axios");
//   const [items, setItems] = useState([]);

//   const { allGHeaders: miHeaders } = GHeaders();

//   const navigate = useNavigate();
//   // starting and ending of the year
//   const d = new Date(new Date().getFullYear(), 0, 1);
//   const s = new Date(new Date().getFullYear(), 12, 1);
//   const strt = d.getTime();
//   const end = s.getTime();
//   // const handleShow = (filteredData, value) => {
//   //   const filteredItems = filteredData.filter((item) => item.id === value);
//   //   window.sessionStorage.setItem("items", JSON.stringify(filteredItems[0]));
//   //   if (filteredItems[0].purpose === "APPOINTMENT") {
//   //     navigate(`/update-appointment`);
//   //   } else {
//   //     // navigate to interview here
//   //     console.log("an interview");
//   //   }
//   // };
//   useEffect(() => {
//     const headers = miHeaders;
//     const data11 = JSON.parse(localStorage.getItem("user1"));
//     const orgIDs = data11.orgID;
//     console.log(data11);
//     const perso = data11.personalID;
//     let isMounted = true;
//     fetch(
//       `${process.env.REACT_APP_RAGA_URL}/appointment/getMyCalendar/${orgIDs}/${perso}?startTime=${strt}&endTime=${end}`,
//       { headers }
//     )
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
//         if (isMounted) {
//           // const data = result;
//           // const dara = [];
//           // data.forEach((r) => {
//           //   if (r.purpose === "APPOINTMENT") {
//           //     dara.push(r);
//           //   }
//           // });
//           // setItems(dara);
//           // console.log(dara);
//           setItems(result);
//         }
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);
//   // Method to handle diable
//   // const handleDisable = (value) => {
//   //   const data11 = JSON.parse(localStorage.getItem("user1"));
//   //   const orgIDs = data11.orgID;
//   //   MySwal.fire({
//   //     title: "Are you sure?",
//   //     text: "You won't be able to revert this!",
//   //     icon: "warning",
//   //     showCancelButton: true,
//   //     confirmButtonColor: "#3085d6",
//   //     cancelButtonColor: "#d33",
//   //     confirmButtonText: "Yes, Cancel appointment!",
//   //   }).then((result) => {
//   //     if (result.isConfirmed) {
//   //       const requestOptions = {
//   //         method: "DELETE",
//   //         headers: miHeaders,
//   //       };

//   //       fetch(`${process.env.REACT_APP_RAGA_URL}/appointment/cancel/${value}`, requestOptions)
//   //         .then(async (res) => {
//   //           const aToken = res.headers.get("token-1");
//   //           localStorage.setItem("rexxdex", aToken);
//   //           return res.json();
//   //         })
//   //         .then((resx) => {
//   //           if (resx.message === "Expired Access") {
//   //             navigate("/authentication/sign-in");
//   //           }
//   //           if (resx.message === "Token Does Not Exist") {
//   //             navigate("/authentication/sign-in");
//   //           }
//   //           if (resx.message === "Unauthorized Access") {
//   //             navigate("/authentication/forbiddenPage");
//   //           }
//   //           fetch(
//   //             `${process.env.REACT_APP_RAGA_URL}/appointmentParticipant/removeAll/${orgIDs}/${value}`,
//   //             requestOptions
//   //           )
//   //             .then(async (res) => {
//   //               const aToken = res.headers.get("token-1");
//   //               localStorage.setItem("rexxdex", aToken);
//   //               return res.json();
//   //             })
//   //             .then((resy) => {
//   //               console.log(resy);
//   //             });
//   //           MySwal.fire({
//   //             title: resx.status,
//   //             type: "success",
//   //             text: resx.message,
//   //           }).then(() => {
//   //             window.location.reload();
//   //           });
//   //         })
//   //         .catch((error) => {
//   //           MySwal.fire({
//   //             title: error.status,
//   //             type: "error",
//   //             text: error.message,
//   //           });
//   //         });
//   //     }
//   //   });
//   // };

//   // Method to change date from timestamp
//   const changeDate = (timestamp) => {
//     const date = new Date(timestamp);
//     const retDate = date.toDateString();
//     return retDate;
//   };

//   // Method to fetch all FreeDays

//   // Return table
//   return {
//     columns: [
//       { Header: "Title", accessor: "title", align: "left" },
//       { Header: "Purpose", accessor: "purpose", align: "left" },
//       {
//         Header: "Starts",
//         accessor: "startTime",
//         Cell: ({ cell: { value } }) => changeDate(value),
//         align: "left",
//       },
//       {
//         Header: "Ends",
//         accessor: "endTime",
//         Cell: ({ cell: { value } }) => changeDate(value),
//         align: "left",
//       },
//       {
//         Header: "actions",
//         accessor: "id",
//         // eslint-disable-next-line no-empty-pattern
//         Cell: ({ cell: {} }) => (
//           <div
//             style={{
//               width: "100%",
//               backgroundColor: "#dadada",
//               borderRadius: "2px",
//             }}
//           >
//             <Dropdown>
//               <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//                 <Icon sx={{ fontWeight: "light" }}>settings</Icon>
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 {/* <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleDisable(value)}>Cancel</Dropdown.Item> */}
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>
//         ),
//         align: "left",
//       },
//     ],

//     rows: items,
//   };
// }
