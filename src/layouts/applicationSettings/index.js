/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import "react-datepicker/dist/react-datepicker.css";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function ApplicationSettings() {
  const MySwal = withReactContent(Swal);
  const [allowAutox, setAllowAuto] = useState(false);
  const [matchingPercentagex, setMatchingPercentage] = useState(0.0);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const personalIDs = data11.id;

    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplicationSettings/get/${personalIDs}`, {
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
        setOpened(false);
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
          if (Object.keys(result).length > 0) {
            setAllowAuto(result.allowAuto);
            setMatchingPercentage(result.matchingPercentage);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const checks = e.target.checked;
    if (checks) {
      setAllowAuto(true);
    } else {
      setAllowAuto(false);
    }
  };

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();

    const numbers = /^[0-9]+$/;
    if (!matchingPercentagex.match(numbers)) {
      setOpened(false);
      MySwal.fire({
        title: "INVALID_INPUT",
        type: "error",
        text: "Matching Percentage Should Only Be Integer",
      });
    } else if (matchingPercentagex < 40) {
      setOpened(false);
      MySwal.fire({
        title: "LOW_PERCENTAGE",
        type: "error",
        text: "Matching Percentage Should Be Greater Than 40%",
      });
    } else {
      const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
      const personalIDs = data11.id;

      const raw = JSON.stringify({
        empID: personalIDs,
        allowAuto: allowAutox,
        matchingPercentage: matchingPercentagex,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplicationSettings/save`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          setOpened(false);
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
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          setOpened(false);
          MySwal.fire({
            title: error.status,
            type: "error",
            text: error.message,
          });
        });
    }
  };

  // Return table
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={30}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={1}
            mt={2}
            p={2}
            mb={1}
            textAlign="left"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" textAlign="center" mt={1}>
              Job Application Settings
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
            <MDTypography variant="gradient" fontSize="60%" color="white" id="name">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDBox mt={2}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch checked={allowAutox} onChange={(e) => handleChange(e)} />
                          }
                          label="Allow Automatic Application"
                        />
                      </FormGroup>
                    </MDBox>
                  </div>
                  <div className="col-sm-6" />
                  <div className="col-sm-6">
                    <MDBox mt={2}>
                      <MDInput
                        type="text"
                        label="Matching %"
                        value={matchingPercentagex || ""}
                        onChange={(e) => setMatchingPercentage(e.target.value)}
                        variant="standard"
                        fullWidth
                      />
                      <br />
                    </MDBox>
                  </div>
                  <div className="col-sm-6" />
                  <div className="col-sm-6">
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        onClick={handleClick}
                        color="info"
                        width="50%"
                        align="center"
                      >
                        Save
                      </MDButton>
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default ApplicationSettings;
