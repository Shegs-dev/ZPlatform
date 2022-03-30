/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
// import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";

export default function UserData() {
  // const axios = require("axios");
  const [items, setItems] = useState([]);
  const [iteems, setIteems] = useState([]);
  console.log(iteems);
  // const [id, setId] = useState("");
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  // const axios = require("axios");

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  console.log(myHeaders);

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);

    const orgIDs = data11.orgID;
    console.log(orgIDs);
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (isMounted) {
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDisable = (pIDVal) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);

    const orgIDs = data11.orgID;
    console.log(orgIDs);

    fetch(`${process.env.REACT_APP_ZAVE_URL}/personalcompany/getByPersonalID/${orgIDs}/${pIDVal}`)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultPC) => {
        setIteems(resultPC);
        MySwal.fire({
          title: "Reason For Delete",
          text: "You won't be able to revert this!",
          icon: "warning",
          html: `<div align="center"><select id="reasonForDelete" class="form-select" aria-label="Default select example" style="width:auto;">
          <option value="">---Reason For Delete---</option>
          <option value="Retired">Retired</option>
          <option value="Late">Late</option>
          <option value="Resigned">Resigned</option>
          <option value="Sacked">Sacked</option>
        </select></div>`,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((resultD) => {
          if (resultD.isConfirmed) {
            const modalValue = document.getElementById("reasonForDelete").value;
            fetch(
              `${process.env.REACT_APP_ZAVE_URL}/personalcompany/delete/${resultPC.id}/${modalValue}`,
              {
                method: "DELETE",
              }
            )
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              })
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
        if (resultp.length > 0) {
          fetch(`${process.env.REACT_APP_ZAVE_URL}/login/resetpassword/${resultp[0].email}`)
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
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
        } else {
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
                  <Dropdown.Item onClick={() => handleView(value)}>View</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
                  <Dropdown.Item onClick={() => handlePasswordReset(value)}>
                    Reset Password
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        ),
        align: "center",
      },
    ],

    rows: items,
  };
}
