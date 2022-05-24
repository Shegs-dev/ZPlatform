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
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from 'react-router-dom';

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Birthdays from "layouts/dashboard/Birthdays";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate, Link } from "react-router-dom";
import GHeaders from "getHeader";
// import MDButton from "components/MDButton";

function Dashboard() {
  const MySwal = withReactContent(Swal);
  const [card, setItems] = useState([]);
  // const [groupGet, setGroupGet] = useState([]);
  const [polls, setPolls] = useState([]);
  const [allApp, setAllApp] = useState([]);

  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();

  // const { sales, tasks } = reportsLineChartData;

  useEffect(() => {
    const birthStatus = JSON.parse(localStorage.getItem("BirthDayStatus"));

    const userOData = JSON.parse(localStorage.getItem("userOtherDets"));

    const userFullName = `${userOData.personal.fname} ${userOData.personal.lname}`;

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
            console.log(groupIDs);
            fetch(`${process.env.REACT_APP_KUBU_URL}/poll/getForGroup/${groupIDs}`, {
              headers,
            })
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
                if (isMounted) {
                  setPolls(resultx);
                }
                console.log(resultx);
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
          console.log(result);
          setAllApp(result);
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
      <Card>
        <MDTypography variant="h5" fontWeight="bold" color="dark" textAlign="left" mt={1}>
          &nbsp; Announcements
        </MDTypography>
        <Container>
          <div className="row">
            {card.map((api) => (
              <div key={api.announcement.id} className="col-sm-6">
                <Accordion style={{ backgroundColor: api.announcementType.colorCode }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
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
                    <div style={{ color: "#f5f5f5" }}>{api.announcement.message}</div>
                  </AccordionDetails>
                </Accordion>
                <br />
              </div>
            ))}
          </div>
        </Container>
      </Card>
      &nbsp;{" "}
      <Card style={{ backgroundColor: "#318CE7" }}>
        <MDTypography variant="h4" fontWeight="bold" color="white" textAlign="left" mt={1}>
          &nbsp; Appraisal
        </MDTypography>
        &nbsp;
        <Container>
          <div className="row">
            {allApp.map((item) => (
              <div key={item.id} className="col-sm-4">
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
                    <MDTypography variant="h6" color="text" fontSize="75%" textAlign="left" mt={1}>
                      You have been selected to appraise - {item.name}
                    </MDTypography>
                    <MDTypography variant="h6" color="text" fontSize="75%" textAlign="left" mt={1}>
                      Appraisee - {item.appraiseeName}
                    </MDTypography>
                    <MDTypography variant="h6" color="text" fontSize="75%" textAlign="left" mt={0}>
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
              </div>
            ))}
          </div>
        </Container>
        &nbsp;
      </Card>
      &nbsp;
      <Container>
        <div className="row">
          {polls.map((api) => (
            <Link to={`/polls/vote-Polls?id=${api.id}`} key={api.id}>
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
            <Grid item xs={12} md={12} lg={12}>
              <Birthdays />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
