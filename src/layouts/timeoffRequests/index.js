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
import GHeaders from "getHeader";
// import DateRangePicker from "react-dates";
import { useNavigate } from "react-router-dom";
import TimeOffRequestData from "layouts/timeoffRequests/timeOffRequestTable/timeOffRequests";

function TimeOff() {
  const [purposex, setPurpose] = useState("");
  const [adminIdx, setAdminIdx] = useState("");
  const [duty, setDutyRelieverx] = useState("");
  const [titlex, setTitilex] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [resumptionDate, setresumptionDate] = useState("");

  const [user, setUser] = useState([]);
  const [empSetup, setEmpSetup] = useState([]);
  const [empSetupIdx, setEmpSetupId] = useState("");
  const { columns: pColumns, rows: pRows } = TimeOffRequestData();

  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

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
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          setUser(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/employeetimeoffsetup/getAll/${orgIDs}`, {
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
          setEmpSetup(result);
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

    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIds = data11.personalID;

    const startDateandendDate = endCDate - startCDate;
    const varx = 24 * 60 * 60 * 1000;
    const numofdays = Math.ceil(startDateandendDate / varx);

    const orgIDs = data11.orgID;
    let eTOTId = {};
    const raw = JSON.stringify({
      orgID: orgIDs,
      empID: personalIds,
      empSetupID: empSetupIdx,
      noOfDaysRequested: numofdays,
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
    // const endCDate - startCDate 24 * 60 * 60 * 1000
    // const startDateandendDates = endCDate - startCDate;
    // if (startDateandendDate) {
    //   // eslint-disable-next-line no-unused-expressions
    //     for (var i = 24; i * 60 * 60 * 1000;) {
    //       startDateandendDate/
    //     }

    // }

    // console.log(startDateandendDate);
    if (check === 0) {
      fetch(`${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/add`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          eTOTId = result;

          if (result.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (result.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (result.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
          }
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          })
            .then(() => {
              window.location.reload();
            })
            .then(() => {
              const ids = data11.id;
              const raw2 = JSON.stringify({
                orgID: orgIDs,
                employeeTimeOffTransactionID: eTOTId.data.id,
                currentHolderID: ids,
              });
              const requestOptions2 = {
                method: "POST",
                headers: myHeaders,
                body: raw2,
                redirect: "follow",
              };
              fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeoffjourney/add`, requestOptions2)
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
                });
            })
            .catch((error) => {
              console.log({
                title: error.status,
                type: "error",
                text: error.message,
              });
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
  };

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
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-5">
                    <MDBox mt={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        Start Date
                      </MDTypography>
                      <DatePicker
                        placeholderText="Start Date"
                        style={{ marginRight: "10px" }}
                        selected={startDate}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onChange={(start) => setStartDate(start)}
                      />
                    </MDBox>
                  </div>
                  <div className="col-sm-2" />
                  <div className="col-sm-5">
                    <MDBox mt={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        End Date
                      </MDTypography>
                      <DatePicker
                        placeholderText="End Date"
                        selected={endDate}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
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
                  <div className="col-sm-5">
                    <MDBox mt={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        Resumption Date
                      </MDTypography>
                      <DatePicker
                        placeholderText="Resumption Date"
                        style={{ marginRight: "10px" }}
                        selected={resumptionDate}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onChange={(resumptiondate) => setresumptionDate(resumptiondate)}
                      />{" "}
                    </MDBox>
                  </div>
                  <div className="col-sm-2" />
                  <div className="col-sm-5">
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
                        onChange={(e) => setEmpSetupId(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Select Timeoff Category</option>
                        {empSetup.map((api) => (
                          <option key={api.setup.id} value={api.setup.id}>
                            {api.timeOffTypeCondition.name}
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
                  <div className="col-sm-6">
                    <MDBox mt={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        Duty Reliever
                      </MDTypography>
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
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        Select Admin
                      </MDTypography>
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
