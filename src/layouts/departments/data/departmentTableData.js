/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";

import MDButton from "components/MDButton";

export default function data({ handleUpdate }) {
  // const axios = require("axios");
  const [items, setItems] = useState([]);

  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  useEffect(() => {
    fetch("http://kubuservice.herokuapp.com/department/gets/3")
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });
  }, []);

  return {
    columns: [
      { Header: "name", accessor: "name", align: "left" },
      { Header: "description", accessor: "descrip", align: "left" },
      {
        Header: "created_time",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeDate(value),
        align: "center",
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: () => (
          <MDButton variant="gradient" onClick={handleUpdate()} color="info" width="50%">
            Edit
          </MDButton>
        ),
        align: "left",
      },
    ],

    rows: items,
  };
}
