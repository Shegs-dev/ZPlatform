/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function data() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

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

        fetch(`${process.env.REACT_APP_SHASHA_URL}/announcement/delete/${value}`, requestOptions)
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

  const handleUpdate = (value) => {
    navigate(`/Update-Announcement?id=${value}`);
  };

  // Method to fetch all announcement
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/announcement/getAll/${orgIDs}`, { headers })
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
      { Header: "title", accessor: "announcement.title", align: "left" },
      { Header: "message", accessor: "announcement.message", align: "left" },
      { Header: "Group", accessor: "group.name", align: "left" },
      { Header: "Announcement Type", accessor: "announcementType.name", align: "left" },
      {
        Header: "Date Created",
        accessor: "announcement.createdTime",
        Cell: ({ cell: { value } }) => changeDate(value),
        align: "left",
      },
      {
        Header: "actions",
        accessor: "announcement.id",
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
                <Dropdown.Item onClick={() => handleUpdate(value)}>Update</Dropdown.Item>
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
