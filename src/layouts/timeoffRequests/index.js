import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Form } from "react-bootstrap";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DataTable from "examples/Tables/DataTable";
import PHeaders from "postHeader";
// import DateRangePicker from "react-dates";
import TimeOffRequests from "./time-off-requests/timeOffRequests";

function TimeOff() {
  const [purposex, setPurpose] = useState("");
  // const [deleteFlagx, setDeleteFlag] = useState("");
  // const [createdTimex, setCreatedTimex] = useState("");
  const [adminIdx, setAdminIdx] = useState("");
  const [duty, setDutyRelieverx] = useState("");
  const [titlex, setTitilex] = useState("");
  const [daysx, setDaysx] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [resumptionDate, setresumptionDate] = useState("");

  const [user, setUser] = useState([]);

  const { columns: pColumns, rows: pRows } = TimeOffRequests();

  const MySwal = withReactContent(Swal);

  const { allPHeaders: myHeaders } = PHeaders();

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);

    const orgIDs = data11.orgID;
    console.log(orgIDs);
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setUser(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddEvent = (e) => {
    const startCDate = new Date(startDate).getTime();
    const endCDate = new Date(endDate).getTime();
    const resumptionCDate = new Date(resumptionDate).getTime();
    const CurTime = new Date().getTime();
    console.log(CurTime);
    // setAllEvents([...allEvents, newEvent]);

    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);
    const personalIds = data11.personalID;
    // const datestarting = newEvent.startingdate;

    const orgIDs = data11.orgID;
    console.log(orgIDs);

    const raw = JSON.stringify({
      orgID: orgIDs,
      empID: personalIds,
      empSetupID: 0,
      noOfDaysRequested: daysx,
      startDate: startCDate,
      endDate: endCDate,
      resumptionDate: resumptionCDate,
      dutyRelieverID: duty,
      purpose: purposex,
      adminID: adminIdx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let check = 0;
    if (startCDate < CurTime) {
      check = 1;
      MySwal.fire({
        title: "Invalid Date",
        type: "error",
        text: "Please Enter A Date From The Future",
      });
    }
    if (check === 0 && endCDate < startCDate) {
      check = 1;
      MySwal.fire({
        title: "Invalid Ending Date",
        type: "error",
        text: "Please Enter A Date From The Future",
      });
    }
    if (check === 0 && resumptionCDate < endCDate) {
      check = 1;
      MySwal.fire({
        title: "Invalid Resuming Date",
        type: "error",
        text: "Please Enter A Date From The Future",
      });
    }

    if (check === 0) {
      fetch(`${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/add`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
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
    }

    console.log(raw);
  };

  //   const handleOnChangeGetallUsers = (e) => {
  //     setDutyRelieverx(e.target.value);
  //     setAdminIdx(e.target.value);
  //   };

  //   const handleOnDaysRequested = () => {
  //     const letters = /^[0-9 ]+$/;
  //     if (!newEvent.daysrequested.match(letters)) {
  //       setCheckedName(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("requested").innerHTML = " - Input only numbers<br>";
  //     }
  //     if (newEvent.daysrequested.match(letters)) {
  //       setCheckedName(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("requested").innerHTML = "";
  //     }
  //     if (newEvent.daysrequested.length === 0) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("requested").innerHTML = "This Field is required<br>";
  //     }
  //     setEnabled(checkedName === true);
  //   };

  //   const handleOnEnding = () => {
  //     const letters = /^[a-zA-Z0-9 ]+$/;
  //     if (!newEvent.endingdate.match(letters)) {
  //       setCheckedName(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("ending").innerHTML =
  //         " - Input only capital, small letters and numbers<br>";
  //     }
  //     if (newEvent.endingdate.match(letters)) {
  //       setCheckedName(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("ending").innerHTML = "";
  //     }
  //     if (newEvent.endingdate.length === 0) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("ending").innerHTML = "This Field is required<br>";
  //     }
  //     setEnabled(checkedName === true);
  //   };

  //   const handleOnResuming = () => {
  //     const letters = /^[a-zA-Z0-9 ]+$/;
  //     if (!newEvent.resumptiondate.match(letters)) {
  //       setCheckedName(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("resuming").innerHTML =
  //         " - Input only capital, small letters and numbers<br>";
  //     }
  //     if (newEvent.resumptiondate.match(letters)) {
  //       setCheckedName(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("resuming").innerHTML = "";
  //     }
  //     if (newEvent.resumptiondate.length === 0) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("resuming").innerHTML = "Resumption Date is required<br>";
  //     }
  //     setEnabled(checkedName === true);
  //   };

  //   const handleOnPurpose = () => {
  //     const letters = /^[a-zA-Z0-9 ]+$/;
  //     if (!newEvent.purpose.match(letters)) {
  //       setCheckedName(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("purpose").innerHTML =
  //         " - Input only capital, small letters and numbers<br>";
  //     }
  //     if (newEvent.purpose.match(letters)) {
  //       setCheckedName(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("purpose").innerHTML = "";
  //     }
  //     if (newEvent.purpose.length === 0) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("purpose").innerHTML = "Purpose is required<br>";
  //     }
  //     setEnabled(checkedName === true);
  //   };

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
              Time Off Requests
            </MDTypography>
          </MDBox>
          <MDBox
            variant="gradient"
            bgColor="error"
            borderRadius="lg"
            coloredShadow="success"
            mx={3}
            mt={1}
            p={1}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="gradient" fontSize="60%" color="white" id="requested">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="starting">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="ending">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="resuming">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="purpose">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="title">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDBox mt={2}>
                      <MDInput
                        type="text"
                        value={titlex || ""}
                        onChange={(e) => setTitilex(e.target.value)}
                        label="Title"
                        variant="standard"
                        style={{ width: "100%" }}
                      />
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={3}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDBox mt={2}>
                      <MDInput
                        type="text"
                        value={daysx || ""}
                        onChange={(e) => setDaysx(e.target.value)}
                        label="Number Of Days Requested"
                        variant="standard"
                        style={{ width: "100%" }}
                      />
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDBox mt={2}>
                      <DatePicker
                        placeholderText="Start Date"
                        style={{ marginRight: "10px" }}
                        selected={startDate}
                        onChange={(start) => setStartDate(start)}
                      />
                    </MDBox>
                  </div>
                  <div className="col-sm-6">
                    <MDBox mt={2}>
                      <DatePicker
                        placeholderText="End Date"
                        selected={endDate}
                        onChange={(end) => setEndDate(end)}
                      />
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDBox mt={2}>
                      <DatePicker
                        placeholderText="Resumption Date"
                        style={{ marginRight: "10px" }}
                        selected={resumptionDate}
                        onChange={(resumptiondate) => setresumptionDate(resumptiondate)}
                      />{" "}
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDBox mt={2}>
                      <Form.Select
                        value={duty}
                        onChange={(e) => setDutyRelieverx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Select Duty Reliever</option>
                        {user.map((api) => (
                          <option key={api.personal.id} value={api.personal.id}>
                            {api.personal.fname} {api.personal.lname}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                  </div>
                  <div className="col-sm-6">
                    <MDBox mt={2}>
                      <Form.Select
                        value={adminIdx || ""}
                        onChange={(e) => setAdminIdx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Select Admin</option>
                        {user.map((api) => (
                          <option key={api.personal.id} value={api.personal.id}>
                            {api.personal.fname} {api.personal.lname}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDBox mt={2}>
                      <MDInput
                        type="text"
                        value={purposex || ""}
                        onChange={(e) => setPurpose(e.target.value)}
                        label="Purpose"
                        variant="standard"
                        style={{ width: "100%" }}
                      />
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={2} mb={2}>
              <MDButton
                variant="gradient"
                onClick={handleAddEvent}
                color="info"
                width="50%"
                align="left"
              >
                Add Event
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: pRows }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TimeOff;
