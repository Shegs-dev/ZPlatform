import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
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

  // const [employeeIDx, setEmployeeID] = useState(0);
  const [idx, setID] = useState(500);
  const [orgIDx, setOrgID] = useState("");
  const [empIDx, setEmpID] = useState(0);
  const [amountx, setAmount] = useState(0);
  const [currencyx, setCurrency] = useState("NGN");
  const [createdTimex, setCreatedTime] = useState(0);
  const [deleteFlagx, setDeleteFlag] = useState(0);

  const [checkedAmount, setCheckedAmount] = useState("");
  const [enabled, setEnabled] = useState("");

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
          // eslint-disable-next-line eqeqeq
          if (resultba.length !== 0) {
            setID(resultba.id);
            setOrgID(resultba.orgID);
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

  //   useEffect(() => {
  //     const queryString = window.location.search;
  //     const urlParams = new URLSearchParams(queryString);
  //     const uid = urlParams.get("id");
  //     // const idVal = JSON.parse([id]);

  //     const data11 = JSON.parse(localStorage.getItem("user1"));
  //     const orgIDs = data11.orgID;
  //     const headers = miHeaders;
  //     let isMounted = true;
  //     fetch(`${process.env.REACT_APP_TANTA_URL}/basicremuneration/getForEmp/${orgIDs}/${uid}`, {
  //       headers,
  //     })
  //       .then(async (res) => {
  //         console.log(res);
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res;
  //       })
  //       .then((result) => {
  //         console.log(result);
  //         if (result.message === "Expired Access") {
  //           navigate("/authentication/sign-in");
  //         }
  //         if (result.message === "Token Does Not Exist") {
  //           navigate("/authentication/sign-in");
  //         }
  //         if (result.message === "Unauthorized Access") {
  //           navigate("/authentication/forbiddenPage");
  //         }
  //         if (isMounted) {
  //           // eslint-disable-next-line eqeqeq
  //           if (result.data === "") {
  //             setID(result.id);
  //             setOrgID(result.orgID);
  //             setEmpID(result.empID);
  //             setAmount(result.amount);
  //             setCurrency(result.currency);
  //             setDeleteFlag(result.deleteFlag);
  //             setCreatedTime(result.createdTime);
  //           } else {
  //             setID(null);
  //             setEmpID(uid);
  //           }
  //         }
  //       });
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get("id");
    // const idVal = JSON.parse([id]);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    let allRaw = null;
    const raw = JSON.stringify({
      orgID: data11.orgID,
      empID: uid,
      amount: amountx,
      currency: currencyx,
    });
    console.log(raw);
    const updateRaw = JSON.stringify({
      id: idx,
      orgID: orgIDx,
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
    const numbers = /^[-+]?[0-9]+.[0-9]+$/;
    if (!amountx.match(numbers)) {
      setCheckedAmount(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "Amount - input a valid Amount<br>";
    }
    if (amountx.match(numbers)) {
      setCheckedAmount(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "";
    }
    if (amountx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "Amount is required<br>";
    }
    setEnabled(checkedAmount === true);
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
              Add User Salary
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
          <MDBox component="form" role="form" name="form1">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="Amount*"
                      value={amountx || ""}
                      onKeyUp={handleOnAmountKeys}
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
              <MDButton
                variant="gradient"
                onClick={handleClick}
                disabled={!enabled}
                color="info"
                width="50%"
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

export default AddUserpayment;
