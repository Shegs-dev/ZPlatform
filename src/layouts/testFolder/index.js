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

import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Container } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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
import bgImage from "assets/images/bg-sign-in-basic.gif";
import plutospaceImg from "assets/images/PlutoSpaceImg.png";

function Basic() {
  const navigate = useNavigate();
  const [filex, setFile] = useState("");

  const [usernamex, setUsername] = useState("");
  const [passwordx, setPassword] = useState("");
  const [opened, setOpened] = useState(false);

  const MySwal = withReactContent(Swal);

  const [passwordShown, setPasswordShown] = useState(false);

  function handleChange(event) {
    setFile(event.target.files[0]);
    console.log(filex);
    const formData = new FormData();
    formData.append("file", filex);
    formData.append("fileName", filex.name);
    formData.append("fileSize", filex.size);
    console.log(formData);
  }
  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      localStorage.removeItem("rexxdex");
      localStorage.removeItem("user1");
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ username: usernamex, password: passwordx });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/login/dologin`, requestOptions)
      .then(async (res) => {
        // console.log(res.headers);
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex1", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        if (result.status === "SUCCESS") {
          localStorage.setItem("user1", JSON.stringify(result.data));
          localStorage.setItem("userOtherDets", JSON.stringify(result.otherDetailsDTO));
          MySwal.fire({
            // eslint-disable-next-line dot-notation
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            if (result.otherDetailsDTO.autopass === 1) {
              navigate("/authentication/userlogin", { replace: true });
            } else {
              navigate("/dashboard", { replace: true });
            }
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
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  return (
    <div>
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
            <MDBox component="img" src={plutospaceImg} alt="PlutoSpace" width="15rem" />
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
                        onChange={(e) => setUsername(e.target.value)}
                        label="Email"
                        fullWidth
                      />
                    </div>
                  </div>
                </Container>
                <Container>
                  <div className="row">
                    <div className="col-sm-12">
                      <input type="file" onChange={handleChange} />
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
              <MDButton variant="gradient" onClick={handleClick} color="info" fullWidth>
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
              <MDBox mb={1} mt={-1} textAlign="center">
                <MDTypography
                  component={Link}
                  to="/authentication/renew-Login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Renew Subscription
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
          <CircularProgress color="info" />
        </Backdrop>
      </BasicLayout>
    </div>
  );
}

export default Basic;