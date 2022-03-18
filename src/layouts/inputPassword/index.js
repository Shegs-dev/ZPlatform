import { Container } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import CoverLayout from "layouts/authentication/components/CoverLayout";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Password() {
  const [passwordShown, setPasswordShown] = useState(false);

  const navigate = useNavigate();

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const [passwordx, setPassword] = useState("");
  const [retypePasswordx, setRetypePassword] = useState("");
  const [usernamex, setUsername] = useState("");
  console.log(setUsername);
  const [checkedUser, setCheckedUser] = useState("");
  const [checkedPass, setCheckedPass] = useState("");
  const [enabled, setEnabled] = useState("");

  const MySwal = withReactContent(Swal);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const handleClick = (e) => {
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);
    const personalIds = data11.personalID;
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      empID: personalIds,
      username: usernamex,
      password: passwordx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);

    if (passwordx === retypePasswordx) {
      fetch(`${process.env.REACT_APP_ZAVE_URL}/login/add`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
          if (result.status === "SUCCESS") {
            MySwal.fire({
              title: result.status,
              type: "success",
              text: result.message,
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

  const handleOnRTPasswordKeys = () => {
    const passwordValidate = new RegExp("^(?=.*[a-z!@#$%^&*.,])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!retypePasswordx.match(passwordValidate)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML =
        "Retype Password - Password must be at least 8 characters, must include a capital letter, small letter, a number and any of these symbol (!@#$%^&*.,)";
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

  localStorage.setItem("pass1", passwordx);
  const data123 = localStorage.getItem("pass1");
  console.log(data123);

  if (passwordx === retypePasswordx) {
    fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/add`)
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

  return (
    <CoverLayout image={bgImage}>
      <Card>
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
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              onClick={handleClick}
              disabled={!enabled}
              color="info"
              fullWidth
            >
              Create Account
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Password;
