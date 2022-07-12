import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
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
import AllDegrees from "./degree";
import AllCourses from "./courses";

function Education() {
  const MySwal = withReactContent(Swal);
  const { allCourses: AlCourses } = AllCourses();
  const { allDegrees: AlDegrees } = AllDegrees();

  const [namex, setName] = useState("");
  const [specializationx, setSpecialization] = useState("");
  const [gradex, setGrades] = useState("");

  const [uidx, setUID] = useState("");
  const [unamex, setUName] = useState("");
  const [udegreex, setUDegreex] = useState("");
  const [uspecializationx, setUSpecialization] = useState("");
  const [ugradex, setUGrades] = useState("");
  const [uempID, setUEmpID] = useState("");
  const [ustartDate, setUStartDate] = useState("");
  const [uendDate, setUEndDate] = useState("");
  const [udeleteFlag, setUDeleteFlag] = useState("");
  const [ucreatedTime, setUCreatedTime] = useState("");

  const [showUpdate, setShowUpdate] = useState(false);
  const [uopened, setUOpened] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [degreex, setDegreex] = useState("");

  const [enabled, setEnabled] = useState("");
  const [checkedName, setCheckedName] = useState("");

  const [allApp, setAllApp] = useState([]);
  const [showLists, setShowLists] = useState(false);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const changeDateandTime = (timestamp) => {
    const date = new Date(timestamp);
    let dayx = "";
    let monthx = "";
    let yearx = "";
    if (startDate !== null) {
      dayx = date.getDate();
      monthx = date.getMonth() + 1;
      yearx = date.getFullYear();
    }
    return `${yearx}/${monthx}/${dayx}`;
  };

  const handleGets = () => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIDs = data11.id;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/education/getForEmployee/${personalIDs}`, {
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
          setShowLists(true);
        }
        setAllApp(result);
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      //   fetches the table data
      handleGets();
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

    fetch(`${process.env.REACT_APP_ZAVE_URL}/education/delete/${val}`, requestOptions)
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
        }
        // } else {
        //   navigate("/authentication/sign-in");
        // }
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
    const startCDate = new Date(startDate).getTime();
    const endCDate = new Date(endDate).getTime();
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
        startTime: startCDate,
        endTime: endCDate,
        degree: degreex,
        specialization: specializationx,
        grade: gradex,
      });
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_ZAVE_URL}/education/add`, requestOptions)
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
            setSpecialization("");
            setGrades("");
            setStartDate("");
            setEndDate("");
            setDegreex("");
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

  const handleUpdate = () => {
    setOpened(true);
    const startCDate = new Date(ustartDate).getTime();
    const endCDate = new Date(uendDate).getTime();
    const raw = JSON.stringify({
      id: uidx,
      name: unamex,
      empID: uempID,
      startTime: startCDate,
      endTime: endCDate,
      degree: udegreex,
      specialization: uspecializationx,
      grade: ugradex,
      deleteFlag: udeleteFlag,
      createdTime: ucreatedTime,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/education/update`, requestOptions)
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
        setUOpened(false);
        setShowUpdate(false);
        handleGets();
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          setUOpened(false);
          setShowUpdate(false);
          handleGets();
        });
      })
      .catch((error) => {
        setOpened(true);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  // Method to filter departments
  const handleShow = (filteredData, value) => {
    // "endTime":"2003-07-10T23:00:00.000Z"
    // const changeDateandTime = (timestamp) => {
    //   const date = new Date(timestamp);
    //   let dayx = "";
    //   let monthx = "";
    //   let yearx = "";
    //   if (startDate !== null) {
    //     dayx = date.getDate();
    //     monthx = date.getMonth() + 1;
    //     yearx = date.getFullYear();
    //   }
    //   return `${yearx}-${monthx}-${dayx}T23:00:00.000Z`;
    // };

    const filteredItems = filteredData.filter((item) => item.id === value);
    setUID(value);
    setUName(filteredItems[0].name);
    setUEmpID(filteredItems[0].empID);
    setUDegreex(filteredItems[0].degree);
    setUSpecialization(filteredItems[0].specialization);
    setUGrades(filteredItems[0].grade);
    setUStartDate(filteredItems[0].startTime);
    setUEndDate(filteredItems[0].endTime);
    setUCreatedTime(filteredItems[0].createdTime);
    setUDeleteFlag(filteredItems[0].deleteFlag);

    setUOpened(true);
    setShowUpdate(true);
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
              Add Education
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
                        <div className="col-sm-12">
                          <MDInput
                            type="text"
                            label=" School's Name *"
                            value={namex || ""}
                            onKeyUp={handleOnNameKeys}
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
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
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                    >
                      Degree
                    </MDTypography>
                    <Form.Select
                      value={degreex}
                      onChange={(e) => setDegreex(e.target.value)}
                      aria-label="Default select example"
                    >
                      <option value="">--Select Degree--</option>
                      {AlDegrees.map((api) => (
                        <option key={api.id} value={api.value}>
                          {api.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br />
                  </MDBox>
                  <MDBox mt={-1}>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                    >
                      Specialization
                    </MDTypography>
                    <Form.Select
                      aria-label="Default select example"
                      value={specializationx}
                      onChange={(e) => setSpecialization(e.target.value)}
                    >
                      <option>--Select Specialization--</option>
                      {AlCourses.map((api) => (
                        <option key={api.name} value={api.name}>
                          {api.name}
                        </option>
                      ))}
                    </Form.Select>
                  </MDBox>
                  <MDBox mt={2}>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                    >
                      Grade
                    </MDTypography>
                    <Form.Select
                      aria-label="Default select example"
                      value={gradex}
                      onChange={(e) => setGrades(e.target.value)}
                    >
                      <option>--Select Grade--</option>
                      <option value="First class">First class</option>
                      <option value="Second class upper">Second class upper</option>
                      <option value="Second class lower">Second class lower</option>
                      <option value="Third class">Third class</option>
                    </Form.Select>
                  </MDBox>{" "}
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
            {showLists ? (
              <Container>
                <div className="row">
                  {allApp.map((item) => (
                    <Grid item xs={6} md={6} lg={6} key={item.id}>
                      <Card>
                        <CardContent>
                          <MDTypography
                            variant="h5"
                            fontWeight="medium"
                            fontSize="120%"
                            color="info"
                            textAlign="left"
                            mt={1}
                            mb={0}
                          >
                            {item.name}
                          </MDTypography>
                          <MDTypography
                            variant="h5"
                            fontWeight="medium"
                            fontSize="70%"
                            color="text"
                            textAlign="left"
                            mt={1}
                            mb={0}
                          >
                            {item.specialization}
                          </MDTypography>
                          <MDTypography
                            variant="h5"
                            fontWeight="medium"
                            fontSize="70%"
                            color="text"
                            textAlign="left"
                            mt={1}
                            mb={0}
                          >
                            Degree: {item.degree}
                          </MDTypography>
                          <MDTypography
                            variant="h5"
                            fontWeight="medium"
                            fontSize="70%"
                            color="text"
                            textAlign="left"
                            mt={1}
                            mb={0}
                          >
                            Grade: {item.grade}
                          </MDTypography>
                          <MDTypography
                            variant="h5"
                            fontWeight="medium"
                            fontSize="70%"
                            color="text"
                            textAlign="left"
                            mt={1}
                            mb={0}
                          >
                            From {changeDateandTime(item.startTime)} to{" "}
                            {changeDateandTime(item.endTime)}
                          </MDTypography>
                        </CardContent>
                        <CardActions>
                          <div align="right">
                            <MDButton
                              variant="gradient"
                              color="white"
                              onClick={() => handleDeleteSK(item.id)}
                              width="50%"
                              mt={-1}
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
                          <div align="right">
                            <MDButton
                              variant="gradient"
                              color="white"
                              onClick={() => handleShow(allApp, item.id)}
                              width="50%"
                              mt={-1}
                            >
                              <Icon
                                fontSize="medium"
                                sx={{ fontSize: 100, alignSelf: "center" }}
                                color="error"
                              >
                                edit
                              </Icon>
                            </MDButton>
                          </div>
                        </CardActions>
                      </Card>
                      &nbsp;
                    </Grid>
                  ))}
                </div>
                <br />
              </Container>
            ) : (
              <Card>
                {" "}
                <MDTypography variant="h3" fontWeight="bold" color="text" textAlign="center" mt={1}>
                  No Education
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
      {showUpdate ? (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={uopened}>
          <Card>
            <MDBox pt={4} pb={3} px={15}>
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
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  color="white"
                  textAlign="center"
                  mt={1}
                >
                  Add Education
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
                            <div className="col-sm-12">
                              <MDInput
                                type="text"
                                label=" School's Name *"
                                value={unamex || ""}
                                onKeyUp={handleOnNameKeys}
                                className="form-control"
                                onChange={(e) => setUName(e.target.value)}
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
                              selected={ustartDate}
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              onChange={(time) => setUStartDate(time)}
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
                              selected={uendDate}
                              onChange={(time) => setUEndDate(time)}
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                            />{" "}
                          </MDBox>
                        </div>
                      </div>
                      <MDBox mt={2}>
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          fontSize="80%"
                          align="left"
                          color="text"
                        >
                          Degree
                        </MDTypography>
                        <Form.Select
                          value={udegreex}
                          onChange={(e) => setUDegreex(e.target.value)}
                          aria-label="Default select example"
                        >
                          <option value="">--Select Degree--</option>
                          {AlDegrees.map((api) => (
                            <option key={api.id} value={api.value}>
                              {api.name}
                            </option>
                          ))}
                        </Form.Select>
                        <br />
                      </MDBox>
                      <MDBox mt={-1}>
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          fontSize="80%"
                          align="left"
                          color="text"
                        >
                          Specialization
                        </MDTypography>
                        <Form.Select
                          aria-label="Default select example"
                          value={uspecializationx}
                          onChange={(e) => setUSpecialization(e.target.value)}
                        >
                          <option>--Select Specialization--</option>
                          {AlCourses.map((api) => (
                            <option key={api.name} value={api.name}>
                              {api.name}
                            </option>
                          ))}
                        </Form.Select>
                      </MDBox>
                      <MDBox mt={2}>
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          fontSize="80%"
                          align="left"
                          color="text"
                        >
                          Grade
                        </MDTypography>
                        <Form.Select
                          aria-label="Default select example"
                          value={ugradex}
                          onChange={(e) => setUGrades(e.target.value)}
                        >
                          <option>--Select Grade--</option>
                          <option value="First class">First class</option>
                          <option value="Second class upper">Second class upper</option>
                          <option value="Second class lower">Second class lower</option>
                          <option value="Third class">Third class</option>
                        </Form.Select>
                      </MDBox>{" "}
                      <MDBox mt={4} mb={1}>
                        <MDButton
                          variant="gradient"
                          onClick={handleUpdate}
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
        </Backdrop>
      ) : (
        <MDBox />
      )}
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default Education;
