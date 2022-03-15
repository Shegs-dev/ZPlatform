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

// @mui material components
import { useState } from "react";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function ForgotPass() {
  const [emailx, setEmail] = useState("");
  const MySwal = withReactContent(Swal);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const handleClick = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/login/forgotpassword/${emailx}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "SUCCESS") {
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            window.location.reload();
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
            Forgot Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail to change your password
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                value={emailx || ""}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleClick} fullWidth>
                Send
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default ForgotPass;
