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

  const handlePasswordReset = (value) => {
    fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/get/${value}`)
      .then((res) => res.json())
      .then((resultp) => {
        if(resultp.length > 0){
          fetch(`${process.env.REACT_APP_ZAVE_URL}/login/resetpassword/${resultp[0].email}`)
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
        }else{
          MySwal.fire({
            title: "NOT_FOUND",
            type: "error",
            text: "User Not Found",
          });
        }
      });
  };

  // const data11 = JSON.parse(localStorage.getItem("user1"));
  // console.log(data11);

  // const orgIDs = data11.orgID;
  // console.log(orgIDs);

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
                  <Dropdown.Item onClick={() => handleModal(value)}>Disable</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleView(value)}>View</Dropdown.Item>
                  <Dropdown.Item onClick={() => handlePasswordReset(value)}>Reset Password</Dropdown.Item>
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
                    <option value="">---Reason For Delete---</option>
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
