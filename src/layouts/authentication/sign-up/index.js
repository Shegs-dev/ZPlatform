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
import { Container, Form } from "react-bootstrap";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import AllCountriesAndStates from "countries-states-master/countries";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { formatPhoneNumberIntl } from "react-phone-number-input";

function Cover() {
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const [phonex, setPhone] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [checkedPemail, setCheckedPEmail] = useState("");
  const [checkedPass, setCheckedPass] = useState("");
  const [checkedFirst, setCheckedFirst] = useState("");
  const [checkedLast, setCheckedLast] = useState("");
  const [enabled, setEnabled] = useState("");
  const navigate = useNavigate();

  const { countriesAndStates: AlCountry } = AllCountriesAndStates();

  const MySwal = withReactContent(Swal);

  const [fnamex, setFname] = useState("");
  const [lnamex, setLname] = useState("");
  const [onamex, setOname] = useState("");
  const [emailx, setEmail] = useState("");
  const [emaily, setOemail] = useState("");
  const [nationalityx, setNationality] = useState("");
  const [residentialStreetx, setResidentialStreet] = useState("");
  const [residentialCityx, setResidentialCity] = useState("");
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const [maritalStatusx, setMaritalStatus] = useState("");
  const [passwordx, setPassword] = useState("");
  const [retypePasswordx, setRetypePassword] = useState("");
  const [allStates, setAllStates] = useState([]);

  // eslint-disable-next-line no-unused-expressions
  formatPhoneNumberIntl(phonex) === "373-425-5567";

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const handleClick = (e) => {
    let dayx = "";
    let monthx = "";
    let yearx = "";
    if (startDate != null) {
      const sDate = startDate.getTime();
      console.log(`startDate: ${startDate}`);
      console.log(`sDate: ${sDate}`);
      dayx = startDate.getDate();
      monthx = startDate.getMonth() + 1;
      yearx = startDate.getFullYear();
    }
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
      dayOfBirth: dayx,
      monthOfBirth: monthx,
      yearOfBirth: yearx,
      maritalStatus: maritalStatusx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    localStorage.setItem("pass1", passwordx);
    const data123 = localStorage.getItem("pass1");
    console.log(data123);
    localStorage.setItem("email1", emaily);
    const data12 = localStorage.getItem("email1");
    console.log(data12);

    if (passwordx === retypePasswordx) {
      fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/add`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
          if (result.status === "SUCCESS") {
            MySwal.fire({
              title: result.status,
              type: "success",
              text: result.message,
            }).then(() => {
              localStorage.setItem("user", JSON.stringify(result.data));
              let data1 = localStorage.getItem("user");
              data1 = JSON.parse(data1);
              console.log(data1);
              navigate("/authentication/companyRegistration", { replace: true });
            });
          } else {
            MySwal.fire({
              title: result.status,
              type: "error",
              text: result.message,
            });
          }
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

  const handleOnChangeRCCountry = (e) => {
    const filteredItems = AlCountry.filter((item) => item.name === e.target.value);
    setAllStates(filteredItems[0].states);
    setResidentialCountry(e.target.value);
  };

  const handleOnChangeRCState = (e) => {
    setResidentialState(e.target.value);
  };

  const handleOnChangeNationality = (e) => {
    setNationality(e.target.value);
    console.log(nationalityx);
  };

  const handleOnFirstKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!fnamex.match(letters)) {
      setCheckedFirst(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML =
        "First Name - input only capital and small letters<br>";
    }
    if (fnamex.match(letters)) {
      setCheckedFirst(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML = "";
    }
    if (fnamex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML = "First Name is required<br>";
    }
    setEnabled(
      checkedPemail === true &&
        checkedPass === true &&
        checkedFirst === true &&
        checkedLast === true
    );
  };

  const handleOnLastKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!lnamex.match(letters)) {
      setCheckedLast(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML =
        "Last Name - input only capital and small letters<br>";
    }
    if (lnamex.match(letters)) {
      setCheckedLast(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML = "";
    }
    if (lnamex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML = "Last Name is required<br>";
    }
    setEnabled(
      checkedPemail === true &&
        checkedPass === true &&
        checkedFirst === true &&
        checkedLast === true
    );
  };

  const handleOnOtherKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!onamex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("other").innerHTML =
        "Other Name - input only capital and small letters<br>";
    }
    if (onamex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("other").innerHTML = "";
    }
    if (onamex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("other").innerHTML = "Other Name is required<br>";
    }
  };

  const handleOnPEmailKeys = () => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    if (!emailx.match(letters)) {
      setCheckedPEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
    }
    if (emailx.match(letters)) {
      setCheckedPEmail(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (emailx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email is required<br>";
    }
    setEnabled(
      checkedPemail === true &&
        checkedPass === true &&
        checkedFirst === true &&
        checkedLast === true
    );
  };

  const handleOnOEmailKeys = () => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    if (!emaily.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
    }
    if (emaily.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (emaily.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email is required<br>";
    }
  };

  const handleOnStreetKeys = () => {
    // eslint-disable-next-line no-invalid-regexp
    const letters = /^[a-zA-Z0-9 .,-]+$/;
    if (!residentialStreetx.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Street - use only [ - . , ] as symbols<br>";
    }
    if (residentialStreetx.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "";
    }
    if (residentialStreetx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Street is required<br>";
    }
  };

  const handleOnCityKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!residentialCityx.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "City - input only capital and small letters<br>";
    }
    if (residentialCityx.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "";
    }
    if (residentialCityx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "City is required<br>";
    }
  };

  const handleOnPasswordKeys = () => {
    const passwordValidate = new RegExp("^(?=.*[a-z!@#$%^&*.,])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!passwordx.match(passwordValidate)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML =
        "Password - Password must be at least 8 characters, must include a capital letter, small letter, a number and any of these symbol (!@#$%^&*.,)<br>";
      setCheckedPass(false);
    }
    if (passwordx.match(passwordValidate)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML = "";
      setCheckedPass(true);
    }
    if (passwordx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML = "Password is required<br>";
    }
    setEnabled(
      checkedPemail === true &&
        checkedPass === true &&
        checkedFirst === true &&
        checkedLast === true
    );
  };

  const handleOnRTPasswordKeys = () => {
    const passwordValidate = new RegExp("^(?=.*[a-z!@#$%^&*.,])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!retypePasswordx.match(passwordValidate)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML =
        "Retype Password - Password must be at least 8 characters, must include a capital letter, small letter, a number and any of these symbol (!@#$%^&*.,)<br>";
    }
    if (retypePasswordx.match(passwordValidate)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("rtPassword").innerHTML = "";
    }
    if (retypePasswordx !== passwordx) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("rtPassword").innerHTML = "Passwords don't match<br>";
    }
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
              <MDTypography variant="gradient" fontSize="60%" color="white" id="first">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="white" id="last">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="white" id="other">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="white" id="email">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="white" id="phone">
                {" "}
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
                      onKeyUp={handleOnFirstKeys}
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
                      onKeyUp={handleOnLastKeys}
                      onChange={(e) => setLname(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <Container>
              <div className="row">
                <div className="col-sm-10">
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Other Name"
                      value={onamex || ""}
                      onKeyUp={handleOnOtherKeys}
                      onChange={(e) => setOname(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </div>
              </div>
            </Container>
            <Container>
              <div className="row">
                <div className="col-sm-10">
                  <MDBox mb={2}>
                    <MDInput
                      type="email"
                      label="Personal Email"
                      value={emailx || ""}
                      onKeyUp={handleOnPEmailKeys}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </div>
              </div>
            </Container>
            <Container>
              <div className="row">
                <div className="col-sm-10">
                  <MDBox mb={2}>
                    <MDInput
                      type="email"
                      label="Official Email"
                      value={emaily || ""}
                      onKeyUp={handleOnOEmailKeys}
                      onChange={(e) => setOemail(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </div>
              </div>
            </Container>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Phone Number
                    </MDTypography>
                    <PhoneInput
                      value={phonex}
                      inputStyle={{ width: "150%" }}
                      buttonStyle={{}}
                      onChange={setPhone}
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <Container>
              <div className="row">
                <div className="col-sm-8">
                  <MDBox mb={2}>
                    <Form.Select
                      onChange={(e) => setMaritalStatus(e.target.value)}
                      value={maritalStatusx || ""}
                      aria-label="Default select example"
                    >
                      <option>---Marital Status---</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                    </Form.Select>
                  </MDBox>
                </div>
              </div>
            </Container>
            <Container>
              <div className="row">
                <div className="col-sm-12">
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
                        date={startDate}
                        wrapperClassName="date-picker"
                        placeholder="Select Birth Date"
                        dateFormat="dd/MM/yyyy"
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
              <MDTypography variant="gradient" fontSize="60%" color="white" id="street">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="white" id="city">
                {" "}
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={3}>
                      Nationality
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={nationalityx || ""}
                        aria-label="Default select example"
                        onChange={handleOnChangeNationality}
                      >
                        <option>--Select Nationality--</option>
                        {AlCountry.map((apic) => (
                          <option key={apic.code3} value={apic.name}>
                            {apic.name}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
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
                      onKeyUp={handleOnStreetKeys}
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
                      onKeyUp={handleOnCityKeys}
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
                  <div className="col-sm-8">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      Country
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={residentialCountryx || ""}
                        aria-label="Default select example"
                        onChange={handleOnChangeRCCountry}
                      >
                        <option>--Select Country--</option>
                        {AlCountry.map((apic) => (
                          <option key={apic.code3} value={apic.name}>
                            {apic.name}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </div>
                </div>
              </Container>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      State
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={residentialStatex || ""}
                        aria-label="Default select example"
                        onChange={handleOnChangeRCState}
                      >
                        <option>--Select State--</option>
                        {allStates.map((apis) => (
                          <option key={apis.code} value={apis.name}>
                            {apis.name}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </div>
                </div>
              </Container>
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
              <MDTypography variant="gradient" fontSize="60%" color="white" id="password">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="white" id="rtPassword">
                {" "}
              </MDTypography>
            </MDBox>
            <Container>
              <div className="row">
                <div className="col-sm-12">
                  <MDBox mb={2}>
                    <MDInput
                      type={passwordShown ? "text" : "password"}
                      label="Password"
                      value={passwordx || ""}
                      onKeyUp={handleOnPasswordKeys}
                      onChange={(e) => setPassword(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </div>
              </div>
            </Container>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDInput
                      type={passwordShown ? "text" : "password"}
                      label="Retype Password"
                      value={retypePasswordx || ""}
                      onKeyUp={handleOnRTPasswordKeys}
                      onChange={(e) => setRetypePassword(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <MDTypography
                    variant="button"
                    fontSize="60%"
                    align="right"
                    onClick={togglePassword}
                    mx={0}
                    color="info"
                  >
                    show password
                  </MDTypography>
                </div>
              </Container>
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
              <MDButton
                variant="gradient"
                disabled={!enabled}
                onClick={handleClick}
                color="info"
                fullWidth
              >
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
                  Sign In
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
