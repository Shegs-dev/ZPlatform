/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function data() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Method to handle diable
  const handleUpdate = (idx, namex, createdTimex, deleteFlagx) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);

    const orgIDs = data11.orgID;
    console.log(orgIDs);
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      name: namex,
      createdTime: createdTimex,
      deletedFlag: deleteFlagx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_KUBU_URL}/step/update`, requestOptions)
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
    let createdTime = 0;
    let deleteFlag = 0;
    // Avoid filter for empty string
    if (!value) {
      namex = "";
      createdTime = 0;
      deleteFlag = 0;
    } else {
      const filteredItems = filteredData.filter((item) => item.id === value);

      namex = filteredItems[0].name;
      createdTime = filteredItems[0].createdTime;
      deleteFlag = filteredItems[0].deleteFlag;
    }

    MySwal.fire({
      title: "Update Position",
      html: `<input type="text" id="name" value="${namex}" class="swal2-input" placeholder="Name">\
`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value;
        const id = value;
        if (!name) {
          Swal.showValidationMessage(`Please enter name`);
        }
        handleUpdate(id, name, createdTime, deleteFlag);
      },
    });
  };

  // Method to handle diable
  const handleDisable = (value) => {
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
        fetch(`${process.env.REACT_APP_KUBU_URL}/step/delete/${value}`, { method: "DELETE" })
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

  // Method to fetch all companysteps
  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);

    const orgIDs = data11.orgID;
    console.log(orgIDs);
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/step/gets/${orgIDs}`)
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
                <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ),
        align: "left",
      },
    ],

    rows: items,
  };
}