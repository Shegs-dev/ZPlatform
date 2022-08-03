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

function WorkHistory() {
  const MySwal = withReactContent(Swal);

  const [namex, setName] = useState("");
  const [descripx, setDescrip] = useState("");
  const [positionx, setPosition] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [enabled, setEnabled] = useState("");
  const [checkedName, setCheckedName] = useState("");

  const [allApp, setAllApp] = useState([]);

  const [uidx, setUID] = useState("");
  const [unamex, setUName] = useState("");
  const [uempID, setUEmpID] = useState("");
  const [ustartDate, setUStartDate] = useState("");
  const [uendDate, setUEndDate] = useState("");
  const [udescripx, setUDescrip] = useState("");
  const [upositionx, setUPosition] = useState("");
  const [udeleteFlag, setUDeleteFlag] = useState("");
  const [ucreatedTime, setUCreatedTime] = useState("");
  const [showLists, setShowLists] = useState(false);

  const [showUpdate, setShowUpdate] = useState(false);
  const [uopened, setUOpened] = useState(false);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
    height: "80%",
    display: "block",
    "&::-webkit-scrollbar": {
      width: "6px",
      height: "2px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 1px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 1px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#4285F4",
      borderRadius: "10px",
      webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
    },
  };

  const changeDateandTime = (stimestamp, etimestamp) => {
    const sdate = new Date(stimestamp);
    let sdayx = "";
    let smonthx = "";
    let syearx = "";
    if (sdate !== null) {
      sdayx = sdate.getDate();
      smonthx = sdate.getMonth() + 1;
      syearx = sdate.getFullYear();
    }

    const edate = new Date(etimestamp);
    let edayx = "";
    let emonthx = "";
    let eyearx = "";
    if (edate !== null) {
      edayx = edate.getDate();
      emonthx = edate.getMonth() + 1;
      eyearx = edate.getFullYear();
    }
    return `From ${syearx}/${smonthx}/${sdayx} to ${eyearx}/${emonthx}/${edayx}`;
  };

  const handleGets = () => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const personalIDs = data11.id;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/workHistory/getForEmployee/${personalIDs}`, {
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
      // fetches the table data
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

    fetch(`${process.env.REACT_APP_ZAVE_URL}/workHistory/delete/${val}`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
    handleOnNameKeys();
    if (enabled) {
      const startCDate = new Date(startDate).getTime();
      const endCDate = new Date(endDate).getTime();
      const currDate = new Date().getTime();

      if (startCDate > currDate || endCDate < startCDate || startCDate === 0 || endCDate === 0) {
        MySwal.fire({
          title: "INVALID_DATE",
          type: "error",
          text: "Please put a Start Date from the Past and an End Date after the Start Date ",
        });
      } else {
        setOpened(true);
        e.preventDefault();
        const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
        console.log(data11);
        const personalIDs = data11.id;
        const raw = JSON.stringify({
          empID: personalIDs,
          name: namex,
          descrip: descripx,
          startTime: startCDate,
          endTime: endCDate,
          position: positionx,
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_ZAVE_URL}/workHistory/add`, requestOptions)
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
              if (result.status === "SUCCESS") {
                handleGets();
                setName("");
                setDescrip("");
                setPosition("");
                setStartDate("");
                setEndDate("");
              }
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
      descrip: udescripx,
      position: upositionx,
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

    fetch(`${process.env.REACT_APP_ZAVE_URL}/workHistory/update`, requestOptions)
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
    setUDescrip(filteredItems[0].descrip);
    setUPosition(filteredItems[0].position);
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
              Add Work History
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
                            label=" Company Name *"
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
                        label="Position *"
                        value={positionx || ""}
                        className="form-control"
                        onChange={(e) => setPosition(e.target.value)}
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
                            Position: {item.position}
                          </MDTypography>{" "}
                          <MDTypography
                            variant="h5"
                            fontWeight="medium"
                            fontSize="70%"
                            color="text"
                            textAlign="left"
                            mt={1}
                            mb={0}
                          >
                            {changeDateandTime(item.startTime, item.endTime)}
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
                  No Work History
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
          <Card sx={style}>
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
                  Update Work History
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
                                label=" Company Name *"
                                value={unamex || ""}
                                onKeyUp={handleOnNameKeys}
                                className="form-control"
                                onChange={(e) => setUName(e.target.value)}
                                variant="standard"
                                fullWidth
                              />
                            </div>
                            <div className="col-sm-6">
                              <MDInput
                                type="text"
                                label="Description *"
                                value={udescripx || ""}
                                className="form-control"
                                onChange={(e) => setUDescrip(e.target.value)}
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
                        <div className="col-sm-12">
                          <MDInput
                            type="text"
                            label="Position *"
                            value={upositionx || ""}
                            className="form-control"
                            onChange={(e) => setUPosition(e.target.value)}
                            variant="standard"
                            fullWidth
                          />
                        </div>
                      </MDBox>
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
                        <MDButton
                          variant="gradient"
                          onClick={() => setShowUpdate(false)}
                          color="error"
                          width="50%"
                          align="center"
                        >
                          Cancel
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

export default WorkHistory;
