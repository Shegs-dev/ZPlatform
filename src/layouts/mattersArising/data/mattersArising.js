import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
// import PHeaders from "postHeader";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Icon from "@mui/material/Icon";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export default function MattersArisingTable() {
  const MySwal = withReactContent(Swal);

  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const { allGHeaders: miHeaders } = GHeaders();
  // const { allPHeaders: myHeaders } = PHeaders();

  const data11 = JSON.parse(localStorage.getItem("user1"));
  // const value = data11.id;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // const data11 = JSON.parse(localStorage.getItem("user1"));
    // const userOtherDets = JSON.parse(localStorage.getItem("userOtherDets"));
    let isMounted = true;
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    if (
      data11.roleID !== "0" &&
      data11.roleID !== "" &&
      data11.roleID !== "null" &&
      data11.roleID !== null
    ) {
      const personalIds = data11.personalID;
      fetch(`${process.env.REACT_APP_SHASHA_URL}/concern/getForEmp/${orgIDs}/${personalIds}`, {
        headers,
      })
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          if (result.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (result.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (result.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
          }
          if (isMounted) {
            setItems(result);
          }
        });
    } else {
      fetch(`${process.env.REACT_APP_SHASHA_URL}/concern/gets/${orgIDs}`, { headers })
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((resultx) => {
          if (resultx.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (resultx.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (resultx.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
          }
          if (isMounted) {
            setItems(resultx);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

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
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(`${process.env.REACT_APP_SHASHA_URL}/concern/delete/${id}`, requestOptions)
          .then((res) => res.json())
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

  const handleClose = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, close it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(`${process.env.REACT_APP_SHASHA_URL}/concern/close/${id}`, requestOptions)
          .then((res) => res.json())
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

  const changeStatus = (value) => {
    if (value === 0) {
      return "OPEN";
    }
    return "CLOSED";
  };

  const changeStatusCol = (value) => {
    if (value === 0) {
      return "#0000ff";
    }
    return "#ff0000";
  };

  const changeLevelCol = (value) => {
    if (value === "Low") {
      return "#0000ff";
    }
    if (value === "Medium") {
      return "#00ff00";
    }
    if (value === "HIGH") {
      return "#ffd700";
    }
    return "#ff0000";
  };

  const handleUpdate = (value) => {
    navigate(`/matters-Arising/update?id=${value}`);
  };

  const changeTime = (timestamp) => {
    const time = new Date(timestamp);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    // const retTime = time.toDateString(); // .getTime
    // eslint-disable-next-line prefer-template
    const retHMS = hours + ":" + minutes + ":" + seconds;
    // eslint-disable-next-line prefer-template
    // return retTime + " " + retHMS;
    return retHMS;
  };

  return {
    columns: [
      { Header: "Title", accessor: "title", align: "left" },
      { Header: "Message", accessor: "message", align: "left" },
      { Header: "Raised By", accessor: "raisedByName", align: "left" },
      { Header: "Raised To", accessor: "raisedToName", align: "left" },
      {
        Header: "Level",
        accessor: "level",
        // eslint-disable-next-line react/prop-types
        Cell: ({ cell: { value } }) => (
          <span className="badge badge-pill" style={{ backgroundColor: changeLevelCol(value) }}>
            {value}
          </span>
        ),
        align: "left",
      },
      {
        Header: "Created Time",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeTime(value),
        align: "left",
      },
      {
        Header: "Status",
        accessor: "status",
        // eslint-disable-next-line react/prop-types
        Cell: ({ cell: { value } }) => (
          <span className="badge badge-pill" style={{ backgroundColor: changeStatusCol(value) }}>
            {changeStatus(value)}
          </span>
        ),
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
              backgroundColor: "#f5f5f5",
              borderRadius: "2px",
            }}
          >
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <Icon sx={{ fontWeight: "light" }}>settings</Icon>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleUpdate(value)}>Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
                <Dropdown.Item onClick={() => handleClose(value)}>Close</Dropdown.Item>
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
