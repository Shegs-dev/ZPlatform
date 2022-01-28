/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";

export default function data() {
  // const axios = require("axios");
  const [items, setItems] = useState([]);

  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  useEffect(() => {
    fetch("https://kubuservice.herokuapp.com/department/gets/3")
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });
  }, []);

  const updateDepartment = (deptId) => {
    fetch(`https://kubuservice.herokuapp.com/department/delete/${deptId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        const itemIndex = items.findIndex((o) => o.id === deptId);
        if (itemIndex !== -1 && res.status === 200) {
          setItems(items.filter((item) => item.id !== deptId));
        }
      });
  };

  useEffect(() => {
    const deptsArray = JSON.parse(JSON.stringify(items));
    console.log(deptsArray);
    updateDepartment(3);
  }, [items]);

  const columns = [
    { Header: "name", accessor: "name", align: "left" },
    { Header: "description", accessor: "descrip", align: "left" },
    {
      Header: "Time Created",
      accessor: "createdTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "center",
    },
    {
      Header: "action",
      align: "left",
      Cell: () => (
        <MDButton variant="gradient" onClick={updateDepartment} color="info" width="50%">
          Save
        </MDButton>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const rows = items;

  return (
    <DataTable
      table={{ columns, rows }}
      isSorted
      entriesPerPage
      showTotalEntries
      noEndBorder
      canSearch
    />
  );
}
