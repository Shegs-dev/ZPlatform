import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Container } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
// import OtpInput from "react-otp-input";
import backgroundimage1 from "assets/images/backgroundimage1.jpg";
import { Typography } from "@mui/material";

function Basic() {
  const navigate = useNavigate();

  const [usernamex, setUsername] = useState("");
  const [passwordx, setPassword] = useState("");
  const [opened, setOpened] = useState(false);

  const MySwal = withReactContent(Swal);

  const [passwordShown, setPasswordShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [otpx, setOTP] = useState("");
  const handleOpen = () => setOpen(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleClick = () => {
    setOpened(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ username: usernamex, password: passwordx });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZPLATFORM_URL}/login`, requestOptions)
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
        localStorage.setItem("id", JSON.stringify(result.data));
        openModal();
        console.log(result);
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

  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // const handleAuthentication = (e) => {
  //   setOpened(true);
  //   handleClose();
  //   e.preventDefault();
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   const lastResult = JSON.parse(localStorage.getItem("id"));
  //   const id = lastResult.message;
  //   console.log(id);
  //   const raw = JSON.stringify({ userId: id, token: otpx });
  //   console.log(raw);
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(`${process.env.REACT_APP_ZPLATFORM_URL}/login/authenticate-login`, requestOptions)
  //     .then((res) => {
  //       if (!res.ok) {
  //         return res.text().then((text) => {
  //           throw new Error(text);
  //         });
  //       }
  //       return res.json();
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       setOpened(false);
  //       localStorage.setItem("user", result);
  //       if (result.status === "SUCCESS") {
  //         console.log(result);
  //         MySwal.fire({
  //           title: "SUCCESS",
  //           type: "success",
  //           text: "Login Successful",
  //         }).then(() => {
  //           console.log("nnoo");
  //           // navigate("/dashboard");
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       setOpened(false);
  //       const err = JSON.parse(error);
  //       MySwal.fire({
  //         title: "ERROR",
  //         type: "error",
  //         text: err.error,
  //       });
  //     });
  // };
  const handleAuthentication = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (otpx.length === 6) {
      console.log("zombie");
    }

    if (otpx.length === 6) {
      const lastResult = JSON.parse(localStorage.getItem("id"));
      console.log(lastResult);
      const id = lastResult;
      console.log(id);
      const raw = JSON.stringify({ userId: id, token: otpx });
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      // setOpen(true);
      // setOpened(true);

      fetch(`${process.env.REACT_APP_ZPLATFORM_URL}/login/authenticate-login`, requestOptions)
        .then(async (res) => {
          // console.log(res.headers);;;;
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex1", aToken);
          return res.json();
        })
        .then((result) => {
          console.log(result);
          if (result.id !== null) {
            handleOpen();
            localStorage.setItem("user1", JSON.stringify(result));
            // navigate("/dashboard");
            MySwal.fire({
              title: "SUCCESS",
              type: "success",
              text: "Login Successful",
            }).then(() => {
              console.log("nnoo");
              handleOpen();
              navigate("/dashboard");
            });
            handleOpen();
          } else {
            MySwal.fire({
              title: "ERROR",
              type: "error",
              text: result.message,
            });
          }
          handleOpen();
        });
    }
  };

  useEffect(() => {
    if (otpx.length === 6) {
      handleAuthentication();
    }
  }, [otpx]);

  return (
    <div>
      <BasicLayout image={backgroundimage1}>
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
              ZPlatform Sign In
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
              </MDBox>
              <MDBox mb={2}>
                <Container>
                  <div className="row">
                    <div className="col-sm-12">
                      <MDInput
                        type={passwordShown ? "text" : "password"}
                        value={passwordx || ""}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(ev) => ev.key === "Enter" && handleClick()}
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
              <MDBox textAlign="center">
                <MDButton
                  variant="gradient"
                  onClick={() => {
                    handleClick();
                  }}
                  color="info"
                  width="50%"
                >
                  Sign In
                </MDButton>
              </MDBox>
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
                    // style={Styles.textSx}
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
                  Reset Password
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Grid>
                <Grid item xs={6} md={6}>
                  {" "}
                  {/* <HighlightOffIcon
                    onClick={handleClose}
                    fontSize="large"
                    style={{
                      padding: "5px",
                      color: "red",
                      float: "right",
                      cursor: "pointer",
                    }}
                  /> */}
                  <Box>
                    <MDBox component="form" role="form" paddingLeft="70px">
                      <MDBox
                        variant="gradient"
                        borderRadius="lg"
                        coloredShadow="success"
                        mx={-6}
                        mt={0}
                        p={3}
                        mb={1}
                        bgColor="info"
                        textAlign="center"
                        // paddingLeft="80px"
                        // style={Styles.boxSx}
                      >
                        <Typography variant="h6" fontWeight="medium" color="white" mt={1}>
                          OTP
                        </Typography>
                      </MDBox>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        {/* <OtpInput
                          value={otpx || ""}
                          onChange={handleOTP}
                          numInputs={6}
                          separator={<span>&nbsp;&nbsp;</span>}
                        /> */}
                        <Box sx={{ minWidth: 200 }} paddingLeft="20px">
                          <FormControl fullWidth>
                            <TextField
                              id="filled-number"
                              value={otpx || ""}
                              label="OTP"
                              placeholder="OTP "
                              size="small"
                              name="otp"
                              type="text"
                              onChange={(e) => setOTP(e.target.value)}
                              required
                            />
                          </FormControl>
                        </Box>
                      </Box>
                      {/* <MDBox mt={4} mb={1} paddingLeft="20px">
                        <MDButton
                          variant="gradient"
                          onClick={handleAuthentication}
                          color="info"
                          width="50%"
                          align="left"
                        >
                          Save
                        </MDButton>
                      </MDBox> */}
                    </MDBox>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </div>
        <br />
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
          <CircularProgress color="info" />
        </Backdrop>
      </BasicLayout>
    </div>
  );
}

export default Basic;
