import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PositionHeld() {
  const MySwal = withReactContent(Swal);

  const [namex, setName] = useState("");
  const [descripx, setDescrip] = useState("");
  const [placex, setPlace] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [enabled, setEnabled] = useState("");
  const [checkedName, setCheckedName] = useState("");

  const [allApp, setAllApp] = useState([]);
  const [showSkills, setShowSkills] = useState(false);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handleGets = () => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIDs = data11.id;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/positionHeld/getForEmployee/${personalIDs}`, {
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
        if (result.length > 0) {
          setShowSkills(true);
        }
        setAllApp(result);
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      // fetches the table data
      //   handleGets();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDeleteSK = (val) => {
    const requestOptions = {
      method: "DELETE",
      headers: miHeaders,
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/positionHeld/delete/${val}`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resx) => {
        // if (resx.message === "Expired Access") {
        //   navigate("/authentication/sign-in");
        // }
        // if (resx.message === "Token Does Not Exist") {
        //   navigate("/authentication/sign-in");
        // }
        if (resx.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        } else {
          navigate("/authentication/sign-in");
        }
        MySwal.fire({
          title: resx.status,
          type: "success",
          text: resx.message,
        }).then(() => {
          handleGets();
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

  // eslint-disable-next-line consistent-return
  const handleOnNameKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!namex.match(letters)) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
    }
    if (namex.match(letters)) {
      setCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (namex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name is required<br>";
    }
    setEnabled(checkedName === true);
  };

  // eslint-disable-next-line consistent-return
  const handleClick = (e) => {
    handleOnNameKeys();
    if (enabled) {
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));
      console.log(data11);
      const personalIDs = data11.id;
      const raw = JSON.stringify({
        empID: personalIDs,
        name: namex,
        descrip: descripx,
        startTime: startDate,
        endTime: startDate,
        place: placex,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_ZAVE_URL}/positionHeld/add`, requestOptions)
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
            handleGets();
            setName("");
            setDescrip("");
            setPlace("");
            setStartDate("");
            setEndDate("");
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
              Add Position Held
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
                <div align="center">
                  {" "}
                  <MDBox mb={2}>
                    <Container>
                      <div className="row">
                        <div className="col-sm-6">
                          <MDInput
                            type="text"
                            label=" Position Name *"
                            value={namex || ""}
                            onKeyUp={handleOnNameKeys}
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            variant="standard"
                            fullWidth
                          />
                        </div>
                        <div className="col-sm-6">
                          <MDInput
                            type="text"
                            label="Description *"
                            value={descripx || ""}
                            className="form-control"
                            onChange={(e) => setDescrip(e.target.value)}
                            variant="standard"
                            fullWidth
                          />
                        </div>
                      </div>
                    </Container>
                  </MDBox>
                  <div className="row">
                    <div className="col-sm-6">
                      <MDBox mt={2}>
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          fontSize="80%"
                          align="left"
                          color="text"
                        >
                          Start Date *
                        </MDTypography>
                        <DatePicker
                          placeholderText="MM/DD/YY"
                          style={{ marginRight: "10px" }}
                          selected={startDate}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          onChange={(time) => setStartDate(time)}
                        />{" "}
                      </MDBox>{" "}
                    </div>
                    <div className="col-sm-6">
                      <MDBox mt={2}>
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          fontSize="80%"
                          align="left"
                          color="text"
                        >
                          End Date *
                        </MDTypography>
                        <DatePicker
                          placeholderText="MM/DD/YY"
                          style={{ marginRight: "10px" }}
                          selected={endDate}
                          onChange={(time) => setEndDate(time)}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />{" "}
                      </MDBox>
                    </div>
                  </div>
                  <MDBox mt={2}>
                    <div className="col-sm-12">
                      <MDInput
                        type="text"
                        label="Place *"
                        value={placex || ""}
                        className="form-control"
                        onChange={(e) => setPlace(e.target.value)}
                        variant="standard"
                        fullWidth
                      />
                    </div>
                  </MDBox>
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
              </Container>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox pt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            {showSkills ? (
              <Card style={{ backgroundColor: "#318CE7", maxHeight: 350 }}>
                <MDBox
                  variant="gradient"
                  bgColor="white"
                  borderRadius="lg"
                  coloredShadow="success"
                  mt={2}
                  mx={0}
                  p={1}
                  textAlign="left"
                >
                  <MDTypography
                    variant="h4"
                    fontWeight="medium"
                    color="info"
                    textAlign="center"
                    mt={1}
                  >
                    Skills
                  </MDTypography>
                </MDBox>
                &nbsp;
                {/* <div
                  className="scrollbar scrollbar-primary mt-2 mx-auto"
                  style={scrollContainerStyle}
                > */}
                <Container>
                  <div className="row">
                    {allApp.map((item) => (
                      <Grid item xs={3} md={3} lg={3} key={item.id}>
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
                              {item.descrip}
                            </MDTypography>
                          </CardContent>
                          <CardActions>
                            <div align="right">
                              <MDButton
                                variant="gradient"
                                color="white"
                                onClick={() => handleDeleteSK(item.id)}
                                width="50%"
                              >
                                <Icon
                                  fontSize="medium"
                                  sx={{ fontSize: 100, alignSelf: "center" }}
                                  color="error"
                                >
                                  delete
                                </Icon>
                              </MDButton>
                            </div>
                          </CardActions>
                        </Card>
                        &nbsp;
                      </Grid>
                    ))}
                  </div>
                </Container>
                {/* </div> */}
                &nbsp;
              </Card>
            ) : (
              <Card>
                {" "}
                <MDTypography variant="h3" fontWeight="bold" color="text" textAlign="center" mt={1}>
                  No Added Position Held
                </MDTypography>
                <Icon
                  fontSize="medium"
                  sx={{ fontSize: 100, alignSelf: "center" }}
                  color="disabled"
                >
                  sentiment_dissatisfied
                </Icon>
              </Card>
            )}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default PositionHeld;
