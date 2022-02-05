/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import { Dropdown, Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function data() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    MySwal.fire({
      title: "Update Department",
      html: `<input type="text" class="swal2-input" placeholder="Name">
      <input type="text" class="swal2-input" placeholder="Description">`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
  };

  const [namex, setName] = useState("");
  const [descripx, setDescrip] = useState("");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Method to handle update
  const handleUpdate = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({ orgID: "3", name: namex, descrip: descripx });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://kubuservice.herokuapp.com/position/update", requestOptions)
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
        fetch(`https://kubuservice.herokuapp.com/position/delete/${val}`, { method: "DELETE" })
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
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  // Method to fetch all position
  useEffect(() => {
    let isMounted = true;
    fetch("https://kubuservice.herokuapp.com/position/gets/3")
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

  // Return table
  return {
    columns: [
      { Header: "name", accessor: "name", align: "left" },
      { Header: "description", accessor: "descrip", align: "left" },
      {
        Header: "Date Created",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeDate(value),
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
                <Dropdown.Item onClick={() => handleShow(value)}>Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
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
                      value={descripx || ""}
                      onChange={(e) => setDescrip(e.target.value)}
                      label="Description"
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
