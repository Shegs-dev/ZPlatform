import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { Container, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "bootstrap/dist/css/bootstrap.min.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function VIewUser() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  const idVal = JSON.parse([id]);
  console.log(idVal);

  const [fnamex, setFname] = useState("");
  const [lnamex, setLname] = useState("");
  const [onamex, setOname] = useState("");
  const [emailx, setEmail] = useState("");
  const [phonex, setPhone] = useState("");
  //   const [dayOfBirthx, setDayOfBirth] = useState("");
  //   const [monthOfBirthx, setMonthOfBirth] = useState("");
  //   const [yearOfBirthx, setYearOfBirth] = useState("");
  const [nationalityx, setNationality] = useState("");
  const [residentialStreetx, setResidentialStreet] = useState("");
  const [residentialCityx, setResidentialCity] = useState("");
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const [maritalStatusx, setMaritalStatus] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // From d modals
  const [department, setDepartment] = useState([]);
  const [companyRole, setCompanyRole] = useState([]);
  const [position, setPosition] = useState([]);
  const [branch, setBranch] = useState([]);
  // continue sha
  const [officeItems, setOfficeItem] = useState([]);
  // onChange const
  const [departx, setDepartx] = useState("");
  const [companyx, setCompanyx] = useState("");
  const [positx, setPositx] = useState("");
  const [branx, setBranx] = useState("");

  const data11 = JSON.parse(localStorage.getItem("user1"));
  console.log(data11);
  const orgIDs = data11.orgID;
  console.log(orgIDs);

  const MySwal = withReactContent(Swal);

  // save changes
  const handleOfficeSave = () => {
    const raw = JSON.stringify({
      orgID: orgIDs,
      empID: id,
      positionID: positx,
      roleID: companyx,
      branchID: branx,
      deptID: departx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);

    fetch(`${process.env.REACT_APP_ZAVE_URL}/office/update`, requestOptions)
      .then((res) => res.json())
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
  };

  useEffect(() => {
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/branch/gets/${orgIDs}`)
      .then((res) => res.json())
      .then((resultx) => {
        if (isMounted) {
          setBranch(resultx);
          console.log(resultx);

          fetch(`${process.env.REACT_APP_KUBU_URL}/role/gets/${orgIDs}`)
            .then((res) => res.json())
            .then((resultr) => {
              if (isMounted) {
                setCompanyRole(resultr);

                fetch(`${process.env.REACT_APP_KUBU_URL}/department/gets/${orgIDs}`)
                  .then((res) => res.json())
                  .then((resultd) => {
                    if (isMounted) {
                      setDepartment(resultd);

                      fetch(`${process.env.REACT_APP_KUBU_URL}/position/gets/${orgIDs}`)
                        .then((res) => res.json())
                        .then((resultp) => {
                          if (isMounted) {
                            setPosition(resultp);

                            fetch(`${process.env.REACT_APP_ZAVE_URL}/office/getForEmployee/${id}`)
                              .then((res) => res.json())
                              .then((result) => {
                                if (isMounted) {
                                  console.log(result);
                                  setOfficeItem(result);
                                  console.log(officeItems);

                                  // Setting Branch
                                  if (result.length > 0) {
                                    if (result[0].branchID != null) {
                                      let fBranch = {};
                                      // eslint-disable-next-line array-callback-return
                                      resultx.map((item) => {
                                        if (item.id === result[0].branchID) {
                                          // eslint-disable-next-line prefer-destructuring
                                          console.log(`it ${item.name}`);
                                          fBranch = item;
                                          setBranx(fBranch.id);
                                        }
                                      });
                                    }

                                    if (result[0].deptID != null) {
                                      let fDepartment = {};
                                      // eslint-disable-next-line array-callback-return
                                      resultd.map((item) => {
                                        if (item.id === result[0].deptID) {
                                          // eslint-disable-next-line prefer-destructuring
                                          console.log(`it ${item.name}`);
                                          fDepartment = item;
                                          setDepartx(fDepartment.id);
                                        }
                                      });
                                    }

                                    if (result[0].positionID != null) {
                                      let fPosition = {};
                                      // eslint-disable-next-line array-callback-return
                                      resultp.map((item) => {
                                        if (item.id === result[0].positionID) {
                                          // eslint-disable-next-line prefer-destructuring
                                          console.log(`it ${item.name}`);
                                          fPosition = item;
                                          setPositx(fPosition.id);
                                        }
                                      });
                                    }

                                    if (result[0].roleID != null) {
                                      let fCompanyRole = {};
                                      // eslint-disable-next-line array-callback-return
                                      resultr.map((item) => {
                                        if (item.id === result[0].roleID) {
                                          // eslint-disable-next-line prefer-destructuring
                                          console.log(`it ${item.name}`);
                                          fCompanyRole = item;
                                          setCompanyx(fCompanyRole.id);
                                        }
                                      });
                                    }
                                  }
                                }
                              });
                          }
                        });
                    }
                  });
              }
            });
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/get/${idVal}`)
      .then((res) => res.json())
      .then((resultp) => {
        if (isMounted) {
          setFname(resultp[0].fname);
          setLname(resultp[0].lname);
          setOname(resultp[0].oname);
          setEmail(resultp[0].email);
          setPhone(resultp[0].pno);
          //   setDayOfBirth(resultp[0].dayOfBirth);
          //   setMonthOfBirth(resultp[0].monthOfBirth);
          //   setYearOfBirth(resultp[0].yearOfBirth);
          setNationality(resultp[0].nationality);
          setResidentialStreet(resultp[0].residentialStreet);
          setResidentialCity(resultp[0].residentialCity);
          setResidentialState(resultp[0].residentialState);
          setResidentialCountry(resultp[0].residentialCountry);
          setMaritalStatus(resultp[0].maritalStatus);

          setStartDate(
            new Date(
              `${resultp[0].monthOfBirth}/${resultp[0].dayOfBirth}/${resultp[0].yearOfBirth}`
            )
          );
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // console.log(new Date(dateStamp).getTime());

  //   const toTimestamp = (strDate) => {

  //     const dt = new Date(strDate).getTime();
  //     return dt / 1000;
  //   };
  // console.log(toTimestamp(dateStamp));

  // console.log(dateStamp);

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
                  mx={25}
                  mt={-6}
                  p={3}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                    BASIC INFO
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="First Name"
                          disabled
                          value={fnamex || ""}
                          onChange={(e) => setFname(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Last Name"
                          disabled
                          value={lnamex || ""}
                          onChange={(e) => setLname(e.target.value)}
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
                      <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Other Name"
                          disabled
                          value={onamex || ""}
                          onChange={(e) => setOname(e.target.value)}
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
                      <div className="col-sm-8">
                        <MDInput
                          type="email"
                          label="Personal Email"
                          disabled
                          value={emailx || ""}
                          onChange={(e) => setEmail(e.target.value)}
                          variant="standard"
                          fullWidth
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
                          type="number"
                          label="Phone Number"
                          disabled
                          value={phonex || ""}
                          onChange={(e) => setPhone(e.target.value)}
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
                      <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Marital Status"
                          disabled
                          value={maritalStatusx || ""}
                          onChange={(e) => setMaritalStatus(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>

                <Container>
                  <div className="row">
                    <div className="col-sm-8">
                      <MDBox mb={0} mt={0} textAlign="left">
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          color="text"
                          mt={1}
                          textAlign="left"
                        >
                          Date Of Birth
                        </MDTypography>
                      </MDBox>
                      <MDBox mb={4} mt={0} textAlign="left">
                        <div>
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
                      </MDBox>
                    </div>
                  </div>
                </Container>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Nationality"
                          disabled
                          value={nationalityx || ""}
                          onChange={(e) => setNationality(e.target.value)}
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
                      <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Street"
                          disabled
                          value={residentialStreetx || ""}
                          onChange={(e) => setResidentialStreet(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                      <div className="col-sm-4">
                        <MDInput
                          type="text"
                          label="City"
                          disabled
                          value={residentialCityx || ""}
                          onChange={(e) => setResidentialCity(e.target.value)}
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
                          label="State"
                          disabled
                          value={residentialStatex || ""}
                          onChange={(e) => setResidentialState(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>

                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Country"
                          disabled
                          value={residentialCountryx || ""}
                          onChange={(e) => setResidentialCountry(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
          &nbsp;
          <Card mt={0} mb={1}>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={25}
              mt={-2}
              p={3}
              mb={1}
              textAlign="left"
            >
              <MDTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                textAlign="center"
                mt={1}
              >
                Bank Account
              </MDTypography>
            </MDBox>
          </Card>
          &nbsp;
          <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={25}
              mt={-2}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                textAlign="center"
                mt={1}
              >
                Next Of Kin
              </MDTypography>
            </MDBox>
          </Card>
          &nbsp;
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="success"
                  mx={25}
                  mt={-6}
                  p={3}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                    OFFICE
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <MDBox mx={4} textAlign="left">
                      <Form.Select
                        value={departx || ""}
                        onChange={(e) => setDepartx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Add Users To Company Departments</option>
                        {department.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                    <MDBox mx={4} textAlign="left">
                      <Form.Select
                        value={companyx || ""}
                        onChange={(e) => setCompanyx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Add Users To Company Roles</option>
                        {companyRole.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                    <MDBox mx={4} textAlign="left">
                      <Form.Select
                        value={positx || ""}
                        onChange={(e) => setPositx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Add Users To Company Position</option>
                        {position.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                    <MDBox mx={4} textAlign="left">
                      <Form.Select
                        value={branx || ""}
                        onChange={(e) => setBranx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Add Users To Company Branch</option>
                        {branch.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                    <Button variant="primary" onClick={handleOfficeSave}>
                      Save Changes
                    </Button>
                  </Container>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </div>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default VIewUser;
