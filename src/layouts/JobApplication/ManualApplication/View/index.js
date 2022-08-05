// @mui material components

// Soft UI Dashboard React components
// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";

// import MDBox from "components/MDBox";
import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import withReactContent from "sweetalert2-react-content";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import "react-datepicker/dist/react-datepicker.css";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
import Swal from "sweetalert2";
import PHeaders from "postHeader";
import CircularProgress from "@mui/material/CircularProgress";

function ViewJobPost() {
  //   const MySwal = withReactContent(Swal);
  const [jobPost, setJobPost] = useState([]);
  const MySwal = withReactContent(Swal);
  const [opened, setOpened] = useState(false);
  // const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { allGHeaders: miHeaders } = GHeaders();
  const { allPHeaders: myHeaders } = PHeaders();

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  const handleApply = (value) => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    console.log(data11);
    const personalIDs = data11.id;
    const raw = JSON.stringify({
      empID: personalIDs,
      jobPostID: value,
      type: 0,
      status: "Applied",
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplication/add`, requestOptions)
    console.log("doski");
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
                    <Card sx={{ maxWidth: 800 }}>
                      <CardContent>
                        <MDTypography
                          variant="h4"
                          color="text"
                          fontSize="120%"
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
                          fontSize="120%"
                          textAlign="left"
                          mt={0}
                        >
                          Job Status: {jobPost[0].jobStatus}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="120%"
                          textAlign="left"
                          mt={0}
                        >
                          Company Name: {jobPost[0].orgName}
                        </MDTypography>
                        <MDTypography
                          variant="h4"
                          color="text"
                          fontSize="120%"
                          textAlign="left"
                          mt={0}
                        >
                          Job Status: {jobPost[0].jobStatus}
                        </MDTypography>
                        <MDTypography
                          variant="h4"
                          color="text"
                          fontSize="120%"
                          textAlign="left"
                          mt={0}
                        >
                          Industry: {jobPost[0].industry}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="120%"
                          textAlign="left"
                          mt={0}
                        >
                          Location: {jobPost[0].location}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="120%"
                          textAlign="left"
                          mt={0}
                        >
                          Salary Expectation: {jobPost[0].salaryExpectation}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="120%"
                          textAlign="left"
                          mt={0}
                        >
                          Created Time: {changeDate(jobPost[0].createdTime)}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="120%"
                          textAlign="left"
                          mt={0}
                        >
                          Closing Time: {changeDate(jobPost[0].closingTime)}
                        </MDTypography>
                        <MDButton
                          variant="gradient"
                          onClick={() => handleApply(jobPost[0].id)}
                          color="info"
                          width="50%"
                          align="left"
                        >
                          Apply
                        </MDButton>
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
