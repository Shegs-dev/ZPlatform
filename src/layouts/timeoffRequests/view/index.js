import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import { Form, Container } from "react-bootstrap";
import MDButton from "components/MDButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useState, useEffect } from "react";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DatePicker from "react-datepicker";
// import InputGroup from ""

function View() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const ids = urlParams.get("id");

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [comment, setComment] = useState("");

  const [empSetupID, setEmpSetupID] = useState("");
  const [noOfDaysRequested, setNoOfDaysRequested] = useState("");
  const [noOfDaysApprovedx, setNoOfDaysApproved] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [resumptionDate, setResumptionDate] = useState("");
  const [dutyRelieverID, setDutyRelieverID] = useState("");
  // const [createdDate, setCreatedDate] = useState("");
  const [purposey, setPurposey] = useState("");
  // const [deleteFlag, setDeleteFlag] = useState("");
  const [approverID, setApproverID] = useState("");
  // const [adminID, setAdminID] = useState("");
  // const [reasonForDisapproval, setReasonForDisapproval] = useState("");
  const [items, setItems] = useState([]);

  const [approve, setApprove] = useState(false);
  console.log(approve);
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    const headers = miHeaders;
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
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          setEmpSetupID(result[0].empName);
          setNoOfDaysRequested(result[0].noOfDaysRequested);
          setNoOfDaysApproved(result[0].noOfDaysApproved);
          setStartDate(result[0].startDate);
          setEndDate(result[0].endDate);
          // setResumptionDate(result[0].resumptionDate);
          setDutyRelieverID(result[0].dutyRelieverName);
          // setCreatedDate(result[0].createdDate);
          setPurposey(result[0].purpose);
          // setDeleteFlag(result[0].deleteFlag);
          setApproverID(result[0].approverName);
          // setAdminID(result[0].adminID);
          setComment(result[0].reasonForDisapproval);
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleShow = () => {
    if (noOfDaysApprovedx > items[0].noOfDaysRequested) {
      MySwal.fire({
        title: "INVALID_DAYS_APPROVED",
        type: "error",
        text: "Number Of Days Approved Cannot Be Greater Than Number Of Days Requested",
      });
    } else {
      const raw = JSON.stringify({
        id: items[0].id,
        orgID: items[0].orgID,
        empID: items[0].empID,
        empSetupID: items[0].empSetupID,
        noOfDaysRequested: items[0].noOfDaysRequested,
        noOfDaysApproved: noOfDaysApprovedx,
        startDate: items[0].startDate,
        endDate: items[0].endDate,
        resumptionDate: items[0].resumptionDate,
        dutyRelieverID: items[0].dutyRelieverID,
        createdDate: items[0].createdTime,
        purpose: items[0].purpose,
        deleteFlag: items[0].deleteFlag,
        approverID: items[0].approverID,
        adminID: items[0].adminID,
        reasonForDisapproval: comment,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/update`,
        requestOptions
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
  };

  const handleOnChange = (e) => {
    setShowComment(e.target.value);
    setComment(e.target.value);
  };

  const handleApprove = (e) => {
    setApprove(e.target.value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="row">
        <div className="col-sm-2">&nbsp;</div>
        <div className="col-sm-8" align="center">
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="success"
                  mx={2}
                  mt={-6}
                  p={3}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                    Approve/Disapprove Time Off-Requests
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Employee's"
                          disabled
                          value={empSetupID || ""}
                          onChange={(e) => setEmpSetupID(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Duty Reliever"
                          disabled
                          value={dutyRelieverID || ""}
                          onChange={(e) => setDutyRelieverID(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Approvers"
                          disabled
                          value={approverID || ""}
                          onChange={(e) => setApproverID(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>

                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Days Requested"
                          disabled
                          value={noOfDaysRequested || ""}
                          onChange={(e) => setNoOfDaysRequested(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Days Approved"
                          value={noOfDaysApprovedx || ""}
                          onChange={(e) => setNoOfDaysApproved(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                  &nbsp;
                  <Container>
                    <div className="row">
                      <div className="col-sm-6">
                        <style>
                          {`.date-picker input {
                              width: 50%
                              align: left
                            }`}
                        </style>
                        <DatePicker
                          date={startDate}
                          wrapperClassName="date-picker"
                          placeholder="Select Birth Date"
                          disabled
                          dateFormat="MM/dd/yyyy"
                          confirmBtnText="Confirm"
                          showCancelButton="true"
                          customStyles={{
                            placeholderText: {
                              fontSize: 5,
                            },
                            dateIcon: {
                              height: 0,
                              width: 0,
                            },
                            dateText: {
                              color: "#b3b4b5",
                              fontSize: 16,
                            },
                            dateInput: {
                              borderWidth: 0,
                            },
                          }}
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </div>

                      <div className="col-sm-6">
                        <style>
                          {`.date-picker input {
                              width: 50%
                              align: left
                            }`}
                        </style>
                        <DatePicker
                          date={endDate}
                          wrapperClassName="date-picker"
                          placeholder="Select Birth Date"
                          disabled
                          dateFormat="MM/dd/yyyy"
                          confirmBtnText="Confirm"
                          showCancelButton="true"
                          customStyles={{
                            placeholderText: {
                              fontSize: 5,
                            },
                            dateIcon: {
                              height: 0,
                              width: 0,
                            },
                            dateText: {
                              color: "#b3b4b5",
                              fontSize: 16,
                            },
                            dateInput: {
                              borderWidth: 0,
                            },
                          }}
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <MDBox mb={2} mx={0}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Purpose"
                          disabled
                          value={purposey || ""}
                          onChange={(e) => setPurposey(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      {/* <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Status"
                          disabled
                          value={resumptionDate || ""}
                          onChange={(e) => setResumptionDate(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div> */}
                    </div>
                  </Container>
                </MDBox>
                {/* <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Marital Status"
                          disabled
                          value={dutyRelieverID || ""}
                          onChange={(e) => setDutyRelieverID(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox> */}
              </MDBox>
            </MDBox>
          </Card>
        </div>
      </div>
      &nbsp;
      <div className="row">
        <div className="col-sm-2">&nbsp;</div>
        <div className="col-sm-8" align="center">
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="setPurposex"
                    placeholder="Description"
                    value={(comment || "", showComment)}
                    onChange={(e) => handleOnChange(e.target.value)}
                  >
                    <Form.Label>Approve/Disapprove Time Off-Requests</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Form>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="disapprove"
                    id="disapprove"
                    //  onChange={handleOnChange}
                  />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="form-check-label" htmlFor="disapprove">
                    Disapprove
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="approve"
                    id="approve"
                    onChange={handleApprove}
                  />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="form-check-label" htmlFor="approve">
                    Approve
                  </label>
                </div>
              </MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        onClick={handleShow}
                        color="info"
                        width="50%"
                        align="left"
                      >
                        Approve
                      </MDButton>
                    </MDBox>
                  </div>

                  {/* <MDBox mt={2} mb={2}>
                <MDButton
                  variant="gradient"
                  onClick={handleShow}
                  color="info"
                  width="50%"
                  align="left"
                >
                  Add Event
                </MDButton>
              </MDBox> */}
                  {/* <input type="submit" value="Submit" onClick={handleClick} /> */}

                  {/* <InputGroup className="mb-3">
                <Button variant="outline-secondary" id="button-addon1">
                  Button
                </Button>
              </InputGroup> */}

                  <div className="col-sm-6">
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        onClick={handleShow}
                        color="info"
                        width="50%"
                        align="right"
                      >
                        Disapprove
                      </MDButton>
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default View;
