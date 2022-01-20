/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";

export default function data() {
  // const axios = require("axios");
  const [items, setItems] = useState([]);

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
      { Header: "created_time", accessor: "createdTime", align: "center" },
    ],

    rows: items,
  };
}
