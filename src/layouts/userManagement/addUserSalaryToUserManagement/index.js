import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import MDButton from "components/MDButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import PHeaders from "postHeader";
import GHeaders from "getHeader";

function AddUserpayment() {
  const MySwal = withReactContent(Swal);

  const [idx, setID] = useState(0);
  const [empIDx, setEmpID] = useState(0);
  const [amountx, setAmount] = useState(0);
  const [currencyx, setCurrency] = useState("NGN");
  const [createdTimex, setCreatedTime] = useState(0);
  const [deleteFlagx, setDeleteFlag] = useState(0);

  const [user, setUser] = useState([]);
  const [userIDx, setUserIDx] = useState(0);

  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_TANTA_URL}/basicremuneration/getForEmp/${orgIDs}/${uid}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultba) => {
        setOpened(false);
        if (resultba.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultba.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultba.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          if (resultba.length !== 0) {
            setID(resultba.id);
            setEmpID(resultba.empID);
            setAmount(resultba.amount);
            setCurrency(resultba.currency);
            setDeleteFlag(resultba.deleteFlag);
            setCreatedTime(resultba.createdTime);
          } else {
            setID(0);
            setEmpID(uid);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
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

  const handleClick = () => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));
    let allRaw = null;
    const raw = JSON.stringify({
      orgID: data11.orgID,
      empID: uid,
      amount: amountx,
      currency: currencyx,
    });
    const updateRaw = JSON.stringify({
      id: idx,
      orgID: data11.orgID,
      empID: empIDx,
      amount: amountx,
      currency: currencyx,
      createdTime: createdTimex,
      deleteFlag: deleteFlagx,
    });
    if (idx !== 0) {
      allRaw = updateRaw;
    } else {
      allRaw = raw;
    }
    let endpoint = "add";
    if (idx !== 0) {
      endpoint = "update";
    }

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: allRaw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_TANTA_URL}/basicremuneration/${endpoint}`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
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

  const handleOnAmountKeys = () => {
    const numbers = /^[0-9]+$/;
    if (!amountx.match(numbers)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "Amount - input a valid Amount<br>";
    }
    if (amountx.match(numbers)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "";
      handleClick();
    }
    if (amountx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "Amount is required<br>";
    }
  };

  // Method to handle disable
  const handleSource = () => {
    const emps = `${empIDx}`;
    if (idx === 0) {
      MySwal.fire({
        title: "CANNOT_CLONE",
        type: "error",
        text: "Cannot Clone This User Salary Because The User Has Not Been Assigned A Salary",
      }).then(() => {
        window.location.reload();
      });
    } else if (userIDx === "") {
      MySwal.fire({
        title: "CANNOT_CLONE",
        type: "error",
        text: "Cannot Clone This User Salary Because You Have Not Selected A User",
      }).then(() => {
        window.location.reload();
      });
    } else if (userIDx === emps) {
      MySwal.fire({
        title: "CANNOT_CLONE",
        type: "error",
        text: "Cannot Clone This User Salary Because It Is The Same User",
      }).then(() => {
        window.location.reload();
      });
    } else {
      const headers = miHeaders;
      fetch(`${process.env.REACT_APP_TANTA_URL}/basicremuneration/clone/${idx}/${userIDx}`, {
        headers,
      })
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((resx) => {
          if (resx.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (resx.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (resx.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
          }
          MySwal.fire({
            title: resx.status,
            type: "success",
            text: resx.message,
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
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
        <MDBox pt={4} pb={3} px={3}>
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
              User Salary
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
            <MDTypography variant="gradient" fontSize="60%" color="white" id="amount">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form" name="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="number"
                      label="Amount*"
                      value={amountx}
                      onChange={(e) => setAmount(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>

                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={currencyx || ""}
                      onChange={(e) => setCurrency(e.target.value)}
                      label="Currency *"
                      disabled
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleOnAmountKeys} color="info" width="50%">
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      &nbsp;
      <Card>
        <MDBox pt={4} pb={3} px={3}>
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
              Clone User Salary
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form" name="form1">
            <MDBox mt={2}>
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
              <br />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleSource} color="info" width="50%">
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

export default AddUserpayment;
