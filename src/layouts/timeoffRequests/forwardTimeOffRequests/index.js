import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import { Form } from "react-bootstrap";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import React, { useState, useEffect } from "react";
// import DataTable from "examples/Tables/DataTable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import ForwardTimeOffRequests from "layouts/timeoffRequests/forwardTimeOffRequests/table/forwardadd";

function ForwardTimeOff() {
  const [currentHolder, setCurrentHolder] = useState("");
  const [employeeRecord, setEmployeeRecord] = useState({});

  const [user, setUser] = useState([]);
  // const { columns: pColumns, rows: pRows } = ForwardTimeOffRequests();

  const { allPHeaders: myHeaders } = PHeaders();

  const MySwal = withReactContent(Swal);
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const ids = data11.id;

    // const eTOTId = {};
    const raw = JSON.stringify({
      orgID: orgIDs,
      employeeTimeOffTransactionID: currentHolder,
      currentHolderID: ids,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeoffjourney/add`, requestOptions)
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
          // const personalIds = data11.personalID;

          const raw2 = JSON.stringify({
            id: employeeRecord.id,
            orgID: employeeRecord.orgID,
            empID: employeeRecord.empID,
            empSetupID: employeeRecord.empSetupID,
            noOfDaysRequested: employeeRecord.noOfDaysRequested,
            noOfDaysApproved: employeeRecord.noOfDaysApproved,
            startDate: employeeRecord.startDate,
            endDate: employeeRecord.endDate,
            resumptionDate: employeeRecord.resumptionDate,
            dutyRelieverID: employeeRecord.dutyRelieverID,
            createdDate: employeeRecord.createdDate,
            purpose: employeeRecord.purpose,
            deleteFlag: employeeRecord.deleteFlag,
            approverID: currentHolder,
            adminID: employeeRecord.adminID,
            reasonForDisapproval: employeeRecord.reasonForDisapproval,
          });
          const requestOptions2 = {
            method: "POST",
            headers: myHeaders,
            body: raw2,
            redirect: "follow",
          };

          fetch(
            `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/update`,
            requestOptions2
          )
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
              MySwal.fire({
                title: resultx.status,
                type: "success",
                text: resultx.message,
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
        });
      });
  };

  /* const handleShow = (filteredData, value) => {
    let empSetupIdx = "";
    let daysx = "";
    let daysapprovex = "";
    let startx = "";
    let endx = "";
    let resumex = "";
    let dutyrelieverx = "";
    let createdx = "";
    let purposex = "";
    let deletex = "";
    let approvex = "";
    let adminx = "";
    let reasonx = "";
    // Avoid filter for empty string
    if (!value) {
      empSetupIdx = "";
      daysx = "";
      daysapprovex = "";
      startx = "";
      endx = "";
      resumex = "";
      dutyrelieverx = "";
      createdx = "";
      purposex = "";
      deletex = "";
      approvex = "";
      adminx = "";
      reasonx = "";
    } else {
      const filteredItems = filteredData.filter((item) => item.id === value);

      empSetupIdx = filteredItems[0].employeeTimeOffTransactionID;
      daysx = filteredItems[0].employeeTimeOffTransactionID;
      daysapprovex = filteredItems[0].employeeTimeOffTransactionID;
      startx = filteredItems[0].employeeTimeOffTransactionID;
      endx = filteredItems[0].employeeTimeOffTransactionID;
      resumex = filteredItems[0].employeeTimeOffTransactionID;
      dutyrelieverx = filteredItems[0].employeeTimeOffTransactionID;
      createdx = filteredItems[0].employeeTimeOffTransactionID;
      purposex = filteredItems[0].employeeTimeOffTransactionID;
      deletex = filteredItems[0].employeeTimeOffTransactionID;
      approvex = filteredItems[0].approverID;
      adminx = filteredItems[0].employeeTimeOffTransactionID;
      reasonx = filteredItems[0].employeeTimeOffTransactionID;
    }
    const sDate = new Date(startx);
    startx = sDate.getDate();
    const eDate = new Date(endx);
    endx = eDate.getDate();

    MySwal.fire({
      title: "Update Timeoff Type",
      html: `<table><tr><td>
      <tr><td><label for="starting">Start Date</label></td>
      <td><input type="text" class="swal2-input" id="starting" value="${startx}" placeholder="Start Date"></td></tr>
      <tr><td><label for="end">End Date</label></td>
      <td><input type="text" class="swal2-input" id="end" value="${endx}" placeholder="End Date"></td></tr>
      <tr><td><label for="dutyreliever">Duty Reliever</label></td>
      <td><input type="text" class="swal2-input" id="dutyreliever" value="${dutyrelieverx}" placeholder="Duty Reliever"></td></tr>
      <tr><td><label for="purpose">Purpose</label></td>
      <td><input type="text" class="swal2-input" id="purpose" value="${purposex}" placeholder="Purpose"></td></tr></table>`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const startDate = Swal.getPopup().querySelector("#starting").value;
        const end = Swal.getPopup().querySelector("#end").value;
        const dutyreliever = Swal.getPopup().querySelector("#dutyreliever").value;
        const purpose = Swal.getPopup().querySelector("#purpose").value;
        const id = value;
        const letters = /^[a-zA-Z]+$/;
        const numbers = /^[0-9]+$/;
        if (
          (startDate.length > 0 && !startDate.match(numbers)) ||
          (end.length > 0 && !end.match(numbers)) ||
          (dutyreliever.length > 0 && !dutyreliever.match(letters)) ||
          (purpose.length > 0 && !purpose.match(letters))
        ) {
          Swal.showValidationMessage(`Days Requested - Please choose a day and use only numbers`);
        } else {
          handleUpdate(
            id,
            empSetupIdx,
            daysx,
            daysapprovex,
            startDate,
            end,
            resumex,
            dutyreliever,
            createdx,
            purpose,
            deletex,
            approvex,
            adminx,
            reasonx
          );
        }
      },
    });
  }; */

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
          setUser(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const ids = urlParams.get("id");

  useEffect(() => {
    const headers = miHeaders;

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    /// const ids = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/getByIds/${ids}`, {
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
          setEmployeeRecord(result);
          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={30}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={0}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Forward Time Off Requests
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mt={2}>
              <MDTypography
                variant="button"
                fontWeight="regular"
                fontSize="80%"
                align="left"
                color="text"
              >
                Time Off Category
              </MDTypography>
              <Form.Select
                value={currentHolder || ""}
                onChange={(e) => setCurrentHolder(e.target.value)}
                aria-label="Default select example"
              >
                <option value="">Select User</option>
                {user.map((api) => (
                  <option key={api.personal.id} value={api.personal.id}>
                    {api.personal.fname} {api.personal.lname}
                  </option>
                ))}
              </Form.Select>
              <br />
            </MDBox>
            <MDBox mt={2} mb={2}>
              <MDButton
                variant="gradient"
                onClick={handleClick}
                color="info"
                width="50%"
                align="left"
              >
                Forward
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      {/* <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: pRows }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox> */}
      <Footer />
    </DashboardLayout>
  );
}

export default ForwardTimeOff;
