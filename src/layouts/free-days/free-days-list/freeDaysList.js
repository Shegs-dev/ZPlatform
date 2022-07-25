/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function FreeDaysData() {
  const MySwal = withReactContent(Swal);
  // const axios = require("axios");
  const [items, setItems] = useState([]);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  // Method to handle update
  const handleUpdate = (idx, namex, freeDatex, deleteFlagx) => {
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));

    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      name: namex,
      freeDate: freeDatex,
      deleteFlag: deleteFlagx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/freedays/update`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
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
    let freeDatex = "";
    let deleteFlag = 0;
    // Avoid filter for empty string
    if (!value) {
      namex = "";
      freeDatex = "";
      deleteFlag = 0;
    } else {
      const filteredItems = filteredData.filter((item) => item.id === value);

      namex = filteredItems[0].name;
      freeDatex = filteredItems[0].freeDate;
      deleteFlag = filteredItems[0].deleteFlag;
    }
    let dayx = "";
    let monthx = "";
    let yearx = "";
    if (freeDatex != null) {
      const sDate = new Date(freeDatex);
      dayx = sDate.getDate();
      monthx = sDate.getMonth() + 1;
      yearx = sDate.getFullYear();
    }

    MySwal.fire({
      title: "Update Department",
      html: `<table><tr><td>
             <label for="namess">Title</label></td>
             <td><input type="text" id="namess" value="${namex}" class="swal2-input" placeholder="Name"></td></tr><br>
             <tr><td><label for="dayss">Day</label></td>
             <td><input type="text" class="swal2-input" id="dayss" value="${dayx}" placeholder="Description"></td></tr><br>
             <tr><td><label for="monthss">Month</label></td>
             <td><input type="text" class="swal2-input" id="monthss" value="${monthx}" placeholder="Description"></td></tr><br>
             <tr><td><label for="yearss">Year</label></td>
             <td><input type="text" class="swal2-input" id="yearss" value="${yearx}" placeholder="Description"></td></tr></table>`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#namess").value;
        const dayy = Swal.getPopup().querySelector("#dayss").value;
        const monthy = Swal.getPopup().querySelector("#monthss").value;
        const yearsy = Swal.getPopup().querySelector("#yearss").value;
        const addDMY = new Date(`${monthy}/${dayy}/${yearsy}`);
        const freeDate = addDMY.getTime();
        const id = value;
        const Number = /^[0-9]+$/;
        const letters = /^[a-zA-Z -']+$/;
        if (
          (name.length > 0 && !name.match(letters)) ||
          (dayy.length > 0 && !dayy.match(Number)) ||
          (monthy.length > 0 && !monthy.match(Number)) ||
          (yearsy.length > 0 && !yearsy.match(Number))
        ) {
          Swal.showValidationMessage(
            `Name - Please write a name and use only letters<br> Day - Please write a Day and use only numbers<br> Month - Please write a Month and use only numbers<br> Year - Please write a Year and use only numbers`
          );
        } else {
          handleUpdate(id, name, freeDate, deleteFlag);
        }
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
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(`${process.env.REACT_APP_NSUTANA_URL}/freedays/delete/${value}`, requestOptions)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resx) => {
            if (resx.message === "Expired Access") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }
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

  // Method to fetch all FreeDays
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/freedays/getAll/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
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
      { Header: "Name", accessor: "name", align: "left" },
      {
        Header: "Free Days",
        accessor: "freeDate",
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
