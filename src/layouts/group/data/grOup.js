// // Soft UI Dashboard React components
// import { useEffect, useState } from "react";
// import { Dropdown } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Icon from "@mui/material/Icon";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import PHeaders from "postHeader";
// import GHeaders from "getHeader";
// import { useNavigate } from "react-router-dom";

// export default function groupData() {
//   const MySwal = withReactContent(Swal);
//   const [items, setItems] = useState([]);

//   const { allPHeaders: myHeaders } = PHeaders();
//   const { allGHeaders: miHeaders } = GHeaders();

//   const navigate = useNavigate();
//   // Method to handle update
//   const handleUpdate = (
//     idx,
//     namex,
//     descripx,
//     createdTimex,
//     deleteFlagx
//   ) => {
//     const data11 = JSON.parse(localStorage.getItem("user1"));

//     const orgIDs = data11.orgID;
//     const raw = JSON.stringify({
//       id: idx,
//       orgID: orgIDs,
//       name: namex,
//       descrip: descripx,
//       createdTime: createdTimex,
//       deletedFlag: deleteFlagx,
//     });
//     console.log(raw);
//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/update`, requestOptions)
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

//   // Method to filter departments
//   const handleShow = (filteredData, value) => {
//     let namex = "";
//     let descripx = "",
//     let createdTime = 0;
//     let deleteFlag = 0;
//     // Avoid filter for empty string
//     if (!value) {
//       namex = "";
//       descripx = "";
//       createdTime = 0;
//       deleteFlag = 0;
//     } else {
//       const filteredItems = filteredData.filter((item) => item.id === value);
//       namex = filteredItems[0].name;
//       descripx = filteredItems[0].descrip;
//       createdTime = filteredItems[0].createdTime;
//       deleteFlag = filteredItems[0].deleteFlag;
//     }

//     MySwal.fire({
//       title: "Update Bonus/Deduction",
//       html: `<tr><td>
//       <label for="name">Name</label></td>
//       <td><input type="text" id="name" value="${namex}" class="swal2-input" placeholder="Name"disabled></td></tr><br>
//             <tr><td><label for="value">Description</label></td>
//       <td><input type="text" id="amount" value="${descripx}" class="swal2-input" placeholder="Amount"></td></tr><br>`,
//       confirmButtonText: "Save",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       preConfirm: () => {
//         const name = Swal.getPopup().querySelector("#name").value;
//         const descrip = Swal.getPopup().querySelector("#descrip").value;
//         const id = value;
//         if (!name) {
//           Swal.showValidationMessage(`Please enter name`);
//         }
//         handleUpdate(
//           id,
//           name,
//           descrip,
//           createdTime,
//           deleteFlag
//         );
//       },
//     });
//   };

//   // Method to handle diable
//   const handleDisable = (value) => {
//     MySwal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const requestOptions = {
//           method: "DELETE",
//           headers: miHeaders,
//         };

//         fetch(
//           `${process.env.REACT_APP_SHASHA_URL}/groups/delete/${value}`,
//           requestOptions
//         )
//           .then(async (res) => {
//             const aToken = res.headers.get("token-1");
//             localStorage.setItem("rexxdex", aToken);
//             return res.json();
//           })
//           .then((resx) => {
//             if (resx.message === "Expired Access") {
//               navigate("/authentication/sign-in");
//             }
//             if (resx.message === "Token Does Not Exist") {
//               navigate("/authentication/sign-in");
//             }
//             if (resx.message === "Unauthorized Access") {
//               navigate("/authentication/forbiddenPage");
//             }
//             MySwal.fire({
//               title: resx.status,
//               type: "success",
//               text: resx.message,
//             }).then(() => {
//               window.location.reload();
//             });
//           })
//           .catch((error) => {
//             MySwal.fire({
//               title: error.status,
//               type: "error",
//               text: error.message,
//             });
//           });
//       }
//     });
//   };

//   // Method to change date from timestamp
//   const changeDate = (timestamp) => {
//     const date = new Date(timestamp);
//     const retDate = date.toDateString();
//     return retDate;
//   };

//   // Method to fetch all departments
//   // env.environments
//   useEffect(() => {
//     const headers = miHeaders;
//     const data11 = JSON.parse(localStorage.getItem("user1"));

//     const orgIDs = data11.orgID;
//     let isMounted = true;
//     fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/gets/{orgID}${orgIDs}`, { headers })
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
//           setItems(result);
//         }
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // Return table
//   return {
//     columns: [
//       { Header: "name", accessor: "name", align: "left" },
//       { Header: "description", accessor: "description", align: "left" },

//       {
//         Header: "Date Created",
//         accessor: "createdTime",
//         Cell: ({ cell: { value } }) => changeDate(value),
//         align: "left",
//       },
//       {
//         Header: "actions",
//         accessor: "id",
//         // eslint-disable-next-line react/prop-types
//         Cell: ({ cell: { value } }) => (
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
//                 <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
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
