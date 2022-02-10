import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";

function ChangePassword() {
  const MySwal = withReactContent(Swal);
  const [passwordx, setpassword] = useState("");
  const [npasswordx, setnpassword] = useState("");
  const [retypepasswordx, setretypepassword] = useState("");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const handleClick = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({ username: "yuo", password: passwordx, npassword: npasswordx });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_ZAVE_URL}/login/changepass`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={3} pb={3} px={30}>
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
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Old Password"
                value={passwordx || ""}
                onChange={(e) => setpassword(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                value={npasswordx || ""}
                onChange={(e) => setnpassword(e.target.value)}
                label="New Password"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                value={retypepasswordx || ""}
                onChange={(e) => setretypepassword(e.target.value)}
                label="Retype Password"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleClick} color="info" width="40%">
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
