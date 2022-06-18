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
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function AppraisalGradeData() {
  // const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  // const axios = require("axios");
  const [items, setItems] = useState([]);
  // const [id, setId] = useState("");
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  // Method to handle update
  // const handleUpdate = (
  //   idx,
  //   valuex,
  //   gradex,
  //   colorCodex,
  //   minScorex,
  //   maxScorex,
  //   createdTimex,
  //   deleteFlagx
  // ) => {
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   const raw = JSON.stringify({
  //     id: idx,
  //     orgID: orgIDs,
  //     value: valuex,
  //     grade: gradex,
  //     colorCode: colorCodex,
  //     minScore: minScorex,
  //     maxScore: maxScorex,
  //     createdTime: createdTimex,
  //     deleteFlag: deleteFlagx,
  //   });
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalGrading/update`, requestOptions)
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

  // Method to filter departments
  // const handleShow = (filteredData, value) => {
  //   let valuex = "";
  //   let gradex = "";
  //   let colorCodex = "";
  //   let minScorex = 0;
  //   let maxScorex = 0;
  //   let createdTimex = 0;
  //   let deleteFlagx = 0;
  //   // Avoid filter for empty string
  //   if (!value) {
  //     valuex = "";
  //     gradex = "";
  //     colorCodex = "";
  //     minScorex = 0;
  //     maxScorex = 0;
  //     createdTimex = 0;
  //     deleteFlagx = 0;
  //   } else {
  //     const filteredItems = filteredData.filter((item) => item.id === value);
  //     valuex = filteredItems[0].value;
  //     gradex = filteredItems[0].grade;
  //     colorCodex = filteredItems[0].colorCode;
  //     minScorex = filteredItems[0].minScore;
  //     maxScorex = filteredItems[0].maxScore;
  //     createdTimex = filteredItems[0].createdTime;
  //     deleteFlagx = filteredItems[0].deleteFlag;

  //     MySwal.fire({
  //       title: "Update Department",
  //       html: `<table><tr><td>
  //       <label for="svalue">Score Value:</label></td>
  //       <td><input type="text" class="swal2-input" id="svalue" value="${valuex}" ></td></tr>
  //       <tr><td><label for="grade:">Grade</label></td>
  //       <td><input type="email" class="swal2-input" id="grade" value="${gradex}" ></td></tr>
  //       <tr><td><label for="minScore:">Min Score</label></td>
  //       <td><input type="text" class="swal2-input" id="minScore" value="${minScorex}" ></td></tr>
  //       <tr><td><label for="maxScore:">Max Score</label></td>
  //       <td><input type="text" class="swal2-input" id="maxScore" value="${maxScorex}" ></td></tr>
  //       <tr><td><label for="colorCode:">Color</label></td>
  //       <td><input type="color" class="swal2-input" style="width:77%" id="colorCode" value="${colorCodex}" ></td></tr>`,
  //       confirmButtonText: "Save",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       preConfirm: () => {
  //         const sValue = Swal.getPopup().querySelector("#svalue").value;
  //         const grade = Swal.getPopup().querySelector("#grade").value;
  //         const colorCode = Swal.getPopup().querySelector("#colorCode").value;
  //         const minScore = Swal.getPopup().querySelector("#minScore").value;
  //         const maxScore = Swal.getPopup().querySelector("#maxScore").value;
  //         const id = value;

  //         const Number = /^[0-9]+$/;
  //         const letters = /^[A-Z ]+$/;
  //         const gradeVali = /^[A-Z0-9 ]+$/;
  //         if (
  //           minScore > maxScore ||
  //           (sValue.length > 0 && !sValue.match(letters)) ||
  //           (grade.length > 0 && !grade.match(gradeVali)) ||
  //           (minScore.length > 0 && !minScore.match(Number)) ||
  //           (maxScore.length > 0 && !maxScore.match(Number))
  //         ) {
  //           Swal.showValidationMessage(
  //             `Score Value - input only capital letters<br> Grade - input only capital letters and numbers<br>  Minimum Score - input only numbers<br> Maximum Score - input only numbers<br> Mininmum Score should be lower than the Maximum Score `
  //           );
  //         } else {
  //           Swal.resetValidationMessage();
  //           handleUpdate(
  //             id,
  //             sValue,
  //             grade,
  //             colorCode,
  //             minScore,
  //             maxScore,
  //             createdTimex,
  //             deleteFlagx
  //           );
  //         }
  //       },
  //     });
  //   }
  // };

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

        fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalGrading/delete/${val}`, requestOptions)
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
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalGrading/gets/${orgIDs}`, { headers })
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

  const handleShow = (value) => {
    navigate(`/appraisal/update?id=${value}`);
  };

  return {
    columns: [
      { Header: "Score Value", accessor: "value", align: "left" },
      { Header: "Grade", accessor: "grade", align: "left" },
      { Header: "Minimum Score", accessor: "minScore", align: "left" },
      { Header: "Maximum Score", accessor: "maxScore", align: "left" },
      {
        Header: "Color",
        accessor: "colorCode",
        Cell: ({ cell: { value } }) => <input type="color" disabled value={value} />,
        align: "left",
      },
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
                <Dropdown.Item onClick={() => handleShow(value)}>Update</Dropdown.Item>
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
