import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import DatePicker from "react-datepicker";
import MDButton from "components/MDButton";

function TimeoffRequestUpdate() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [idx, setIdx] = useState("");
  const [empSetupIdx, setEmpSetupIdx] = useState("");
  const [daysx, setDaysx] = useState("");
  const [daysapprovex, setDaysapprovex] = useState("");
  const [startx, setStartx] = useState("");
  const [endx, setEndx] = useState("");
  const [resumex, setResumex] = useState("");
  const [dutyrelieverx, setDutyrelieverx] = useState("");
  const [createdx, setCreatedx] = useState("");
  const [purposex, setPurposex] = useState("");
  const [deletex, setDeletex] = useState("");
  const [approvex, setApprovex] = useState("");
  const [adminx, setAdminx] = useState("");
  const [reasonx, setReasonx] = useState("");

  const [user, setUser] = useState([]);

  // Method to fetch all timeofftype
  // Method to fetch all timeofftype
  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;
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
          // eslint-disable-next-line eqeqeq
          if (result.length != 0) {
            setIdx(result[0].id);
            setEmpSetupIdx(result[0].empSetupID);
            setDaysx(result[0].noOfDaysRequested);
            setDaysapprovex(result[0].noOfDaysApproved);
            setStartx(result[0].startDate);
            setEndx(result[0].endDate);
            setResumex(result[0].resumptionDate);
            setDutyrelieverx(result[0].dutyRelieverID);
            setCreatedx(result[0].createdDate);
            setPurposex(result[0].purpose);
            setDeletex(result[0].deleteFlag);
            setApprovex(result[0].approverID);
            setAdminx(result[0].adminID);
            setReasonx(result[0].reasonForDisapproval);
          } else {
            setIdx(null);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

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

  const handleUpdate = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    // const ids = data11.id;
    const personalIds = data11.id;
    const orgIDs = data11.orgID;

    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      empID: personalIds,
      empSetupID: empSetupIdx,
      noOfDaysRequested: daysx,
      noOfDaysApproved: daysapprovex,
      startDate: startx,
      endDate: endx,
      resumptionDate: resumex,
      dutyRelieverID: dutyrelieverx,
      createdDate: createdx,
      purpose: purposex,
      deleteFlag: deletex,
      approverID: approvex,
      adminID: adminx,
      reasonForDisapproval: reasonx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/update`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        // setOpened(false);
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
        // setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  const handleOnMessageKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!purposex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("message").innerHTML =
        "Message - input only capital and small letters<br>";
    }
    if (purposex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("message").innerHTML = "";
      handleUpdate();
    }
    if (purposex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("message").innerHTML = "Message is required<br>";
    }
    // setEnabled(checkedTitle === true);
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
                    Update Time Off-Requests
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
                  <MDTypography variant="gradient" fontSize="60%" color="white" id="title">
                    {" "}
                  </MDTypography>
                  <MDTypography variant="gradient" fontSize="60%" color="white" id="message">
                    {" "}
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
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
                            Start Date
                          </MDTypography>
                          <DatePicker
                            placeholderText="Start Date"
                            style={{ marginRight: "10px" }}
                            selected={startx}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            onChange={(start) => setStartx(start)}
                          />
                        </MDBox>
                      </div>

                      {/* <div className="col-sm-2" /> */}

                      <div className="col-sm-6">
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
                            selected={endx}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            onChange={(end) => setEndx(end)}
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
                            value={dutyrelieverx}
                            onChange={(e) => setDutyrelieverx(e.target.value)}
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
                          <MDInput
                            type="text"
                            value={purposex || ""}
                            onChange={(e) => setPurposex(e.target.value)}
                            label="Purpose"
                            variant="standard"
                            style={{ width: "100%" }}
                          />
                        </MDBox>
                      </div>
                    </div>
                  </Container>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={(e) => handleOnMessageKeys(e)}
                      // disabled={!enabled}
                      color="info"
                      width="50%"
                      align="center"
                    >
                      Update
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default TimeoffRequestUpdate;
