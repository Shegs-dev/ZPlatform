import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
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

function UpdateBonusOrDeduction() {
  const MySwal = withReactContent(Swal);

  const [namex, setName] = useState("");
  const [amountx, setAmount] = useState("");
  const [typex, setTypex] = useState("");
  const [currencyx, setCurrency] = useState("");
  const [setupTypex, setSetupTypex] = useState("");
  const [frequencyx, setFrequencyx] = useState("");
  // const [setup, setSetup] = useState({});

  const [enabled, setEnabled] = useState("");
  const [checkedName, setCheckedName] = useState("");

  const [user, setUser] = useState([]);
  const [userIDx, setUserIDx] = useState("");

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const orgIDs = data11.orgID;

    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
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
          setUser(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    let isMounted = true;
    fetch(`${process.env.REACT_APP_TANTA_URL}/remunerationpackagesetup/getByIds/${ids}`, {
      headers,
    })
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
          // setSetup(result[0]);
          setName(result[0].name);
          setAmount(result[0].amount);
          setTypex(result[0].type);
          setUserIDx(result[0].empID);
          setCurrency(result[0].currency);
          setSetupTypex(result[0].setupType);
          setFrequencyx(result[0].frequency);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

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
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const orgIDs = data11.orgID;

    const raw = JSON.stringify({
      orgID: orgIDs,
      name: namex,
      empID: userIDx,
      setupType: setupTypex,
      amount: amountx,
      currency: currencyx,
      type: typex,
      frequency: frequencyx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_TANTA_URL}/remunerationpackagesetup/add`, requestOptions)
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

  const handleOnChangeSymbol = (e) => {
    setTypex(e.target.value);
    const symValue = e.target.value;
    if (symValue === "FLAT") {
      setCurrency("NGN");
    } else if (symValue === "PERCENTAGE") {
      setCurrency("%");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={5} pb={9} px={29}>
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
              Add Bonus Or Deduction
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
              <div className="row">
                <div className="col-sm-12">
                  <MDInput
                    type="text"
                    label="Name *"
                    value={namex || ""}
                    onKeyUp={handleOnNameKeys}
                    // className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    variant="standard"
                    fullWidth
                  />
                </div>
              </div>
            </MDBox>

            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-3">
                    <MDInput
                      type="text"
                      value={currencyx || ""}
                      onChange={(e) => setCurrency(e.target.value)}
                      disabled
                      label="Variation"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-9">
                    <MDInput
                      type="number"
                      value={amountx || ""}
                      onChange={(e) => setAmount(e.target.value)}
                      label="Amount"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                    >
                      User
                    </MDTypography>
                    <Form.Select
                      value={userIDx}
                      onChange={(e) => setUserIDx(e.target.value)}
                      aria-label="Default select example"
                    >
                      <option value="">--Select User--</option>
                      {user.map((api) => (
                        <option key={api.personal.id} value={api.personal.id}>
                          {api.personal.fname} {api.personal.lname}
                        </option>
                      ))}
                    </Form.Select>
                  </div>

                  <div className="col-sm-6">
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                    >
                      Variation
                    </MDTypography>
                    <Form.Select
                      onChange={handleOnChangeSymbol}
                      value={typex || ""}
                      aria-label="Default select example"
                    >
                      <option>---Select Variation---</option>
                      <option value="FLAT">FLAT</option>
                      <option value="PERCENTAGE">PERCENTAGE</option>
                    </Form.Select>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                    >
                      Type
                    </MDTypography>
                    <Form.Select
                      onChange={(e) => setSetupTypex(e.target.value)}
                      value={setupTypex || ""}
                      aria-label="Default select example"
                    >
                      <option>---Select Type---</option>
                      <option value="1">Bonus</option>
                      <option value="2">Deduction</option>
                    </Form.Select>
                  </div>

                  <div className="col-sm-6">
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                    >
                      Frequency
                    </MDTypography>
                    <Form.Select
                      onChange={(e) => setFrequencyx(e.target.value)}
                      value={frequencyx || ""}
                      aria-label="Default select example"
                    >
                      <option>---Select Frequency---</option>
                      <option value="1">One-Time</option>
                      <option value="2">Always</option>
                    </Form.Select>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleClick}
                disabled={!enabled}
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
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default UpdateBonusOrDeduction;
