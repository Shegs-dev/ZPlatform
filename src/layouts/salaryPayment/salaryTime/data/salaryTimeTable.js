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

export default function SalaryTimeData() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();
  // Method to handle update
  const handleUpdate = (idx, timex, createdTimex, deleteFlagx) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      payTime: timex,
      createdTime: createdTimex,
      deletedFlag: deleteFlagx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_TANTA_URL}/remunerationTime/update`, requestOptions)
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
    let timex = "";
    let createdTime = 0;
    let deleteFlag = 0;
    // Avoid filter for empty string
    if (!value) {
      timex = "";
      createdTime = 0;
      deleteFlag = 0;
    } else {
      const filteredItems = filteredData.filter((item) => item.id === value);

      timex = filteredItems[0].payTime;
      createdTime = filteredItems[0].createdTime;
      deleteFlag = filteredItems[0].deleteFlag;
    }
    const changeDateandTime = (timestamp) => {
      const date = new Date(timestamp);
      let month = "0";
      if (date.getMonth() + 1 < 10) {
        const mymonth = date.getMonth() + 1;
        month += mymonth;
      } else {
        const mymonth = date.getMonth() + 1;
        month = mymonth;
      }
      let day = "0";
      if (date.getDate() < 10) {
        day += date.getDate();
      } else {
        day = date.getDate();
      }
      const retDate = `${date.getFullYear()}-${month}-${day}`;

      let hour = "0";
      let minutes = "0";

      if (date.getHours() < 10) {
        hour += date.getHours();
      } else {
        hour = date.getHours();
      }

      if (date.getMinutes() < 10) {
        minutes += date.getMinutes();
      } else {
        minutes = date.getMinutes();
      }

      return `${retDate}T${hour}:${minutes}`;
    };
    const changeTime = changeDateandTime(timex);
    MySwal.fire({
      title: "Update Department",
      html: `<table><tr><td>
      <label for="name">Time</label></td>
      <td><input type="datetime-local" class="swal2-input" id="timexx" value="${changeTime}"></td></tr>`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const timee = Swal.getPopup().querySelector("#timexx").value;
        const conTime = new Date(timee).getTime();
        const id = value;
        if (!timee) {
          Swal.showValidationMessage(`Please Select Date and Time`);
        }
        handleUpdate(id, conTime, createdTime, deleteFlag);
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

        fetch(`${process.env.REACT_APP_TANTA_URL}/remunerationTime/delete/${value}`, requestOptions)
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

  const changeDateandTime = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    let hour = "0";
    let minutes = "0";
    let seconds = "0";

    if (date.getHours() < 10) {
      hour += date.getHours();
    } else {
      hour = date.getHours();
    }

    if (date.getMinutes() < 10) {
      minutes += date.getMinutes();
    } else {
      minutes = date.getMinutes();
    }

    if (date.getSeconds() < 10) {
      seconds += date.getSeconds();
    } else {
      seconds = date.getSeconds();
    }
    return `${retDate} ${hour}:${minutes}:${seconds}`;
  };

  // Method to change type
  // eslint-disable-next-line consistent-return
  const changeStat = (status) => {
    if (status === 0) {
      return "Created";
      // eslint-disable-next-line no-else-return
    } else if (status === 1) {
      return "Completed";
      // eslint-disable-next-line no-else-return
    }
  };

  // Method to fetch all departments
  // env.environments
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_TANTA_URL}/remunerationTime/gets/${orgIDs}`, { headers })
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
      {
        Header: "Payment Time",
        accessor: "payTime",
        Cell: ({ cell: { value } }) => changeDateandTime(value),
        align: "left",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell: { value } }) => changeStat(value),
        align: "left",
      },
      {
        Header: "Date Created",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeDate(value),
        align: "left",
      },
      {
        Header: "actions",
        accessor: "id",
        // eslint-disable-next-line react/prop-types
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
