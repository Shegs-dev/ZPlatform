/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function TimeOffRequestData() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  // const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // timeofftypedetails
  // Method to handle diable
  // const handleUpdate = (
  //   idx,
  //   empSetupIdx,
  //   daysx,
  //   daysapprovex,
  //   startx,
  //   endx,
  //   resumex,
  //   dutyrelieverx,
  //   createdx,
  //   purposex,
  //   deletex,
  //   approvex,
  //   adminx,
  //   reasonx
  // ) => {
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgIDs = data11.orgID;
  //   const personalIds = data11.personalID;

  //   const raw = JSON.stringify({
  //     id: idx,
  //     orgID: orgIDs,
  //     empID: personalIds,
  //     empSetupID: empSetupIdx,
  //     noOfDaysRequested: daysx,
  //     noOfDaysApproved: daysapprovex,
  //     startDate: startx,
  //     endDate: endx,
  //     resumptionDate: resumex,
  //     dutyRelieverID: dutyrelieverx,
  //     createdDate: createdx,
  //     purpose: purposex,
  //     deleteFlag: deletex,
  //     approverID: approvex,
  //     adminID: adminx,
  //     reasonForDisapproval: reasonx,
  //   });
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(`${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/update`, requestOptions)
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

  // const getCurrentDate = () => new Date().getTime();

  // const changeUpdateDate = (timestamp) => {
  //   const date = new Date(timestamp);
  //   let month = "0";
  //   if (date.getMonth() + 1 < 10) {
  //     const mymonth = date.getMonth() + 1;
  //     month += mymonth;
  //   } else {
  //     const mymonth = date.getMonth() + 1;
  //     month = mymonth;
  //   }
  //   let day = "0";
  //   if (date.getDate() < 10) {
  //     day += date.getDate();
  //   } else {
  //     day = date.getDate();
  //   }
  //   const retDate = `${date.getFullYear()}-${month}-${day}`;
  //   return retDate;
  // };

  // Method to filter departments
  // const handleShow = (filteredData, value) => {
  //   let empSetupIdx = "";
  //   let daysx = "";
  //   let daysapprovex = "";
  //   let startx = "";
  //   let endx = "";
  //   let resumex = "";
  //   let dutyrelieverx = "";
  //   let createdx = "";
  //   let purposex = "";
  //   let deletex = "";
  //   let approvex = "";
  //   let adminx = "";
  //   let reasonx = "";
  //   // Avoid filter for empty string
  //   if (!value) {
  //     empSetupIdx = "";
  //     daysx = "";
  //     daysapprovex = "";
  //     startx = "";
  //     endx = "";
  //     resumex = "";
  //     dutyrelieverx = "";
  //     createdx = "";
  //     purposex = "";
  //     deletex = "";
  //     approvex = "";
  //     adminx = "";
  //     reasonx = "";
  //   } else {
  //     const filteredItems = filteredData.filter((item) => item.id === value);

  //     empSetupIdx = filteredItems[0].empSetupID;
  //     daysx = filteredItems[0].noOfDaysRequested;
  //     daysapprovex = filteredItems[0].noOfDaysApproved;
  //     startx = changeUpdateDate(filteredItems[0].startDate);
  //     endx = changeUpdateDate(filteredItems[0].endDate);
  //     resumex = filteredItems[0].resumptionDate;
  //     dutyrelieverx = filteredItems[0].dutyRelieverID;
  //     createdx = filteredItems[0].createdDate;
  //     purposex = filteredItems[0].purpose;
  //     deletex = filteredItems[0].deleteFlag;
  //     approvex = filteredItems[0].approverID;
  //     adminx = filteredItems[0].adminID;
  //     reasonx = filteredItems[0].reasonForDisapproval;
  //   }
  //   // const sDate = new Date(startx);
  //   // startx = sDate.getDate();
  //   // const eDate = new Date(endx);
  //   // endx = eDate.getDate();

  //   // const changeTime = (timestamp) => {
  //   //   const startDate = new Date(timestamp);
  //   //   const retTime = startDate.toDateString();
  //   //   return retTime;
  //   // };

  //   MySwal.fire({
  //     title: "Update Time-Off Request",
  //     html: `<table><tr><td>
  //     <tr><td><label for="starting">Start Date</label></td>
  //     <td><input type="date" class="form-control" id="starting" value="${startx}" placeholder="Start Date"></td></tr><br>
  //     <tr><td><br></td></tr>
  //     <tr><td><label for="end">End Date</label></td>
  //     <td><input type="date" class="form-control" id="end" value="${endx}" placeholder="End Date"></td></tr>
  //     <tr><td><label for="dutyreliever">Duty Reliever</label></td>
  //     <td><input type="text" class="swal2-input" id="dutyreliever" value="${dutyrelieverx}" placeholder="Duty Reliever"></td></tr>
  //     <tr><td><label for="purpose">Purpose</label></td>
  //     <td><input type="text" class="swal2-input" id="purpose" value="${purposex}" placeholder="Purpose"></td></tr></table>`,
  //     confirmButtonText: "Save",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     preConfirm: () => {
  //       const startDate = Swal.getPopup().querySelector("#starting").value;
  //       const endDate = Swal.getPopup().querySelector("#end").value;
  //       const dutyreliever = Swal.getPopup().querySelector("#dutyreliever").value;
  //       const purpose = Swal.getPopup().querySelector("#purpose").value;
  //       const id = value;
  //       const letters = /^[a-zA-Z]+$/;
  //       // const numbers = /^[0-9]+$/;
  //       const startDates = new Date(startDate).getTime();
  //       const endDates = new Date(endDate).getTime();
  //       const currentTime = getCurrentDate();
  //       if (
  //         // (startDate.length > 0 && !startDate.match(numbers)) ||
  //         startDates < currentTime ||
  //         endDates < startDates ||
  //         // (end.length > 0 && !end.match(numbers)) ||
  //         (dutyreliever.length > 0 && !dutyreliever.match(letters)) ||
  //         (purpose.length > 0 && !purpose.match(letters))
  //       ) {
  //         Swal.showValidationMessage(`Days Requested - Please choose a day and use only numbers`);
  //       } else {
  //         Swal.resetValidationMessage();
  //         handleUpdate(
  //           id,
  //           empSetupIdx,
  //           daysx,
  //           daysapprovex,
  //           startDates,
  //           endDates,
  //           resumex,
  //           dutyreliever,
  //           createdx,
  //           purpose,
  //           deletex,
  //           approvex,
  //           adminx,
  //           reasonx
  //         );
  //       }
  //     },
  //   });
  // };

  // Method to handle diable
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

        fetch(
          `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/delete/${id}`,
          requestOptions
        )
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

  // Method to change type
  const changeType = (status) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIds = data11.personalID;
    const filteredItems = items.filter((item) => item.id === status);
    if (
      filteredItems[0].reasonForDisapproval !== null &&
      filteredItems[0].reasonForDisapproval !== ""
    ) {
      return "Decision Made";
      // eslint-disable-next-line no-else-return
    } else if (filteredItems[0].empID !== personalIds) {
      return "Requires Attention";
    } else {
      return "Created";
    }
  };

  const changeCol = (status) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIds = data11.personalID;
    const filteredItems = items.filter((item) => item.id === status);
    if (
      filteredItems[0].reasonForDisapproval !== null &&
      filteredItems[0].reasonForDisapproval !== ""
    ) {
      return "#FAFA33";
      // eslint-disable-next-line no-else-return
    } else if (filteredItems[0].empID !== personalIds) {
      return "#FF0000";
    } else {
      return "#0096FF";
    }
  };

  // Method to fetch all timeofftype
  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIds = data11.personalID;
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    if (
      data11.roleID !== "0" &&
      data11.roleID !== "" &&
      data11.roleID !== "null" &&
      data11.roleID !== null
    ) {
      fetch(
        `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/getAllForEmp/${orgIDs}/${personalIds}`,
        { headers }
      )
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
    } else {
      fetch(`${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/getAll/${orgIDs}`, {
        headers,
      })
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((resultx) => {
          if (resultx.message === "Expired Access") {
            navigate("/authentication/sign-in");
            window.location.reload();
          }
          if (resultx.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
            window.location.reload();
          }
          if (resultx.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
            window.location.reload();
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

  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  // const eTOTId = {};
  // const raw2 = JSON.stringify({
  //   employeeTimeOffTransactionID: eTOTId.data.id,
  // });
  // console.log(raw2);
  // const data11 = JSON.parse(localStorage.getItem("user1"));

  // const => employeeTimeOffTransactionID;

  // let eTOTId = employeeTimeOffTransactionID;

  // const handleJourney = (eTOTId) => {
  //   navigate(`/timeoffRequests/timeOffRequestJourney?id=${eTOTId}`);
  // };

  // Return table
  return {
    columns: [
      { Header: "Employee's Name", accessor: "empName", align: "left" },
      { Header: "Duty Reliever's Name", accessor: "dutyRelieverName", align: "left" },
      { Header: "Approver's Name", accessor: "approverName", align: "left" },
      { Header: "Days Requested", accessor: "noOfDaysRequested", align: "left" },
      { Header: "Days Approved", accessor: "noOfDaysApproved", align: "left" },
      {
        Header: "Start Date",
        accessor: "startDate",
        Cell: ({ cell: { value } }) => changeDate(value),
        align: "left",
      },
      {
        Header: "End Date",
        accessor: "endDate",
        Cell: ({ cell: { value } }) => changeDate(value),
        align: "left",
      },
      { Header: "Purpose", accessor: "purpose", align: "left" },
      {
        Header: "Status",
        accessor: "empSetupID",
        Cell: ({ cell: { row } }) => (
          <span
            className="badge badge-pill"
            style={{ backgroundColor: changeCol(row.original.id) }}
          >
            {changeType(row.original.id)}
          </span>
        ),
        align: "left",
      },
      {
        Header: "actions",
        accessor: "id",
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
                <Dropdown.Item
                  onClick={() =>
                    navigate(`/time-off-Requests/update-time-off-Requests?id=${value}`)
                  }
                >
                  Update
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate(`/timeoffRequests/timeOffRequestJourney?id=${value}`)}
                >
                  Time Off Request Journey
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(`/timeoffRequests/view?id=${value}`)}>
                  View
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate(`/timeoffRequests/forwardTimeOffRequests?id=${value}`)}
                >
                  Forward Time Off Request
                </Dropdown.Item>
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
