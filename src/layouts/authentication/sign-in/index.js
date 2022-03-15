/*
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Container } from "react-bootstrap";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const [usernamex, setUsername] = useState("");
  const [passwordx, setPassword] = useState("");

  const MySwal = withReactContent(Swal);

  const [checkedUser, setCheckedUser] = useState("");
  const [checkedPass, setCheckedPass] = useState("");
  const [enabled, setEnabled] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const handleClick = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({ username: usernamex, password: passwordx });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/login/dologin`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "SUCCESS") {
          console.log(result);
          localStorage.setItem("user1", JSON.stringify(result.data));
          let data11 = localStorage.getItem("user1");
          data11 = JSON.parse(data11);
          console.log(data11);
          const orgIDs = data11.orgID;
          console.log(orgIDs);
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            navigate("/dashboard", { replace: true });
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
  };

  const handleOnUsernameKeys = () => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    if (!usernamex.match(letters)) {
      setCheckedUser(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("username").innerHTML = "Email - input a valid email<br>";
    }
    if (usernamex.match(letters)) {
      setCheckedUser(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("username").innerHTML = "";
    }
    if (usernamex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("username").innerHTML = "Email is required<br>";
    }
    setEnabled(checkedUser === true && checkedPass === true);
    console.log(checkedUser);
  };

  const handleOnPasswordKeys = () => {
    const passwordValidate = new RegExp("^(?=.*[a-z!@#$%^&*.,])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!passwordx.match(passwordValidate)) {
      setCheckedPass(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML =
        "Password - Password must be at least 8 characters, must include a capital letter, small letter, a number and any of these symbol (!@#$%^&*.,)";
    }
    if (passwordx.match(passwordValidate)) {
      setCheckedPass(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML = "";
    }
    if (passwordx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML = "Password is required<br>";
    }
    setEnabled(checkedUser === true && checkedPass === true);
    console.log(checkedPass);
  };

  return (
    <BasicLayout image={bgImage}>
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
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
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
          <MDTypography variant="gradient" fontSize="60%" color="white" id="username">
            {" "}
          </MDTypography>
          <MDTypography variant="gradient" fontSize="60%" color="white" id="password">
            {" "}
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDInput
                      type="email"
                      value={usernamex || ""}
                      onKeyUp={handleOnUsernameKeys}
                      onChange={(e) => setUsername(e.target.value)}
                      label="Email"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDInput
                      type={passwordShown ? "text" : "password"}
                      value={passwordx || ""}
                      onKeyUp={handleOnPasswordKeys}
                      onChange={(e) => setPassword(e.target.value)}
                      label="Password"
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
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDButton
              variant="gradient"
              onClick={handleClick}
              disabled={!enabled}
              color="info"
              fullWidth
            >
              sign In
            </MDButton>
            <MDBox mt={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign Up
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox mb={1} mt={-1} textAlign="center">
              <MDTypography
                component={Link}
                to="/authentication/forgot-password"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Forgot Password
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
