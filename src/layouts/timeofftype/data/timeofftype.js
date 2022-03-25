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
  const handleUpdate = (idx, namex, descripx, typex, createdTimex, deleteFlagx) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);

    const orgIDs = data11.orgID;
    console.log(orgIDs);
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      name: namex,
      descrip: descripx,
      type: typex,
      createdTime: createdTimex,
      deletedFlag: deleteFlagx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeofftype/update`, requestOptions)
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
    let descripx = "";
    let typex = 0;
    let createdTime = 0;
    let deleteFlag = 0;
    // Avoid filter for empty string
    if (!value) {
      namex = "";
      descripx = "";
      typex = 0;
      createdTime = 0;
      deleteFlag = 0;
    } else {
      const filteredItems = filteredData.filter((item) => item.id === value);

      namex = filteredItems[0].name;
      descripx = filteredItems[0].descrip;
      typex = filteredItems[0].type;
      createdTime = filteredItems[0].createdTime;
      deleteFlag = filteredItems[0].deleteFlag;
    }

    MySwal.fire({
      title: "Update timeofftype",
      html: `<input type="text" id="name" value="${namex}" class="swal2-input" placeholder="Name">\
           <input type="text" class="swal2-input" id="descrip" value="${descripx}" placeholder="Description">\
           <input type="text" class="swal2-input" id="type" value="${typex}" placeholder="Type">`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value;
        const descrip = Swal.getPopup().querySelector("#descrip").value;
        const type = Swal.getPopup().querySelector("#type").value;
        const id = value;
        if (!name) {
          Swal.showValidationMessage(`Please enter name`);
        }
        handleUpdate(id, name, descrip, type, createdTime, deleteFlag);
      },
    });
  };

  // Method to handle diable
  const handleDisable = (id) => {
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
        fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeofftype/delete/${id}`, { method: "DELETE" })
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

  // Method to change type
  const changeType = (type) => {
    if (type === 1) return "Monthly";
    return "Annually";
  };

  // Method to fetch all timeofftype
  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);

    const orgIDs = data11.orgID;
    console.log(orgIDs);
    let isMounted = true;
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeofftype/getAll/${orgIDs}`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setItems(result);
          console.log(result);
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
        Header: "type",
        accessor: "type",
        Cell: ({ cell: { value } }) => changeType(value),
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
