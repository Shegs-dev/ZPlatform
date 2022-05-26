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
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import PHeaders from "postHeader";

export default function UserData() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  // const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const { allPHeaders: myHeaders } = PHeaders();

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
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
          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDisable = (pIDVal) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;

    fetch(`${process.env.REACT_APP_ZAVE_URL}/personalcompany/getByPersonalID/${orgIDs}/${pIDVal}`)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultPC) => {
        if (resultPC.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultPC.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultPC.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        MySwal.fire({
          title: "Reason For Delete",
          text: "You won't be able to revert this!",
          icon: "warning",
          html: `<div align="center"><select id="reasonForDelete" class="form-control" aria-label="Default select example" style="width:auto;">
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
            const requestOptions = {
              method: "DELETE",
              headers: miHeaders,
            };
            fetch(
              `${process.env.REACT_APP_ZAVE_URL}/personalcompany/delete/${resultPC.id}/${modalValue}`,
              requestOptions
            )
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
      });
  };

  const handleView = (value) => {
    navigate(`/user-Management/view-User?id=${value}`);
  };
  const handleAddTOT = (value) => {
    navigate(`/user-Management/user-TimeOff-Type?id=${value}`);
  };

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  const handlePasswordReset = (value) => {
    const headers = miHeaders;
    console.log(value);
    fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/get/${value}`, { headers })
      .then((res) => res.json())
      .then((resultp) => {
        const raw = JSON.stringify({
          username: resultp[0].email,
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        console.log(resultp);
        if (resultp.length > 0) {
          fetch(`${process.env.REACT_APP_ZAVE_URL}/login/resetpassword/`, requestOptions)
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
        } else {
          MySwal.fire({
            title: "NOT_FOUND",
            type: "error",
            text: "User Not Found",
          });
        }
      });
  };
  // const handleAddsalary = (value) => {
  //   navigate(`/user-Management/user-Salary`(value));
  // };

  const handleAddsalary = (value) => {
    navigate(`/user-Management/user-Salary?id=${value}`);
  };

  const handleUpdateSystemRole = (value) => {
    navigate(`/update-system-role?id=${value}`);
  };

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
                  <Dropdown.Item onClick={() => handleAddTOT(value)}>
                    Add Time-Off Type
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleAddsalary(value)}>User Salary</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleUpdateSystemRole(value)}>
                    Change User System Role
                  </Dropdown.Item>
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
