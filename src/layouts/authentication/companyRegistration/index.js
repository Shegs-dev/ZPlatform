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
import { Container } from "react-bootstrap";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import React, { useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function CompanyReg() {
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

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const handleClick = (e) => {
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
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          // localStorage.setItem("company", JSON.stringify(result.data));
          console.log(result.data.id);
          console.log(user.id);
          const data12 = localStorage.getItem("email1");
          console.log(data12);
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
              }).then(() => {
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
                  .then((resulty) => {
                    MySwal.fire({
                      title: resulty.status,
                      type: "success",
                      text: resulty.message,
                    }).then(() => {
                      navigate("/authentication/sign-in", { replace: true });
                    });
                  });
              });
            });
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
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Company Name"
                value={namex || ""}
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
                onChange={(e) => setEmail(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Phone Number"
                value={pnox || ""}
                onChange={(e) => setPno(e.target.value)}
                variant="standard"
                fullWidth
              />
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
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <MDInput
                      type="text"
                      label="Street"
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
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="State"
                      value={Statex || ""}
                      onChange={(e) => setState(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="Country"
                      value={Countryx || ""}
                      onChange={(e) => setCountry(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
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
                PASSWORD
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth />
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
              <MDButton variant="gradient" onClick={handleClick} color="info" fullWidth>
                sign in
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
    </CoverLayout>
  );
}

export default CompanyReg;