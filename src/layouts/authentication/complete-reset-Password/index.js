import { useState } from "react";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Container } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.gif";

function ComResetPass() {
  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);

  const [opened, setOpened] = useState(false);
  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const [newPasswordx, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [checkedNPass, setCheckedNPass] = useState("");
  const [checkedRTNPass, setCheckedRTNPass] = useState("");
  const MySwal = withReactContent(Swal);

  const handleOnNPasswordKeys = (value) => {
    const passwordValidate = new RegExp("^(?=.*[a-z!@#$%^&*.,])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!value.match(passwordValidate)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML =
        "Password - Password must be at least 8 characters, must include a capital letter, small letter, a number and any of these symbol (!@#$%^&*.,)<br>";
      setCheckedNPass(false);
    }
    if (value.match(passwordValidate)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML = "";
      setCheckedNPass(true);
    }
    if (retypeNewPassword.length !== 0) {
      if (retypeNewPassword !== value) {
        setCheckedNPass(false);
        // eslint-disable-next-line no-unused-expressions
        document.getElementById("password").innerHTML = "Passwords don't match<br>";
      } else {
        setCheckedNPass(true);
        // eslint-disable-next-line no-unused-expressions
        document.getElementById("password").innerHTML = "";
      }
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML = "Password is required<br>";
    }
  };

  const handleOnRTNPasswordKeys = (value) => {
    if (value === newPasswordx) {
      setCheckedRTNPass(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("retypepassword").innerHTML = "";
    } else {
      setCheckedRTNPass(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("retypepassword").innerHTML = "Passwords don't match<br>";
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get("id");
    const emailValue = email;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      username: emailValue,
      password: newPasswordx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZPLATFORM_URL}/login/complete-reset-password`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setOpened(false);
        if (result.status === "SUCCESS") {
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            navigate("/authentication/sign-in", { replace: true });
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

  const handleValidate = (e) => {
    if (checkedNPass && checkedRTNPass === true) {
      handleClick(e);
    }
  };

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Create New Password
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
          <MDTypography variant="gradient" fontSize="60%" color="white" id="retypepassword">
            {" "}
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDInput
                      type={passwordShown ? "text" : "password"}
                      label="Password"
                      value={newPasswordx || ""}
                      onKeyUp={(e) => handleOnNPasswordKeys(e.target.value)}
                      onChange={(e) => setNewPassword(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={4}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDInput
                      type={passwordShown ? "text" : "password"}
                      label="Re-Type Password"
                      value={retypeNewPassword || ""}
                      onKeyUp={(e) => handleOnRTNPasswordKeys(e.target.value)}
                      onChange={(e) => setRetypeNewPassword(e.target.value)}
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
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleValidate} fullWidth>
                Save
              </MDButton>
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

export default ComResetPass;
