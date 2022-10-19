/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import "react-datepicker/dist/react-datepicker.css";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

function ViewJobApplication() {
  const [application, setApplication] = useState([]);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allGHeaders: miHeaders } = GHeaders();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "black",
  }));

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

  // Method to set rescinded
  const setRescinded = (value) => {
    if (value) {
      return "True";
    }

    return "False";
  };

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplication/getByIds/${ids}`, { headers })
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
          setApplication(result);
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
              <div className="row">
                <div className="col-sm-12">
                  {application.length > 0 && (
                    <Card style={{ backgroundColor: "#A0CEF7" }}>
                      <MDBox pt={4} pb={3} px={10}>
                        {application.map((item) => (
                          <Box sx={{ flexGrow: 1 }} key={item.id}>
                            <Grid container spacing={2}>
                              <Grid item xs={8}>
                                <Item>
                                  <h5>Title</h5> {item.jobPost.title}
                                </Item>
                              </Grid>
                              <Grid item xs={4}>
                                <Item>
                                  <h5>Location</h5> {item.jobPost.location}
                                </Item>
                              </Grid>
                              <Grid item xs={12}>
                                <Item>
                                  <h5>Description</h5>
                                  <div
                                    // eslint-disable-next-line react/no-danger
                                    dangerouslySetInnerHTML={{
                                      __html: item.jobPost.description,
                                    }}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={4}>
                                <Item>
                                  <h5>Opening Time</h5> {changeDate(item.jobPost.openingTime)}
                                </Item>
                              </Grid>
                              <Grid item xs={4}>
                                <Item>
                                  <h5>Closing Time</h5> {changeDate(item.jobPost.closingTime)}
                                </Item>
                              </Grid>
                              <Grid item xs={4}>
                                <Item>
                                  <h5>Minimum Salary Expectation (NGN)</h5>{" "}
                                  {item.jobPost.salaryExpectation}
                                </Item>
                              </Grid>
                              <Grid item xs={4}>
                                <Item>
                                  <h5>Job Status</h5> {item.jobPost.jobStatus}
                                </Item>
                              </Grid>
                              <Grid item xs={4}>
                                <Item>
                                  {" "}
                                  <h5>Industry</h5>
                                  {item.jobPost.industry}
                                </Item>
                              </Grid>
                              <Grid item xs={4}>
                                <Item>
                                  <h5>Application Type</h5>
                                  {changeType(item.type)}
                                </Item>
                              </Grid>
                              <Grid item xs={6}>
                                <Item>
                                  {" "}
                                  <h5>Applied On</h5>
                                  {changeDate(item.applicationTime)}
                                </Item>
                              </Grid>
                              <Grid item xs={6}>
                                <Item>
                                  <h5>Is Application Rescinded?</h5>
                                  {setRescinded(item.rescinded)}
                                </Item>
                              </Grid>
                            </Grid>
                          </Box>
                        ))}
                      </MDBox>
                    </Card>
                  )}
                </div>
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
