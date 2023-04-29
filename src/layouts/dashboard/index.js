/* eslint-disable no-plusplus */
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
import dummyUser from "assets/images/dummy-user.png";
import Card from "@mui/material/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@mui/material/Grid";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

import "react-phone-input-2/lib/style.css";
import Button from "@mui/material/Button";
import nVerified from "assets/images/nVerified.jpg";

function UserProfile() {
  const [state, setState] = React.useState({
    right: false,
  });

  const [userProfilex, setUserProfile] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();

  const { allGHeaders: miHeaders } = GHeaders();

  const handleGetUserImage = () => {
    const headers = miHeaders;
    let isMounted = true;
    const lastResult = JSON.parse(localStorage.getItem("id"));
    const id = lastResult;
    fetch(`${process.env.REACT_APP_ZPLATFORM_URL}/users/get/${id}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
          console.log(result);
          if (result !== null) {
            setUserProfile(result);
            if (result.verificationStatus === "VERIFIED") {
              setVerified(true);
            }
            fetch(
              `${process.env.REACT_APP_ZPLATFORM_URL}/media/getS3Urls/${result.profilePhoto.name}`,
              {
                headers,
              }
            )
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                const resultres = await res.text();
                if (resultres === null || resultres === undefined || resultres === "") {
                  return {};
                }
                return JSON.parse(resultres);
              })
              .then((resultxx) => {
                if (resultxx.message === "Expired Access") {
                  navigate("/authentication/sign-in");
                  window.location.reload();
                }
                if (resultxx.message === "Token Does Not Exist") {
                  navigate("/authentication/sign-in");
                  window.location.reload();
                }
                if (resultxx.message === "Unauthorized Access") {
                  navigate("/authentication/forbiddenPage");
                  window.location.reload();
                }
                console.log(resultxx);
                setImageUrl(resultxx[0]);
              });
          }
        }
      });
    return () => {
      isMounted = false;
    };
  };
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      // fetches the table data
      handleGetUserImage();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }

  const view = formatDate(new Date(userProfilex.dateOfBirth));

  const calculateAge = (birthday) => {
    const myDate = new Date(birthday);
    console.log(myDate);
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    console.log(Date.now());
    console.log(birthday);
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3}>
        <Grid item xs={4} md={4} lg={4}>
          <Card>
            <div align="center">
              <div>
                {["right"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                      <MDBox mt={-4} mx={2} p={0}>
                        <MDAvatar src={imageUrl || dummyUser} alt="name" size="xxl" />
                        {verified ? (
                          <img src={nVerified} alt="verified" style={{ width: 40, height: 30 }} />
                        ) : (
                          <></>
                        )}
                      </MDBox>
                    </Button>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div align="center">
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="sm"
                coloredShadow="info"
                mt={2}
                mx={0}
                p={1}
                textAlign="center"
              >
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  fontFamily="Helvetica"
                  fontSize="120%"
                  color="white"
                >
                  {userProfilex.firstName} {userProfilex.lastName}
                </MDTypography>
              </MDBox>
            </div>
            <div align="center">
              <MDTypography
                variant="h7"
                fontWeight="medium"
                fontFamily="Century Gothic"
                fontSize="70%"
                color="dark"
                mt={0}
              >
                {userProfilex.email}
              </MDTypography>
            </div>
            <div align="center">
              <MDTypography
                variant="h5"
                fontWeight="light"
                fontSize="70%"
                fontFamily="Helvetica"
                color="dark"
                mt={0}
              >
                {userProfilex.gender}
              </MDTypography>
            </div>
            <div align="center">
              <MDTypography
                variant="h6"
                fontWeight="medium"
                fontFamily="Helvetica"
                fontSize="80%"
                color="dark"
                mt={0}
              >
                {userProfilex.maritalStatus}
              </MDTypography>
            </div>
            <div align="center">
              <MDTypography
                variant="h6"
                fontWeight="medium"
                fontFamily="Helvetica"
                fontSize="80%"
                color="dark"
                mt={0}
              >
                {userProfilex.nationality}
              </MDTypography>
            </div>
            <div align="center">
              <MDTypography
                variant="h6"
                fontWeight="medium"
                fontFamily="Helvetica"
                fontSize="80%"
                color="dark"
                mt={0}
              >
                Date Of Birth - {view}
              </MDTypography>
            </div>
            <div align="center">
              <MDTypography
                variant="h6"
                fontWeight="medium"
                fontFamily="Helvetica"
                color="dark"
                mt={0}
                mb={5}
              >
                Age - {calculateAge(view)}
              </MDTypography>
            </div>
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default UserProfile;
