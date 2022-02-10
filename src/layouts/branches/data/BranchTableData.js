/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
// import MDButton from "components/MDButton";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Branchdata() {
  // const axios = require("axios");
  const [items, setItems] = useState([]);
  // const [id, setId] = useState("");
  const orgID = 3;
  const MySwal = withReactContent(Swal);
  // const axios = require("axios");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Method to handle update
  const handleUpdate = (
    idx,
    namex,
    emailx,
    streetx,
    cityx,
    statex,
    countryx,
    pnox,
    createdTimex,
    deleteFlagx
  ) => {
    const raw = JSON.stringify({
      id: idx,
      orgID: "3",
      name: namex,
      email: emailx,
      street: streetx,
      city: cityx,
      state: statex,
      country: countryx,
      pno: pnox,
      createdTime: createdTimex,
      deletedFlag: deleteFlagx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_KUBU_URL}/branch/update`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  // Method to filter departments
  const handleShow = (filteredData, value) => {
    let namex = "";
    let emailx = "";
    let streetx = "";
    let cityx = "";
    let statex = "";
    let countryx = "";
    let pnox = "";
    let createdTime = 0;
    let deleteFlag = 0;
    // Avoid filter for empty string
    if (!value) {
      namex = "";
      emailx = "";
      streetx = "";
      cityx = "";
      statex = "";
      countryx = "";
      pnox = "";
      createdTime = 0;
      deleteFlag = 0;
    } else {
      const filteredItems = filteredData.filter((item) => item.id === value);

      namex = filteredItems[0].name;
      emailx = filteredItems[0].email;
      streetx = filteredItems[0].street;
      cityx = filteredItems[0].city;
      statex = filteredItems[0].state;
      countryx = filteredItems[0].country;
      pnox = filteredItems[0].pno;
      createdTime = filteredItems[0].createdTime;
      deleteFlag = filteredItems[0].deleteFlag;

      MySwal.fire({
        title: "Update Department",
        html: `<input type="text" class="swal2-input" id="name" value="${namex}" placeholder="Name">
    <input type="email" class="swal2-input" id="email" value="${emailx}" placeholder="Email">
    <input type="text" class="swal2-input" id="street" value="${streetx}" placeholder="Street">
    <input type="text" class="swal2-input" id="city" value="${cityx}" placeholder="City">
    <input type="text" class="swal2-input" id="state" value="${statex}" placeholder="State">
    <input type="text" class="swal2-input" id="country" value="${countryx}" placeholder="Country">
    <input type="text" class="swal2-input" id="pno" value="${pnox}" placeholder="Phone Number">`,
        confirmButtonText: "Save",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        preConfirm: () => {
          const name = Swal.getPopup().querySelector("#name").value;
          const email = Swal.getPopup().querySelector("#email").value;
          const street = Swal.getPopup().querySelector("#street").value;
          const city = Swal.getPopup().querySelector("#city").value;
          const state = Swal.getPopup().querySelector("#state").value;
          const country = Swal.getPopup().querySelector("#country").value;
          const pno = Swal.getPopup().querySelector("#pno").value;
          const id = value;
          if (!name) {
            Swal.showValidationMessage(`Please enter name`);
          }
          handleUpdate(id, name, email, street, city, state, country, pno, createdTime, deleteFlag);
        },
      });
    }
  };

  // Method to handle diable
  const handleDisable = (val) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_KUBU_URL}/branch/delete/${val}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((resx) => {
            MySwal.fire({
              title: resx.status,
              type: "success",
              text: resx.message,
            }).then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            MySwal.fire({
              title: error.status,
              type: "error",
              text: error.message,
            });
          });
      }
    });
  };

  // Method to change date from timestamp
  const changeBranchDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  // Function to get cell value
  // const getCellValue = (value) => {
  //   setId(value);
  // };
  // Method to fetch all Branch
  useEffect(() => {
    let isMounted = true;
    fetch(`https://kubuservice.herokuapp.com/branch/gets/${orgID}`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    columns: [
      { Header: "Name", accessor: "name", align: "left" },
      { Header: "Email", accessor: "email", align: "left" },
      { Header: "Street", accessor: "street", align: "left" },
      { Header: "City", accessor: "city", align: "left" },
      { Header: "State", accessor: "state", align: "left" },
      { Header: "Country", accessor: "country", align: "left" },
      { Header: "Phone Number", accessor: "pno", align: "left" },
      {
        Header: "Date Created",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeBranchDate(value),
        align: "left",
      },
      {
        Header: "actions",
        accessor: "id",
        Cell: ({ cell: { value } }) => (
          <div
            style={{
              width: "100%",
              backgroundColor: "#dadada",
              borderRadius: "2px",
            }}
          >
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <Icon sx={{ fontWeight: "light" }}>settings</Icon>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ),
        align: "center",
      },
    ],

    rows: items,
  };
}
