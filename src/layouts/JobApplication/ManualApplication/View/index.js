// @mui material components

// Soft UI Dashboard React components
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

function ViewJobPost() {
  //   const MySwal = withReactContent(Swal);
  const [jobPost, setJobPost] = useState([]);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const { allGHeaders: miHeaders } = GHeaders();

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/jobPost/getByIds/${ids}`, { headers })
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
          setJobPost(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

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
              View Job Post
            </MDTypography>
          </MDBox>
          <MDBox>
            <Container>
              <div className="row">
                <div className="col-sm-12">
                  {jobPost.length > 0 && (
                    <Card sx={{ maxWidth: 500 }}>
                      <CardContent>
                        <MDTypography
                          variant="h4"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: jobPost[0].description }}
                          />
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          Job status: {jobPost[0].jobStatus}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          orgName: {jobPost[0].orgName}
                        </MDTypography>
                        <MDTypography
                          variant="h4"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          Job Status: {jobPost[0].jobStatus}
                        </MDTypography>
                        <MDTypography
                          variant="h4"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          Industry: {jobPost[0].industry}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          Location: {jobPost[0].location}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          salary Expectation: {jobPost[0].salaryExpectation}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          createdTime: {changeDate(jobPost[0].createdTime)}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          ClosingTime: {changeDate(jobPost[0].closingTime)}
                        </MDTypography>
                      </CardContent>
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

export default ViewJobPost;
