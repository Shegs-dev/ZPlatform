import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "bootstrap/dist/css/bootstrap.min.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function UserProfile() {
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

  const data11 = JSON.parse(localStorage.getItem("user1"));
  console.log(data11);
  const personalIds = data11.personalID;
  console.log(personalIds);
  const orgIDs = data11.orgID;
  console.log(orgIDs);

  useEffect(() => {
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/get/${personalIds}`)
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
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="row">
        <div className="col-sm-4">
          <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Sign In
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput type="email" label="Email" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="password" label="Password" fullWidth />
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" fullWidth>
                    sign In
                  </MDButton>
                </MDBox>
                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Don&apos;t have an account?{" "}
                    <MDTypography variant="button" color="info" fontWeight="medium" textGradient>
                      Sign Up
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
          &nbsp;
          <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Sign In
              </MDTypography>
            </MDBox>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={10}
              mt={2}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                User Profile
              </MDTypography>
            </MDBox>
          </Card>
        </div>
        <div className="col-sm-7">
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
          <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={30}
              mt={2}
              p={2}
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
              mx={30}
              mt={2}
              p={2}
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
        </div>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default UserProfile;
