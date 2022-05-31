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
  // const handleUpdate = (
  //   idx,
  //   titlex,
  //   messagex,
  //   groupIDx,
  //   announcementTypeIDx,
  //   createdByx,
  //   createdTimex,
  //   deleteFlagx
  // ) => {
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   const raw = JSON.stringify({
  //     id: idx,
  //     title: titlex,
  //     message: messagex,
  //     orgID: orgIDs,
  //     groupID: groupIDx,
  //     announcementTypeID: announcementTypeIDx,
  //     createdBy: createdByx,
  //     createdTime: createdTimex,
  //     deleteFlag: deleteFlagx,
  //   });
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(`${process.env.REACT_APP_SHASHA_URL}/announcement/update`, requestOptions)
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       if (result.message === "Expired Access") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Token Does Not Exist") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Unauthorized Access") {
  //         navigate("/authentication/forbiddenPage");
  //         window.location.reload();
  //       }
  //       MySwal.fire({
  //         title: result.status,
  //         type: "success",
  //         text: result.message,
  //       }).then(() => {
  //         window.location.reload();
  //       });
  //     })
  //     .catch((error) => {
  //       MySwal.fire({
  //         title: error.status,
  //         type: "error",
  //         text: error.message,
  //       });
  //     });
  // };

  // // Method to filter departments
  // const handleShow = (filteredData, value) => {
  //   let titlex = "";
  //   let messagex = "";
  //   let groupIDx = "";
  //   let announcementTypeIDx = "";
  //   let createdByx = 0;
  //   let createdTimex = 0;
  //   let deleteFlagx = 0;
  //   // Avoid filter for empty string
  //   if (!value) {
  //     titlex = "";
  //     messagex = "";
  //     groupIDx = "";
  //     announcementTypeIDx = "";
  //     createdByx = 0;
  //     createdTimex = 0;
  //     deleteFlagx = 0;
  //   } else {
  //     const filteredItems = filteredData.filter((item) => item.announcement.id === value);
  //     titlex = filteredItems[0].announcement.title;
  //     messagex = filteredItems[0].announcement.message;
  //     groupIDx = filteredItems[0].group.groupID;
  //     announcementTypeIDx = filteredItems[0].announcement.announcementTypeID;
  //     createdByx = filteredItems[0].announcement.createdBy;
  //     createdTimex = filteredItems[0].announcement.createdTime;
  //     deleteFlagx = filteredItems[0].announcement.deleteFlag;
  //   }

  //   MySwal.fire({
  //     title: "Update Announcement",
  //     html: `<table><tr><td>
  //     <label for="title">Title</label></td>
  //     <td><input type="text area" id="title" value="${titlex}" class="swal2-input" placeholder="Title"></td></tr><br>
  //     <tr><td><label for="message">Message</label></td>
  //     <td><input type="text area" class="swal2-input" id="message" value="${messagex}" placeholder="Message"></td></tr></table>`,
  //     confirmButtonText: "Save",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     preConfirm: () => {
  //       const title = Swal.getPopup().querySelector("#title").value;
  //       const message = Swal.getPopup().querySelector("#message").value;
  //       const id = value;
  //       const letters = /^[a-zA-Z('" ) ]+$/;
  //       if (titlex.length > 0 && !titlex.match(letters)) {
  //         Swal.showValidationMessage(`Title - Please write a title and use only letters`);
  //       } else {
  //         handleUpdate(
  //           id,
  //           title,
  //           message,
  //           groupIDx,
  //           announcementTypeIDx,
  //           createdByx,
  //           createdTimex,
  //           deleteFlagx
  //         );
  //       }
  //     },
  //   });
  // };

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
