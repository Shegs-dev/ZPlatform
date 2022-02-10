/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Cover() {
  const [phonex, setPhone] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const [fnamex, setFname] = useState("");
  const [lnamex, setLname] = useState("");
  const [onamex, setOname] = useState("");
  const [emailx, setEmail] = useState("");
  const [nationalityx, setNationality] = useState("");
  const [residentialStreetx, setResidentialStreet] = useState("");
  const [residentialCityx, setResidentialCity] = useState("");
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const [dayOfBirthx, setDayOfBirth] = useState("");
  const [monthOfBirthx, setMonthOfBirth] = useState("");
  const [yearOfBirthx, setYearOfBirth] = useState("");
  const [maritalStatusx, setMaritalStatus] = useState("");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const handleClick = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({
      fname: fnamex,
      lname: lnamex,
      oname: onamex,
      email: emailx,
      pno: phonex,
      nationality: nationalityx,
      residentialStreet: residentialStreetx,
      residentialCity: residentialCityx,
      residentialState: residentialStatex,
      residentialCountry: residentialCountryx,
      dayOfBirth: dayOfBirthx,
      monthOfBirth: monthOfBirthx,
      yearOfBirth: yearOfBirthx,
      maritalStatus: maritalStatusx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/add`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          localStorage.setItem("user", JSON.stringify(result.data));
          navigate("/authentication/companyRegistration", { replace: true });
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

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h2" fontWeight="medium" color="white" mt={1}>
            PlutoSpace
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Create an Account
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={0}
              mt={0}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                BASIC INFO
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <container>
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
              </container>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Other Name"
                value={onamex || ""}
                onChange={(e) => setOname(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                value={emailx || ""}
                onChange={(e) => setEmail(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <container>
                <div className="row">
                  <div className="col-sm-4">
                    <MDInput
                      type="number"
                      label="Day of Birth"
                      value={dayOfBirthx || ""}
                      onChange={(e) => setDayOfBirth(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-4">
                    <MDInput
                      type="number"
                      label="Month of Birth"
                      value={monthOfBirthx || ""}
                      onChange={(e) => setMonthOfBirth(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-4">
                    <MDInput
                      type="number"
                      label="Year of Birth"
                      value={yearOfBirthx || ""}
                      onChange={(e) => setYearOfBirth(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </container>
            </MDBox>
            <MDBox mb={2} mx={0}>
              <MDInput
                type="number"
                label="Phone Number"
                value={phonex || ""}
                onChange={(e) => setPhone(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Marital Status"
                value={maritalStatusx || ""}
                onChange={(e) => setMaritalStatus(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDTypography variant="button" fontWeight="regular" color="text" mt={1}>
              Date Of Birth
            </MDTypography>
            <MDBox mb={4} mt={-1}>
              <div>
                <style>
                  {`.date-picker input {
                      width: 50%
                 }`}
                </style>
                <DatePicker
                  wrapperClassName="date-picker"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
                <sub>Don&apos;t Fill this DOB yet, stiil under process</sub>
              </div>
            </MDBox>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={0}
              mt={0}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                ADDRESS
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nationality"
                value={nationalityx || ""}
                onChange={(e) => setNationality(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <container>
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
              </container>
            </MDBox>
            <MDBox mb={2}>
              <container>
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
              </container>
            </MDBox>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={0}
              mt={0}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                PASSWORD
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleClick} color="info" fullWidth>
                Create Account
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Create Account
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
