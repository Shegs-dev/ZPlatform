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

function Skills() {
  const MySwal = withReactContent(Swal);

  const [namex, setName] = useState("");
  const [descripx, setDescrip] = useState("");

  const [uidx, setUID] = useState("");
  const [unamex, setUName] = useState("");
  const [udescripx, setUDescrip] = useState("");
  const [uempID, setUEmpID] = useState("");

  const [enabled, setEnabled] = useState("");
  const [checkedName, setCheckedName] = useState("");

  const [allApp, setAllApp] = useState([]);
  const [showLists, setShowLists] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const [opened, setOpened] = useState(false);
  const [uopened, setUOpened] = useState(false);

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
    height: "100%",
    display: "block",
  };

  const handleGets = () => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIDs = data11.id;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/skills/getForEmployee/${personalIDs}`, {
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
        console.log(result);
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

    fetch(`${process.env.REACT_APP_ZAVE_URL}/skills/delete/${val}`, requestOptions)
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
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));
      console.log(data11);
      const personalIDs = data11.id;
      const raw = JSON.stringify({ empID: personalIDs, name: namex, descrip: descripx });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      console.log(raw);

      fetch(`${process.env.REACT_APP_ZAVE_URL}/skills/add`, requestOptions)
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
    const raw = JSON.stringify({
      id: uidx,
      name: unamex,
      descrip: udescripx,
      empID: uempID,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/skills/update`, requestOptions)
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
    const filteredItems = filteredData.filter((item) => item.id === value);
    setUID(value);
    setUName(filteredItems[0].name);
    setUDescrip(filteredItems[0].descrip);
    setUEmpID(filteredItems[0].empID);

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
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Add Skill
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
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="Name *"
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
                      value={descripx || ""}
                      onChange={(e) => setDescrip(e.target.value)}
                      label="Description"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleClick}
                color="info"
                width="50%"
                align="left"
              >
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox pt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            {showLists ? (
              <Card style={{ backgroundColor: "white" }}>
                &nbsp;
                {/* <div
                  className="scrollbar scrollbar-primary mt-2 mx-auto"
                  style={scrollContainerStyle}
                > */}
                <Container>
                  <div className="row">
                    {allApp.map((item) => (
                      <Grid item xs={3} md={3} lg={3} key={item.id}>
                        <Card>
                          <CardContent>
                            <MDTypography
                              variant="h5"
                              fontWeight="medium"
                              fontSize="120%"
                              color="info"
                              textAlign="left"
                              mt={1}
                              mb={-3.5}
                            >
                              {item.name}
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
                </Container>
                {/* </div> */}
                &nbsp;
                <br />
              </Card>
            ) : (
              <Card>
                {" "}
                <MDTypography variant="h3" fontWeight="bold" color="text" textAlign="center" mt={1}>
                  No Skill
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
          <Card style={style}>
            <MDBox pt={4} pb={3} px={15}>
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Update Skill
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
                    <div className="row">
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Name *"
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
                          value={udescripx || ""}
                          onChange={(e) => setUDescrip(e.target.value)}
                          label="Description"
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    onClick={handleUpdate}
                    color="info"
                    width="50%"
                    align="left"
                  >
                    Save
                  </MDButton>
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

export default Skills;
