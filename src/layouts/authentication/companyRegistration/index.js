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
import { Container, Form } from "react-bootstrap";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AllCountriesAndStates from "countries-states-master/countries";

function CompanyReg() {
  const { countriesAndStates: AlCountry } = AllCountriesAndStates();

  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const [namex, setName] = useState("");
  const [emailx, setEmail] = useState("");

  const [pnox, setPno] = useState("");
  const [descripx, setDescrip] = useState("");
  const [Streetx, setStreet] = useState("");
  const [Cityx, setCity] = useState("");
  const [Statex, setState] = useState("");
  const [Countryx, setCountry] = useState("");
  const [allStates, setAllStates] = useState([]);
  const [configPrice, setConfigPrice] = useState("");

  const [checkedComEmail, setCheckedComEmail] = useState("");
  const [checkedComStreet, setCheckedComStreet] = useState("");
  const [checkedComName, setCheckedComName] = useState("");
  const [checkedComCity, setCheckedComCity] = useState("");
  const [comEnabled, setComEnabled] = useState("");

  const [opened, setOpened] = useState(false);
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let isMounted = true;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/configuration/gets`, { myHeaders })
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
          setConfigPrice(result[0].value);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e) => {
    setOpened(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const user = JSON.parse(localStorage.getItem("user"));
    e.preventDefault();
    const raw = JSON.stringify({
      name: namex,
      email: emailx,
      pno: pnox,
      descrip: descripx,
      street: Streetx,
      city: Cityx,
      state: Statex,
      country: Countryx,
      createdBy: user.id,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_KUBU_URL}/company/add`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        const raw1 = JSON.stringify({
          orgID: result.data.id,
          personalID: user.id,
          email: localStorage.getItem("email1"),
        });
        const requestOptions1 = {
          method: "POST",
          headers: myHeaders,
          body: raw1,
          redirect: "follow",
        };
        fetch(`${process.env.REACT_APP_ZAVE_URL}/personalcompany/add`, requestOptions1)
          .then((res) => res.json())
          .then((resultx) => {
            MySwal.fire({
              title: resultx.status,
              type: "success",
              text: resultx.message,
            });
            localStorage.setItem("company", JSON.stringify(resultx.data));
            const raw2 = JSON.stringify({
              orgID: result.data.id,
              empID: user.id,
              username: user.email,
              password: localStorage.getItem("pass1"),
            });
            const requestOptions2 = {
              method: "POST",
              headers: myHeaders,
              body: raw2,
              redirect: "follow",
            };
            fetch(`${process.env.REACT_APP_ZAVE_URL}/login/add`, requestOptions2)
              .then((res) => res.json())
              .then((ress) => {
                setOpened(false);
                MySwal.fire({
                  title: ress.status,
                  type: "success",
                  text: ress.message,
                }).then(() => {
                  const raw4 = JSON.stringify({
                    orgID: result.data.id,
                    paidAmount: configPrice,
                    bonusAmount: 0,
                    totalAmount: configPrice,
                  });
                  const requestOptions4 = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw4,
                    redirect: "follow",
                  };
                  fetch(
                    `${process.env.REACT_APP_EKOATLANTIC_URL}/paymentHistory/add`,
                    requestOptions4
                  ).then(async (res) => {
                    const aToken = res.headers.get("token-1");
                    localStorage.setItem("rexxdex", aToken);
                    return res.json();
                  });
                });
              });
          });
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          navigate("/authentication/renew-Subscription", { replace: true });
        });
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  const handleOnChangeRCCountry = (e) => {
    const filteredItems = AlCountry.filter((item) => item.name === e.target.value);
    setAllStates(filteredItems[0].states);
    setCountry(e.target.value);
  };

  const handleOnChangeRCState = (e) => {
    setState(e.target.value);
  };

  const handleOnComNameKeys = () => {
    const letters = /^[a-zA-Z0-9 ]+$/;
    if (!namex.match(letters)) {
      setCheckedComName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML =
        "Company Name - input only capital and small letters<br>";
    }
    if (namex.match(letters)) {
      setCheckedComName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (namex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Company Name is required<br>";
    }
    setComEnabled(
      checkedComEmail === true &&
        checkedComName === true &&
        checkedComCity === true &&
        checkedComStreet === true
    );
  };

  const handleOnComEmailKeys = () => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    if (!emailx.match(letters)) {
      setCheckedComEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
    }
    if (emailx.match(letters)) {
      setCheckedComEmail(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (emailx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email is required<br>";
    }
    setComEnabled(
      checkedComEmail === true &&
        checkedComName === true &&
        checkedComCity === true &&
        checkedComStreet === true
    );
  };

  const handleOnStreetKeys = () => {
    // eslint-disable-next-line no-invalid-regexp
    const letters = /^[a-zA-Z0-9 .,-]+$/;
    if (!Streetx.match(letters)) {
      setCheckedComStreet(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Street - use only [ - . , ] as symbols<br>";
    }
    if (Streetx.match(letters)) {
      setCheckedComStreet(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "";
    }
    if (Streetx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Street is required<br>";
    }
    setComEnabled(
      checkedComEmail === true &&
        checkedComName === true &&
        checkedComCity === true &&
        checkedComStreet === true
    );
  };

  const handleOnCityKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!Cityx.match(letters)) {
      setCheckedComCity(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "City - input only capital and small letters<br>";
    }
    if (Cityx.match(letters)) {
      setCheckedComCity(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "";
    }
    if (Cityx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "City is required<br>";
    }
    setComEnabled(
      checkedComEmail === true &&
        checkedComName === true &&
        checkedComCity === true &&
        checkedComStreet === true
    );
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
            Register Company
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
                COMPANY INFO
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
              <MDTypography variant="gradient" fontSize="60%" color="white" id="name">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="white" id="email">
                {" "}
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Company Name"
                value={namex || ""}
                onKeyUp={handleOnComNameKeys}
                onChange={(e) => setName(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                value={emailx || ""}
                onKeyUp={handleOnComEmailKeys}
                onChange={(e) => setEmail(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Phone Number
                    </MDTypography>
                    <PhoneInput
                      value={pnox}
                      inputStyle={{ width: "150%" }}
                      buttonStyle={{}}
                      onChange={setPno}
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Description"
                value={descripx || ""}
                onChange={(e) => setDescrip(e.target.value)}
                variant="standard"
                fullWidth
              />
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
                COMPANY ADDRESS
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
                    <MDInput
                      type="text"
                      label="Street"
                      onKeyUp={handleOnStreetKeys}
                      value={Streetx || ""}
                      onChange={(e) => setStreet(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-4">
                    <MDInput
                      type="text"
                      label="City"
                      value={Cityx || ""}
                      onKeyUp={handleOnCityKeys}
                      onChange={(e) => setCity(e.target.value)}
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
                        value={Countryx || ""}
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
                        value={Statex || ""}
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
                disabled={!comEnabled}
                onClick={handleClick}
                color="info"
                fullWidth
              >
                Register
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

export default CompanyReg;
