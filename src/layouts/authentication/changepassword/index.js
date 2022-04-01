import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const MySwal = withReactContent(Swal);
  const [passwordx, setpassword] = useState("");
  const [npasswordx, setnpassword] = useState("");
  const [retypepasswordx, setretypepassword] = useState("");
  const [checkedNPass, setCheckedNPass] = useState("");
  const [checkedRTNPass, setCheckedRTNPass] = useState("");
  const [enabled, setEnabled] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();

  const data11 = JSON.parse(localStorage.getItem("user1"));

  const emailCh = data11.email;

  const handleClick = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({ username: emailCh, password: passwordx, npassword: npasswordx });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_ZAVE_URL}/login/changepass`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
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
  const handleOnPasswordKeys = () => {
    const passwordValidate = new RegExp("^(?=.*[a-z!@#$%^&*.,])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!passwordx.match(passwordValidate)) {
      setCheckedNPass(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML =
        "Old Password - Password must be at least 8 characters, must include a capital letter, small letter, a number and any of these symbol (!@#$%^&*.,)<br>";
    }
    if (passwordx.match(passwordValidate)) {
      setCheckedNPass(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML = "";
    }
    if (passwordx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML = "Old Password is required<br>";
    }
    setEnabled(checkedNPass === true && checkedRTNPass === true);
  };

  const handleOnNPasswordKeys = () => {
    const passwordValidate = new RegExp("^(?=.*[a-z!@#$%^&*.,])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!npasswordx.match(passwordValidate)) {
      setCheckedNPass(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("npassword").innerHTML =
        "New Password - Password must be at least 8 characters, must include a capital letter, small letter, a number and any of these symbol (!@#$%^&*.,)<br>";
    }
    if (npasswordx.match(passwordValidate)) {
      setCheckedNPass(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("npassword").innerHTML = "";
    }
    if (npasswordx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("npassword").innerHTML = "New Password is required<br>";
    }
    setEnabled(checkedNPass === true && checkedRTNPass === true);
  };

  const handleOnRTNPasswordKeys = () => {
    const passwordValidate = new RegExp("^(?=.*[a-z!@#$%^&*.,])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!retypepasswordx.match(passwordValidate)) {
      setCheckedRTNPass(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("retypepassword").innerHTML =
        "Retype Password - Password must be at least 8 characters, must include a capital letter, small letter, a number and any of these symbol (!@#$%^&*.,)<br>";
    }
    if (retypepasswordx.match(passwordValidate)) {
      setCheckedRTNPass(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("retypepassword").innerHTML = "";
    }
    if (retypepasswordx !== npasswordx) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("retypepassword").innerHTML = "Passwords don't match<br>";
    }
    setEnabled(checkedNPass === true && checkedRTNPass === true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={3.5} pb={3.5} px={30}>
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
              CHANGE PASSWORD
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
            <MDTypography variant="gradient" fontSize="60%" color="white" id="npassword">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="retypepassword">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDInput
                      type={passwordShown ? "text" : "password"}
                      label="Old Password"
                      value={passwordx || ""}
                      onKeyUp={handleOnPasswordKeys}
                      onChange={(e) => setpassword(e.target.value)}
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
                  <div className="col-sm-12">
                    <MDInput
                      type={passwordShown ? "text" : "password"}
                      value={npasswordx || ""}
                      onKeyUp={handleOnNPasswordKeys}
                      onChange={(e) => setnpassword(e.target.value)}
                      label="New Password"
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
                  <div className="col-sm-12">
                    <MDInput
                      type={passwordShown ? "text" : "password"}
                      value={retypepasswordx || ""}
                      onKeyUp={handleOnRTNPasswordKeys}
                      onChange={(e) => setretypepassword(e.target.value)}
                      label="Retype Password"
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
              <MDButton
                variant="gradient"
                disabled={!enabled}
                onClick={handleClick}
                color="info"
                width="40%"
              >
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default ChangePassword;
