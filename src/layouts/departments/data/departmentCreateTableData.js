/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";

export default function data(name, descrip) {
  // const axios = require("axios");
  const [items, setItems] = useState([]);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ orgID: "3", name, descrip });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  useEffect(() => {
    fetch("http://kubuservice.herokuapp.com/department/add", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });
  }, []);

  return {
    items,
  };
}
