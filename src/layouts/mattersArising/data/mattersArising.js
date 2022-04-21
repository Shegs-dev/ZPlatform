import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
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

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    let isMounted = true;
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    if (data11.otherDetailsDTO.role.id !== null) {
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

  return {
    columns: [
      { Header: "ID", accessor: "empID", align: "left" },
      { Header: "Days Requested", accessor: "noOfDaysRequested", align: "left" },
      { Header: "Days Approved", accessor: "noOfDaysApproved", align: "left" },
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
                {/* <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item> */}
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
