/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
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
import { Grid } from "@mui/material";

function ViewJobApplication() {
  const [application, setApplication] = useState([]);
  const [cbtResult, setCbtResult] = useState([]);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allGHeaders: miHeaders } = GHeaders();

  const scrollContainerStyle = { width: "100%", maxHeight: "60%" };

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

    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const personalIds = data11.id;

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
        if (result.length !== 0) {
          const orgid = result[0].jobPost.orgID;
          console.log(result);
          fetch(`${process.env.REACT_APP_RAGA_URL}/cbt/gets/${orgid}`, { headers })
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resulty) => {
              if (resulty.message === "Expired Access") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resulty.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resulty.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
                window.location.reload();
              }
              console.log(result);
              if (result.length !== 0 && result !== "") {
                const idsx = result.id;
                fetch(
                  `${process.env.REACT_APP_RAGA_URL}/cbt/getCBTResultsForEmp/${idsx}/${personalIds}`,
                  {
                    headers,
                  }
                )
                  .then(async (res) => {
                    const aToken = res.headers.get("token-1");
                    localStorage.setItem("rexxdex", aToken);
                    return res.json();
                  })
                  .then((resultx) => {
                    if (result.message === "Expired Access") {
                      navigate("/authentication/sign-in");
                      window.location.reload();
                    }
                    if (resultx.message === "Token Does Not Exist") {
                      navigate("/authentication/sign-in");
                      window.location.reload();
                    }
                    if (resultx.message === "Unauthorized Access") {
                      navigate("/authentication/forbiddenPage");
                      window.location.reload();
                    }
                    console.log(resultx);
                    setCbtResult(resultx);
                  });
              }
            });
        }
        if (isMounted) {
          console.log(result);
          setApplication(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // useEffect(() => {
  //   const headers = miHeaders;

  //   const data11 = JSON.parse(localStorage.getItem("MonoUser1"));

  //   const orgIDs = data11.orgID;
  //   // const empIdx = data11.personalID;
  //   const personalIds = data11.id;
  //   const personalID = data11.id;
  //   console.log(personalIds);
  //   console.log(personalID);
  //   console.log(orgIDs);
  //   console.log(jobx);
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_RAGA_URL}/cbt/gets/${}`, { headers })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       if (result.message === "Expired Access") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Token Does Not Exist") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Unauthorized Access") {
  //         navigate("/authentication/forbiddenPage");
  //         window.location.reload();
  //       }
  //       console.log(personalIds);
  //       console.log(orgIDs);
  //       console.log(result);
  //       if (result.length !== 0 && result !== "") {
  //         const ids = result.id;
  //         fetch(`${process.env.REACT_APP_RAGA_URL}/cbt/getCBTResultsForEmp/${ids}/${personalIds}`, {
  //           headers,
  //         })
  //           .then(async (res) => {
  //             const aToken = res.headers.get("token-1");
  //             localStorage.setItem("rexxdex", aToken);
  //             return res.json();
  //           })
  //           .then((resultx) => {
  //             if (result.message === "Expired Access") {
  //               navigate("/authentication/sign-in");
  //               window.location.reload();
  //             }
  //             if (resultx.message === "Token Does Not Exist") {
  //               navigate("/authentication/sign-in");
  //               window.location.reload();
  //             }
  //             if (resultx.message === "Unauthorized Access") {
  //               navigate("/authentication/forbiddenPage");
  //               window.location.reload();
  //             }
  //             console.log(personalIds);
  //             console.log(orgIDs);
  //             console.log(result);
  //             console.log(resultx);
  //             if (isMounted) {
  //               setMapp(resultx);
  //             }
  //           });
  //         console.log(personalIds);
  //         console.log(orgIDs);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

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
                    <Card sx={{ maxWidth: 500 }}>
                      <CardContent>
                        <MDTypography
                          variant="h3"
                          fontWeight="medium"
                          fontSize="120%"
                          color="info"
                          textAlign="left"
                          mt={1}
                        >
                          {application[0].jobPost.title}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={1}
                        >
                          {application[0].jobPost.location}
                        </MDTypography>
                        <MDTypography
                          variant="h4"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: application[0].jobPost.description }}
                          />
                        </MDTypography>
                        <MDTypography
                          variant="h4"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          Opening Time: {changeDate(application[0].jobPost.openingTime)}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          Closing Time: {changeDate(application[0].jobPost.closingTime)}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          Minimum Salary Expectation: NGN {application[0].jobPost.salaryExpectation}
                        </MDTypography>
                        <MDTypography
                          variant="h4"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          Job Status: {application[0].jobPost.jobStatus}
                        </MDTypography>
                        <MDTypography
                          variant="h4"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          Industry: {application[0].jobPost.industry}
                        </MDTypography>
                        <MDTypography
                          variant="h4"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          Application Type: {changeType(application[0].type)}
                        </MDTypography>
                        <MDTypography
                          variant="h4"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          Applied On: {changeDate(application[0].applicationTime)}
                        </MDTypography>
                        <MDTypography
                          variant="h4"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          Is Application Rescinded?: {setRescinded(application[0].rescinded)}
                        </MDTypography>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </Container>
          </MDBox>
        </MDBox>
        {cbtResult.length > 0 && cbtResult !== "" ? (
          <div className="scrollbar scrollbar-primary mt-2 mx-auto" style={scrollContainerStyle}>
            <MDBox mb={1.5}>
              <Container>
                <div className="row">
                  {cbtResult.map((item) => (
                    <Grid container spacing={0} key={item.id}>
                      <Grid item xs={12} md={12} lg={12}>
                        {/* <Link to={`/polls/vote-Polls?id=${api.id}`}> */}
                        <Card style={{ backgroundColor: "#318CE7" }}>
                          <CardContent>
                            <MDTypography
                              variant="h6"
                              color="white"
                              fontSize="75%"
                              textAlign="left"
                              mt={1}
                            >
                              Answers - {item.answers}
                            </MDTypography>
                            <MDTypography
                              variant="h6"
                              color="white"
                              fontSize="75%"
                              textAlign="left"
                              mt={0}
                            >
                              Final Score - {item.finalScore}
                            </MDTypography>
                            <MDTypography
                              variant="h6"
                              color="white"
                              fontSize="75%"
                              textAlign="left"
                              mt={0}
                            >
                              Grading - {item.grading}
                            </MDTypography>
                            <MDTypography
                              variant="h6"
                              color="white"
                              fontSize="75%"
                              textAlign="left"
                              mt={0}
                            >
                              Questions -{item.questions}
                            </MDTypography>
                          </CardContent>
                        </Card>{" "}
                        &nbsp; &nbsp;
                        {/* </Link> */}
                      </Grid>
                    </Grid>
                  ))}
                </div>
              </Container>
            </MDBox>
          </div>
        ) : (
          <MDBox />
        )}
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default ViewJobApplication;
