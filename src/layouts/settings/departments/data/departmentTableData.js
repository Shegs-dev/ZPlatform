/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components

import axios from "axios";

export default function data() {
  // const axios = require("axios");

  let depts = [];
  // Make a request for a user with a given ID
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      // handle success
      console.log(response);
      depts = response.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });

  return {
    columns: [
      { Header: "name", accessor: "name", align: "left" },
      { Header: "description", accessor: "description", align: "left" },
      { Header: "created_time", accessor: "created_time", align: "center" },
    ],

    rows: depts,
  };
}
