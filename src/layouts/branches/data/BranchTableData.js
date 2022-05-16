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
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function Branchdata() {
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  // const axios = require("axios");
  const [items, setItems] = useState([]);
  // const [id, setId] = useState("");
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

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
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
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
        html: `<table><tr><td>
        <label for="name">Name</label></td>
        <td><input type="text" class="swal2-input" id="name" value="${namex}" placeholder="Name"></td></tr>
        <tr><td><label for="email">Email</label></td>
        <td><input type="email" class="swal2-input" id="email" value="${emailx}" placeholder="Email"></td>
        <tr><td><label for="street">Street</label></td>
        <td><input type="text" class="swal2-input" id="street" value="${streetx}" placeholder="Street"></td>
        <tr><td><label for="city">City</label></td>
        <td><input type="text" class="swal2-input" id="city" value="${cityx}" placeholder="City"></td>
        <tr><td><label for="state">State</label></td>
        <td><input type="text" class="swal2-input" id="state" value="${statex}" placeholder="State"></td>
        <tr><td><label for="country">Country</label></td>
        <td><input type="text" class="swal2-input" id="country" value="${countryx}" placeholder="Country"></td>
        <tr><td><label for="pno">Phone Number</label></td>
        <td><input type="text" class="swal2-input" id="pno" value="${pnox}" placeholder="Phone Number"></td>`,
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

          const Number = /^[0-9]+$/;
          const letters = /^[a-zA-Z ]+$/;
          const streetVali = /^[a-zA-Z0-9 ,-]+$/;
          const emailVali = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
          if (
            (name.length > 0 && !name.match(letters)) ||
            (email.length > 0 && !email.match(emailVali)) ||
            (pno.length > 0 && !pno.match(Number)) ||
            (street.length > 0 && !street.match(streetVali)) ||
            (city.length > 0 && !city.match(letters)) ||
            (state.length > 0 && !state.match(letters)) ||
            (country.length > 0 && !country.match(letters))
          ) {
            Swal.showValidationMessage(
              `Name - Please write a name and use only letters<br> Email - Input a valid Email<br> Phone Number - Please write a Phone Number and use only numbers<br> Street - Please write with only letters, numbers and these symbols(, -)<br> City - Please write a City and use only letters<br> State - Please write a State and use only letters<br> Country - Please write a Country and use only letters `
            );
          } else {
            handleUpdate(
              id,
              name,
              email,
              street,
              city,
              state,
              country,
              pno,
              createdTime,
              deleteFlag
            );
          }
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
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(`${process.env.REACT_APP_KUBU_URL}/branch/delete/${val}`, requestOptions)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resx) => {
            // if (resx.message === "Expired Access") {
            //   navigate("/authentication/sign-in");
            // }
            // if (resx.message === "Token Does Not Exist") {
            //   navigate("/authentication/sign-in");
            // }
            if (resx.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            } else {
              navigate("/authentication/sign-in");
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
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/branch/gets/${orgIDs}`, { headers })
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
