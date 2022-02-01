/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
// import MDButton from "components/MDButton";
import { Dropdown, Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import IconButton from "@mui/material/IconButton";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Branchdata() {
  // const axios = require("axios");
  const [items, setItems] = useState([]);
  const [id, setId] = useState("");
  const orgID = 3;
  const MySwal = withReactContent(Swal);
  // const axios = require("axios");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    MySwal.fire({
      title: "Update Department",
      html: `<input type="text" class="swal2-input" placeholder="Name">
      <input type="email" class="swal2-input" placeholder="Email">
      <input type="text" class="swal2-input" placeholder="Street">
      <input type="text" class="swal2-input" placeholder="City">
      <input type="text" class="swal2-input" placeholder="State">
      <input type="text" class="swal2-input" placeholder="Country">
      <input type="text" class="swal2-input" placeholder="Phone Number">`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
  };

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const [namex, setName] = useState("");
  const [emailx, setEmail] = useState("");
  const [streetx, setStreet] = useState("");
  const [cityx, setCity] = useState("");
  const [statex, setState] = useState("");
  const [countryx, setCountry] = useState("");
  const [pnox, setPno] = useState("");

  // Method to handle update
  const handleUpdate = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({
      orgID: "3",
      name: namex,
      email: emailx,
      street: streetx,
      city: cityx,
      state: statex,
      country: countryx,
      pno: pnox,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://kubuservice.herokuapp.com/branch/update", requestOptions)
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

  // Method to handle diable
  const handleDisable = () => {
    const value = id;
    console.log(`Hey ${value}`);
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
        fetch(`http://kubuservice.herokuapp.com/branch/delete/${value}`, { method: "DELETE" })
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
  const getCellValue = (value) => {
    setId(value);
  };
  // Method to fetch all Branch
  useEffect(() => {
    fetch(`https://kubuservice.herokuapp.com/branch/gets/${orgID}`)
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });
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
        Header: "created_time",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeBranchDate(value),
        align: "center",
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
                <IconButton
                  style={{
                    height: "7px",
                    width: "10px",
                    borderRadius: "2px",
                  }}
                  disableRipple
                  color="light"
                  sx={navbarIconButton}
                  onClick={getCellValue(value)}
                >
                  <Icon sx={{ fontWeight: "light" }}>settings</Icon>
                </IconButton>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShow}>Update</Dropdown.Item>
                <Dropdown.Item onClick={handleDisable}>Disable</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update Department</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Name"
                      value={namex || ""}
                      onChange={(e) => setName(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      value={emailx || ""}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      value={streetx || ""}
                      onChange={(e) => setStreet(e.target.value)}
                      label="Street"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      value={cityx || ""}
                      onChange={(e) => setCity(e.target.value)}
                      label="City"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      value={statex || ""}
                      onChange={(e) => setState(e.target.value)}
                      label="State"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      value={countryx || ""}
                      onChange={(e) => setCountry(e.target.value)}
                      label="Country"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      value={pnox || ""}
                      onChange={(e) => setPno(e.target.value)}
                      label="Phone Number"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </MDBox>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ),
        align: "center",
      },
    ],

    rows: items,
  };
}
