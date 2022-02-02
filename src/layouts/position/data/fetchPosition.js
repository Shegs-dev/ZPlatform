// /* eslint-disable react/prop-types */

// // @mui material components

// // Soft UI Dashboard React components
// import { useEffect, useState } from "react";

// export default function data() {
//   // const axios = require("axios");
//   const [items, setItems] = useState([]);

//   const changeDate = (timestamp) => {
//     const date = new Date(timestamp);
//     const retDate = date.toDateString();
//     return retDate;
//   };

//   useEffect(() => {
//     fetch("https://kubuservice.herokuapp.com/position/gets/3")
//       .then((res) => res.json())
//       .then((result) => {
//         setItems(result);
//       });
//   }, []);

//   return {
//     columns: [
//       { Header: "name", accessor: "name", align: "left" },
//       {
//         Header: "Time Created",
//         accessor: "createdTime",
//         Cell: ({ cell: { value } }) => changeDate(value),
//         align: "center",
//       },
//     ],

//     rows: items,
//   };
// }
