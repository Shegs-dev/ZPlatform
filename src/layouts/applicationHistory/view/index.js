/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { Table, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import "react-datepicker/dist/react-datepicker.css";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function ViewJobApplication() {
  const [application, setApplication] = useState({});

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allGHeaders: miHeaders } = GHeaders();

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  // Method to change type
  const changeType = (value) => {
    if (value === 0) {
      return "Manual";
    }

    return "Automatic";
  };

  console.log(changeDate);
  console.log(application);
  console.log(changeType);

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplication/getForPost/${ids}`, { headers })
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
        if (isMounted) {
          console.log(result);
          setApplication(result[0]);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

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
              View Job Application
            </MDTypography>
          </MDBox>
          <MDBox>
            <Container>
              <div align="center">
                <Table striped bordered hover variant="info">
                  {/* <tr>
                    <td>
                      <b>Job Title</b>
                    </td>
                    <td>{application.jobPost.title}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Location</b>
                    </td>
                    <td>{application.jobPost.location}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Description</b>
                    </td>
                    <td>{application.jobPost.description}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Opening Time</b>
                    </td>
                    <td>
                      <span>{changeDate(application.jobPost.openingTime)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Closing Time</b>
                    </td>
                    <td>
                      <span>{changeDate(application.jobPost.openingTime)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Salary Expectation</b>
                    </td>
                    <td>{application.jobPost.salaryExpectation}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Job Status</b>
                    </td>
                    <td>{application.jobPost.jobStatus}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Industry</b>
                    </td>
                    <td>{application.jobPost.industry}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Application Type</b>
                    </td>
                    <td>
                      <span>{changeType(application.type)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Application Time</b>
                    </td>
                    <td>
                      <span>{changeDate(application.applicationTime)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Application Status</b>
                    </td>
                    <td>{application.status}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Is Application Rescinded?</b>
                    </td>
                    <td>{application.isRescinded}</td>
                  </tr> */}
                </Table>
              </div>
            </Container>
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

export default ViewJobApplication;
