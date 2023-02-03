// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import PHeaders from "postHeader";
import AllCountriesAndStates from "countries-states-master/countries";

function Cover() {
  const [passwordShown, setPasswordShown] = useState(false);

  const { allPHeaders: myHeaders } = PHeaders();
  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const [startDate, setStartDate] = useState(new Date());
  const [checkedPemail, setCheckedPEmail] = useState("");
  const [checkedPass, setCheckedPass] = useState("");
  const [checkedFirst, setCheckedFirst] = useState("");
  const [checkedLast, setCheckedLast] = useState("");

  const navigate = useNavigate();
  const [files, setFiles] = useState();

  const MySwal = withReactContent(Swal);

  const [fnamex, setFname] = useState("");
  const [lnamex, setLname] = useState("");
  const [emailx, setEmail] = useState("");
  const [maritalStatusx, setMaritalStatus] = useState("");
  const [passwordx, setPassword] = useState("");
  const [retypePasswordx, setRetypePassword] = useState("");
  const [genderx, setGender] = useState("");
  const [nationalityx, setNationality] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [imgChanged, setImgChanged] = useState(false);

  const { countriesAndStates: AlCountry } = AllCountriesAndStates();

  const [opened, setOpened] = useState(false);

  const handleOnChangeNationality = (e) => {
    setNationality(e.target.value);
  };

  // modal
  const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#ffffff",
    // border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
  };

  const handleOnFirstKeys = (value) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!value.match(letters)) {
      setCheckedFirst(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML =
        "First Name - input only capital and small letters<br>";
    }
    if (value.match(letters)) {
      setCheckedFirst(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML = "First Name is required<br>";
    }
  };

  const handleOnLastKeys = (value) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!value.match(letters)) {
      setCheckedLast(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML =
        "Last Name - input only capital and small letters<br>";
    }
    if (value.match(letters)) {
      setCheckedLast(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML = "Last Name is required<br>";
    }
  };

  const handleOnPEmailKeys = (value) => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    if (!value.match(letters)) {
      setCheckedPEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
    }
    if (value.match(letters)) {
      setCheckedPEmail(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email is required<br>";
    }
  };

  const handleOnPasswordKeys = (value) => {
    const passwordValidate = new RegExp("^(?=.*[a-z!@#$%^&*.,])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!value.match(passwordValidate)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML =
        "Password - Password must be at least 8 characters, must include a capital letter, small letter, a number and any of these symbol (!@#$%^&*.,)<br>";
      setCheckedPass(false);
    }
    if (value.match(passwordValidate)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML = "";
      setCheckedPass(true);
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML = "Password is required<br>";
    }
  };

  const handleOnRTPasswordKeys = (value) => {
    if (value === passwordx) {
      setCheckedPass(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("rtPassword").innerHTML = "";
    } else {
      setCheckedPass(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("rtPassword").innerHTML = "Passwords don't match<br>";
    }
  };

  const handleClick = (e, imgUrl) => {
    setOpened(true);
    e.preventDefault();
    const dob = new Date(startDate).getTime();

    const raw = JSON.stringify({
      firstName: fnamex,
      lastName: lnamex,
      gender: genderx,
      email: emailx,
      dateOfBirth: dob,
      profilePhoto: {
        id: imgUrl.id,
        name: imgUrl.name,
        displayName: imgUrl.displayName,
        key: imgUrl.key,
        type: imgUrl.type,
        createdTime: imgUrl.createdTime,
        deleteFlag: imgUrl.deleteFlag,
      },
      maritalStatus: maritalStatusx,
      nationality: nationalityx,
      password: passwordx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_ZPLATFORM_URL}/users/register`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
        return res.json();
      })
      .then((result) => {
        localStorage.setItem("lastResult", result);
        setOpened(false);
        MySwal.fire({
          title: "SUCCESS",
          type: "success",
          text: "Registration Complete And Successful",
        }).then(() => {
          setImgChanged(false);
          navigate("/authentication/sign-in");
        });
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: "ERROR",
          type: "error",
          text: error.message,
        });
      });
  };

  const handleImageUpload = (e) => {
    if (files !== "" && files !== 0) {
      if (files === undefined) {
        MySwal.fire({
          title: "INVALID_INPUT",
          type: "error",
          text: "Please input a file",
        });
      } else {
        setOpened(true);
        e.preventDefault();
        // Headers for upload image
        const iiHeaders = new Headers();

        const dateQ = new Date().getTime();
        const imgKey = `USR-PROF-${dateQ}`;

        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("key", imgKey);
        formData.append("type", files[0].type);

        const raw = formData;

        const requestOptions = {
          method: "POST",
          headers: iiHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_ZPLATFORM_URL}/media/uploadFile`, requestOptions)
          .then((res) => {
            if (!res.ok) {
              return res.text().then((text) => {
                throw new Error(text);
              });
            }
            return res.json();
          })
          .then((result) => {
            setOpened(false);
            if (result.length === 0) {
              MySwal.fire({
                title: "INVALID_IMAGE",
                type: "error",
                text: "There is no image present",
              });
            } else {
              handleClick(e, result.data);
            }
          });
      }
    } else {
      handleClick(e);
    }
  };

  const handleValidate = (e) => {
    handleOnFirstKeys(fnamex);
    handleOnLastKeys(lnamex);
    handleOnPEmailKeys(emailx);
    handleOnPasswordKeys(passwordx);
    handleOnRTPasswordKeys(retypePasswordx);
    if (checkedFirst && checkedLast && checkedPemail && checkedPass === true) {
      handleImageUpload(e);
    }
  };

  const previewImage = (e) => {
    setFiles(e.target.files);
    if (e.target.files[0].size > 522240) {
      setImgChanged(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML = "File should not exceed 500kb<br>";
    } else if (
      e.target.files[0].type !== "image/png" &&
      e.target.files[0].type !== "image/jpg" &&
      e.target.files[0].type !== "image/jpeg" &&
      e.target.files[0].type !== "image/gif"
    ) {
      setImgChanged(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML =
        "use only JPG, JPEG, PNG, JFIF or GIF image formats<br>";
    } else {
      setSelectedImage(e.target.files[0]);
      setImgChanged(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML = "";
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
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Create an Account
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mx={0} mt={0} p={3} mb={1} textAlign="center">
              <MDTypography
                variant="h6"
                style={{
                  color: "#318CE7",
                  borderColor: "#318CE7",
                  borderWidth: "5",
                  borderStyle: "solid",
                  borderRadius: "5",
                }}
                fontWeight="medium"
                // color="white"
                mt={1}
              >
                BASIC INFO
              </MDTypography>
            </MDBox>
            <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <MDTypography variant="gradient" fontSize="60%" color="error" id="first">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="error" id="last">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="error" id="other">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="error" id="email">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="error" id="phone">
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
                      onKeyUp={(e) => handleOnFirstKeys(e.target.value)}
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
                      onKeyUp={(e) => handleOnLastKeys(e.target.value)}
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
                <div className="col-sm-12">
                  <MDBox mb={2}>
                    <MDInput
                      type="email"
                      label="Email *"
                      value={emailx || ""}
                      onKeyUp={(e) => handleOnPEmailKeys(e.target.value)}
                      onChange={(e) => setEmail(e.target.value)}
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
                  <div className="col-sm-6">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      Gender
                    </MDTypography>
                    <MDBox mb={2}>
                      <Form.Select
                        onChange={(e) => setGender(e.target.value)}
                        value={genderx || ""}
                        aria-label="Default select example"
                      >
                        <option>---Gender---</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Form.Select>
                    </MDBox>
                  </div>
                  <div className="col-sm-6">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      Marital Status
                    </MDTypography>
                    <MDBox mb={2}>
                      <Form.Select
                        onChange={(e) => setMaritalStatus(e.target.value)}
                        value={maritalStatusx || ""}
                        aria-label="Default select example"
                      >
                        <option value="">---Marital Status---</option>
                        <option value="SINGLE">Single</option>
                        <option value="MARRIED">Married</option>
                        <option value="DIVORCED">Divorced</option>
                        <option value="WIDOWED">Widowed</option>
                      </Form.Select>
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={1}>
                      Date Of Birth
                    </MDTypography>
                    <MDBox mb={0} mt={0}>
                      <div>
                        <style>
                          {`.date-picker input {
                      width: 80%
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
                  <div className="col-sm-6">
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
            <br />
            <div align="left">
              <div>
                <MDTypography
                  fontSize="70%"
                  // variant="h6"
                  // style={{
                  //   color: "#318CE7",
                  //   borderColor: "#318CE7",
                  //   borderWidth: "5",
                  //   borderStyle: "solid",
                  //   borderRadius: "5",
                  // }}
                  // fontWeight="medium"
                  // color="white"
                >
                  Add Profile Image
                </MDTypography>
                <MDInput type="file" files={files} onChange={previewImage} />
                <p id="imageVal" style={{ color: "red", fontSize: 13 }}>
                  <i> </i>
                </p>

                {imgChanged ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    style={{ maxWidth: "50%", maxHeight: "50%", borderRadius: 5 }}
                    alt="Thumb"
                  />
                ) : (
                  <div />
                )}
              </div>
            </div>
            <br />
            <MDBox mx={0} mt={0} p={3} mb={1} textAlign="center">
              <MDTypography
                variant="h6"
                style={{
                  color: "#318CE7",
                  borderColor: "#318CE7",
                  borderWidth: "5",
                  borderStyle: "solid",
                  borderRadius: "5",
                }}
                fontWeight="medium"
                // color="white"
                mt={1}
              >
                PASSWORD
              </MDTypography>
            </MDBox>
            <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <MDTypography variant="gradient" fontSize="60%" color="error" id="password">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="error" id="rtPassword">
                {" "}
              </MDTypography>
            </MDBox>
            <Container>
              <div className="row">
                <div className="col-sm-12">
                  <MDBox mb={2}>
                    <MDInput
                      type={passwordShown ? "text" : "password"}
                      label="Password *"
                      value={passwordx || ""}
                      onKeyUp={(e) => handleOnPasswordKeys(e.target.value)}
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
                      onKeyUp={(e) => handleOnRTPasswordKeys(e.target.value)}
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
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleValidate} color="info" fullWidth>
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
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </CoverLayout>
  );
}

export default Cover;
