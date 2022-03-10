/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
// import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import { Dropdown, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function UserData() {
  // const axios = require("axios");
  const [items, setItems] = useState([]);

  // const [id, setId] = useState("");
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const [modal, setModal] = useState(false);
  const [idVaal, setIdVaal] = useState("");

  const handleClose = () => setModal(false);
  const handleModal = (value) => {
    if (!modal) {
      setModal(true);
      setIdVaal(value);
      console.log(value);
    }
  };

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);

    const orgIDs = data11.orgID;
    console.log(orgIDs);
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`)
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

  // const axios = require("axios");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Method to handle update
  const handleUpdate = (
    idx,
    fnamex,
    lnamex,
    emailx,
    streetx,
    cityx,
    statex,
    countryx,
    pnox,
    createdTimex,
    deleteFlagx
  ) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);

    const orgIDs = data11.orgID;
    console.log(orgIDs);
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      fname: fnamex,
      lname: lnamex,
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
        html: `<input type="text" class="swal2-input" id="fname" value="${namex}" placeholder="Name">
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

  const handleModalDel = () => {
    const modalVal = document.getElementById("reasonForDelete").value;
    console.log(modalVal);
    fetch(`${process.env.REACT_APP_ZAVE_URL}/personalcompany/delete/${idVaal}/${modalVal}`, {
      method: "DELETE",
    })
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
  };

  const handleView = (value) => {
    navigate(`/userManagement/viewUser?id=${value}`);
  };

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  const data11 = JSON.parse(localStorage.getItem("user1"));
  console.log(data11);

  const orgIDs = data11.orgID;
  console.log(orgIDs);

  return {
    columns: [
      { Header: "First Name", accessor: "personal.fname", align: "left" },
      { Header: "Last Name", accessor: "personal.lname", align: "left" },
      { Header: "Email", accessor: "personal.email", align: "left" },
      {
        Header: "Date Created",
        accessor: "personal.createdTime",
        Cell: ({ cell: { value } }) => changeDate(value),
        align: "left",
      },
      {
        Header: "Actions",
        accessor: "personal.id",
        Cell: ({ cell: { value } }) => (
          <div>
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
                  <Dropdown.Item onClick={() => handleModal(value)}>Disable</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleView(value)}>View</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div>
              <Modal show={modal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Reason For Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Select id="reasonForDelete" aria-label="Default select example">
                    <option value="ROD">---Reason For Delete---</option>
                    <option value="Retired">Retired</option>
                    <option value="Late">Late</option>
                    <option value="Resigned">Resigned</option>
                    <option value="Sacked">Sacked</option>
                  </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleModalDel()}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        ),
        align: "center",
      },
    ],

    rows: items,
  };
}
