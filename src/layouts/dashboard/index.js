// @mui material components
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import MDTypography from "components/MDTypography";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from 'react-router-dom';

import "./index.css";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";

// import Birthdays from "layouts/dashboard/Birthdays";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate, Link } from "react-router-dom";
import GHeaders from "getHeader";
// import MDButton from "components/MDButton";

function Dashboard() {
  const MySwal = withReactContent(Swal);
  const [card, setItems] = useState([]);
  const [itemsx, setItemsx] = useState([]);
  // const [groupGet, setGroupGet] = useState([]);
  const [polls, setPolls] = useState([]);
  const [allApp, setAllApp] = useState([]);
  const [showApp, setShowApp] = useState(false);
  const [showAnn, setShowAnn] = useState(false);

  const [resulty, setResult] = useState([]);
  // console.log(resulty);

  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();

  const { sales, tasks } = reportsLineChartData;

  const scrollContainerStyle = { width: "100%", maxHeight: "60%" };

  useEffect(() => {
    const birthStatus = JSON.parse(localStorage.getItem("BirthDayStatus"));
    console.log(birthStatus);

    const userOData = JSON.parse(localStorage.getItem("userOtherDets"));

    const userFullName = `${userOData.personal.fname} ${userOData.personal.lname}`;
    console.log(userFullName);

    let isMounted = true;
    if (isMounted) {
      if (birthStatus === true) {
        MySwal.fire({
          title: "Happy Birthday",
          icon: "info",
          type: "info",
          text: `Happy Birthday ${userFullName}`,
        });
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/announcement/getCurrent/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
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
          if (result.length > 0) {
            setShowAnn(true);
          }
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const personalIds = data11.personalID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/getForEmp/${orgIDs}/${personalIds}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
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
          if (result.length !== 0) {
            let groupIDs = "";
            // eslint-disable-next-line array-callback-return
            result.map((grp) => {
              const idcheck = `${grp.group.id},`;
              groupIDs += idcheck;
            });
            fetch(`${process.env.REACT_APP_KUBU_URL}/poll/getForGroup/${groupIDs}`, {
              headers,
            })
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              })
              .then((resultx) => {
                if (resultx.message === "Expired Access") {
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
                if (isMounted) {
                  setPolls(resultx);
                }
              });
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const personalIds = data11.id;
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_SHASHA_URL}/concern/getForEmpDashboard/${orgIDs}/${personalIds}`,
      {
        headers,
      }
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
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
          // if (result.length > 0) {
          //   setShowApp(true);
          // }
          setResult(result);
          console.log(setResult);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const personalIds = data11.personalID;
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_SHASHA_URL}/appraisal/getForAppraiser/${orgIDs}/${personalIds}`,
      {
        headers,
      }
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
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
          if (result.length > 0) {
            setShowApp(true);
          }
          setAllApp(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // const CurTime = new Date().getTime();
    const Month = new Date().getMonth() + 1;
    const Dates = new Date().getDate();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getBirthdaysToday/${orgIDs}/${Dates}/${Month}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
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
          setItemsx(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAppraise = (value) => {
    navigate(`/Appraisal-Question-and-Answers?id=${value}`);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox>
              {showAnn ? (
                <Grid container spacing={0}>
                  <Card sx={{ maxHeight: 350 }}>
                    <MDTypography variant="h5" fontWeight="bold" color="dark" textAlign="left">
                      &nbsp; Announcements
                    </MDTypography>
                    <div
                      className="scrollbar scrollbar-primary mt-2 mx-auto"
                      style={scrollContainerStyle}
                    >
                      <Container>
                        <div className="row">
                          {card.map((api) => (
                            <Grid item xs={12} md={12} lg={12} key={api.announcement.id}>
                              <div>
                                <Accordion
                                  style={{ backgroundColor: api.announcementType.colorCode }}
                                >
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                  >
                                    <img
                                      src={api.announcementType.icon}
                                      alt="Icon"
                                      width="62"
                                      height="62"
                                    />
                                    &nbsp; &nbsp;
                                    <MDTypography
                                      variant="h4"
                                      fontWeight="medium"
                                      color="white"
                                      textAlign="left"
                                      mt={1}
                                    >
                                      {api.announcement.title}
                                    </MDTypography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <div style={{ color: "#f5f5f5" }}>
                                      {api.announcement.message}
                                    </div>
                                  </AccordionDetails>
                                </Accordion>
                                <br />
                              </div>
                            </Grid>
                          ))}
                        </div>
                      </Container>
                    </div>
                  </Card>
                </Grid>
              ) : (
                <MDBox />
              )}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={6} md={3} lg={3}>
            <Card sx={{ maxHeight: 350 }}>
              <div
                className="scrollbar scrollbar-primary mt-2 mx-auto"
                style={scrollContainerStyle}
              >
                <MDBox mb={1.5}>
                  <Container>
                    <div className="row">
                      {resulty.map((api) => (
                        <Grid container spacing={0}>
                          <Grid item xs={12} md={12} lg={12} key={api.id}>
                            <MDBox mb={2}>
                              <Card style={{ backgroundColor: "#318CE7" }}>
                                <CardContent>
                                  <MDTypography
                                    variant="h4"
                                    fontWeight="medium"
                                    color="white"
                                    textAlign="left"
                                    mt={1}
                                  >
                                    Matters Arising
                                  </MDTypography>
                                  <div style={{ color: "#f5f5f5" }}>{api.title}</div>
                                </CardContent>
                              </Card>{" "}
                            </MDBox>
                            {/* <Link to={`/polls/vote-Polls?id=${api.id}`}>
                              <Card style={{ backgroundColor: "#318CE7" }}>
                                <CardContent>
                                  <MDTypography
                                    variant="h4"
                                    fontWeight="medium"
                                    color="white"
                                    textAlign="left"
                                    mt={1}
                                  >
                                    Poll
                                  </MDTypography>
                                  <div style={{ color: "#f5f5f5" }}>{api.question}</div>
                                </CardContent>
                              </Card>{" "}
                              &nbsp; &nbsp;
                            </Link> */}
                          </Grid>
                        </Grid>
                      ))}
                    </div>
                  </Container>
                </MDBox>
              </div>
            </Card>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Projects />
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Card sx={{ maxHeight: 350 }}>
                <div
                  className="scrollbar scrollbar-primary mt-2 mx-auto"
                  style={scrollContainerStyle}
                >
                  <MDBox mb={1.5}>
                    <Container>
                      <div className="row">
                        {polls.map((api) => (
                          <Grid container spacing={0}>
                            <Grid item xs={12} md={12} lg={12} key={api.id}>
                              <Link to={`/polls/vote-Polls?id=${api.id}`}>
                                <Card style={{ backgroundColor: "#318CE7" }}>
                                  <CardContent>
                                    <MDTypography
                                      variant="h4"
                                      fontWeight="medium"
                                      color="white"
                                      textAlign="left"
                                      mt={1}
                                    >
                                      Poll
                                    </MDTypography>
                                    <div style={{ color: "#f5f5f5" }}>{api.question}</div>
                                  </CardContent>
                                </Card>{" "}
                                &nbsp; &nbsp;
                              </Link>
                            </Grid>
                          </Grid>
                        ))}
                        {/* <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={(e) => handleUpdate(e)}
                // disabled={!enabled}
                color="info"
                width="50%"
                align="right"
              >
                Vote Poll
              </MDButton>
            </MDBox> */}
                      </div>
                    </Container>
                  </MDBox>
                </div>
              </Card>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              {showApp ? (
                <Card style={{ backgroundColor: "#318CE7", maxHeight: 350 }}>
                  <MDTypography
                    variant="h4"
                    fontWeight="bold"
                    color="white"
                    textAlign="left"
                    mt={1}
                  >
                    &nbsp; Appraisal
                  </MDTypography>
                  &nbsp;
                  <div
                    className="scrollbar scrollbar-primary mt-2 mx-auto"
                    style={scrollContainerStyle}
                  >
                    <Container>
                      <div className="row">
                        {allApp.map((item) => (
                          <Grid item xs={12} md={12} lg={12} key={item.id}>
                            <Card sx={{ maxWidth: 345 }}>
                              <CardContent>
                                <MDTypography
                                  variant="h5"
                                  fontWeight="medium"
                                  fontSize="120%"
                                  color="info"
                                  textAlign="left"
                                  mt={1}
                                >
                                  {item.name}
                                </MDTypography>
                                <MDTypography
                                  variant="h6"
                                  color="text"
                                  fontSize="75%"
                                  textAlign="left"
                                  mt={1}
                                >
                                  You have been selected for this Appraisal
                                </MDTypography>
                                <MDTypography
                                  variant="h6"
                                  color="text"
                                  fontSize="75%"
                                  textAlign="left"
                                  mt={1}
                                >
                                  Appraisee - {item.appraiseeName}
                                </MDTypography>
                                <MDTypography
                                  variant="h6"
                                  color="text"
                                  fontSize="75%"
                                  textAlign="left"
                                  mt={0}
                                >
                                  Created By - {item.createdByName}
                                </MDTypography>
                              </CardContent>
                              <CardActions>
                                <div align="right">
                                  <MDButton
                                    variant="gradient"
                                    color="info"
                                    onClick={() => handleAppraise(item.id)}
                                    width="50%"
                                  >
                                    Appraise
                                  </MDButton>
                                </div>
                              </CardActions>
                            </Card>
                            &nbsp;
                          </Grid>
                        ))}
                      </div>
                    </Container>
                  </div>
                  &nbsp;
                </Card>
              ) : (
                <MDBox />
              )}
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      &nbsp;
      <Container>
        <div className="row">
          {/* <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={(e) => handleUpdate(e)}
                // disabled={!enabled}
                color="info"
                width="50%"
                align="right"
              >
                Vote Poll
              </MDButton>
            </MDBox> */}
        </div>
      </Container>
      <MDBox py={3}>
        {/* <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid> */}
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        <MDBox>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={6}>
              <Birthdays />
            </Grid> */}
            <Grid item xs={6} md={3} lg={3}>
              {showApp ? (
                <Card style={{ backgroundColor: "#318CE7", maxHeight: 350 }}>
                  <MDTypography
                    variant="h4"
                    fontWeight="bold"
                    color="white"
                    textAlign="left"
                    mt={1}
                  >
                    &nbsp; Birthdays
                  </MDTypography>
                  &nbsp;
                  <div
                    className="scrollbar scrollbar-primary mt-2 mx-auto"
                    style={scrollContainerStyle}
                  >
                    <Container>
                      <div className="row">
                        {itemsx.map((item) => (
                          <Grid item xs={12} md={12} lg={12} key={item.id}>
                            <Card sx={{ maxWidth: 345 }}>
                              <CardContent>
                                <MDTypography
                                  variant="h5"
                                  fontWeight="medium"
                                  fontSize="120%"
                                  color="info"
                                  textAlign="left"
                                  mt={1}
                                >
                                  {item.personal.fname}
                                </MDTypography>
                                {/* <MDTypography
                                  variant="h6"
                                  color="text"
                                  fontSize="75%"
                                  textAlign="left"
                                  mt={1}
                                >
                                  You have been selected for this Appraisal
                                </MDTypography> */}
                                <MDTypography
                                  variant="h6"
                                  color="text"
                                  fontSize="75%"
                                  textAlign="left"
                                  mt={1}
                                >
                                  Phone Number - {item.personal.pno}
                                </MDTypography>
                                <MDTypography
                                  variant="h6"
                                  color="text"
                                  fontSize="75%"
                                  textAlign="left"
                                  mt={0}
                                >
                                  Country - {item.personal.residentialCountry}
                                </MDTypography>
                                <MDTypography
                                  variant="h6"
                                  color="text"
                                  fontSize="75%"
                                  textAlign="left"
                                  mt={0}
                                >
                                  Marital Status - {item.personal.maritalStatus}
                                </MDTypography>
                              </CardContent>
                              {/* <CardActions>
                                <div align="right">
                                  <MDButton
                                    variant="gradient"
                                    color="info"
                                    onClick={() => handleAppraise(item.id)}
                                    width="50%"
                                  >
                                    Appraise
                                  </MDButton>
                                </div>
                              </CardActions> */}
                            </Card>
                            &nbsp;
                          </Grid>
                        ))}
                      </div>
                    </Container>
                  </div>
                  &nbsp;
                </Card>
              ) : (
                <MDBox />
              )}
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
