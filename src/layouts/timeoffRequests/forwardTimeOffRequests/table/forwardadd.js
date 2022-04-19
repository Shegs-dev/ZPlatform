// import { useEffect } from "react";
// // import { Dropdown } from "react-bootstrap";
// // import PHeaders from "postHeader";
// import GHeaders from "getHeader";
// import { useNavigate } from "react-router-dom";
// // import Icon from "@mui/material/Icon";

// export default function ForwardTimeOffRequests() {
//   // const { allPHeaders: myHeaders } = PHeaders();
//   const { allGHeaders: miHeaders } = GHeaders();

//   const navigate = useNavigate();

//   useEffect(() => {
//     const data11 = JSON.parse(localStorage.getItem("user1"));
//     const value = data11.id;
//     const headers = miHeaders;
//     let isMounted = true;
//     fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeoffjourney/getByTimeOff/${value}`, { headers })
//       .then(async (res) => {
//         const aToken = res.headers.get("token-1");
//         localStorage.setItem("rexxdex", aToken);
//         return res.json();
//       })
//       .then((result) => {
//         if (result.message === "Expired Access") {
//           navigate("/authentication/sign-in");
//         }
//         if (result.message === "Token Does Not Exist") {
//           navigate("/authentication/sign-in");
//         }
//         if (result.message === "Unauthorized Access") {
//           navigate("/authentication/forbiddenPage");
//         }
//         if (isMounted) {
//           setItems(result);
//         }
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);
// }
