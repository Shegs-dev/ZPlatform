import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import AppraisalGradeData from "layouts/appraisal/appraisalGrading/data/appraisalGradingData";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";

function AppraisalGrade() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = AppraisalGradeData();

  const navigate = useNavigate();

  const [valuex, setValue] = useState("");
  const [gradex, setGrade] = useState("");
  const [minScorex, setMinScore] = useState(0);
  const [maxScorex, setMaxScore] = useState(0);
  const [colorCodex, setColorCode] = useState("#000000");

  const [checkedEmail, setCheckedEmail] = useState("");
  const [checkedName, setCheckedName] = useState("");
  const [enabled, setEnabled] = useState("");
  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      value: valuex,
      grade: gradex,
      colorCode: colorCodex,
      minScore: minScorex,
      maxScore: maxScorex,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalGrading/add`, requestOptions)
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
        setOpened(false);
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

  const handleOnNameKeys = () => {
    const letters = /^[A-Z ]+$/;
    if (!valuex.match(letters)) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Score Value - input only capital letters<br>";
    }
    if (valuex.match(letters)) {
      setCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (valuex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Score Value is required<br>";
    }
    setEnabled(checkedEmail === true && checkedName === true);
  };

  const handleOnEmailKeys = () => {
    const letters = /^[A-Z0-9]+$/;
    if (!gradex.match(letters)) {
      setCheckedEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML =
        "Grade - input only capital letters and numbers<br>";
    }
    if (gradex.match(letters)) {
      setCheckedEmail(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (gradex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Grade is required<br>";
    }
    setEnabled(checkedEmail === true && checkedName === true);
  };

  const handleOnStreetKeys = () => {
    // eslint-disable-next-line no-invalid-regexp
    const letters = /^[0-9]+$/;
    if (!minScorex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Minimum Score - input only numbers<br>";
    }
    if (minScorex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "";
    }
    if (minScorex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Minimum Score is required<br>";
    }
    setEnabled(checkedEmail === true && checkedName === true);
  };

  const handleOnCityKeys = () => {
    const letters = /^[0-9]+$/;
    if (!maxScorex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "Maximum Score - input only numbers<br>";
    }
    if (maxScorex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "";
    }
    if (maxScorex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "Maximum Score is required<br>";
    }
    setEnabled(checkedEmail === true && checkedName === true);
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
              Add Appraisal Grade
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
            <MDTypography variant="gradient" fontSize="60%" color="white" id="email">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="phone">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="street">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="city">
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
                      label="Score Value"
                      value={valuex || ""}
                      placeholder="e.g PASS, FAIL"
                      onKeyUp={handleOnNameKeys}
                      onChange={(e) => setValue(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      placeholder="e.g A, B, C, D"
                      value={gradex || ""}
                      onKeyUp={handleOnEmailKeys}
                      onChange={(e) => setGrade(e.target.value)}
                      label="Grade"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={minScorex || ""}
                      onKeyUp={handleOnStreetKeys}
                      onChange={(e) => setMinScore(e.target.value)}
                      label="Minimum Score"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={maxScorex || ""}
                      onKeyUp={handleOnCityKeys}
                      onChange={(e) => setMaxScore(e.target.value)}
                      label="Maximum Score"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Color:
                    </MDTypography>
                    <input
                      type="color"
                      className="form-control"
                      style={{ width: "70%" }}
                      onChange={(e) => setColorCode(e.target.value)}
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
      <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: pRows }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default AppraisalGrade;
