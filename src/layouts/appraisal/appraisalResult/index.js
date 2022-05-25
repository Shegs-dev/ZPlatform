/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
// import Icon from "@mui/material/Icon";
import "bootstrap/dist/css/bootstrap.min.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import TextWrapper from "react-text-wrapper";

function AppraisalResult() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const [appraiserIDx, setAppraiserIDx] = useState("");
  const [appraiserAnswers, setAppraiserAnswers] = useState([]);
  const [appraisers, setAppraisers] = useState([]);
  const [scorex, setScorex] = useState(0);

  const [enabled, setEnabled] = useState(false);
  const [opened, setOpened] = useState(false);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/appraisers/gets/${orgIDs}/${id}`, {
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
          setAppraisers(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // eslint-disable-next-line consistent-return
  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    if (appraiserIDx.length === 0) {
      setOpened(false);
      MySwal.fire({
        title: "APPRAISER_ERROR",
        type: "error",
        text: "Please Select Appraiser",
      }).then(() => {
        setEnabled(false);
      });
    } else {
      const headers = miHeaders;
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get("id");
      fetch(
        `${process.env.REACT_APP_SHASHA_URL}/appraiserAnswer/getByEmpId/${orgIDs}/${appraiserIDx}/${id}`,
        {
          headers,
        }
      )
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
          setAppraiserAnswers(result);
          setEnabled(true);
        });
    }
  };

  const handleGrade = (e) => {
    setOpened(true);
    e.preventDefault();
    const letters = /^[0-9]+$/;
    if (scorex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Score Value is required<br>";
    } else if (!scorex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Score Value - Only Numbers Allowed<br>";
    } else if (scorex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";

      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get("id");
      const raw = JSON.stringify({
        orgID: orgIDs,
        appraiserID: appraiserIDx,
        appraisalID: id,
        score: scorex,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalGrading/result/add`, requestOptions)
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
    }
  };

  const pColumns = [
    {
      Header: "Question",
      accessor: "question",
      Cell: ({ cell: { value } }) => <TextWrapper width={250} content={value} />,
      align: "left",
    },
    {
      Header: "Answer",
      accessor: "answer",
      Cell: ({ cell: { value } }) => <TextWrapper width={350} content={value} />,
      align: "left",
    },
    // {
    //   Header: "actions",
    //   accessor: "id",
    //   Cell: ({ cell: { value } }) => (
    //     <div
    //       style={{
    //         width: "100%",
    //         backgroundColor: "#dadada",
    //         borderRadius: "2px",
    //       }}
    //     >
    //       <Dropdown>
    //         <Dropdown.Toggle variant="secondary" id="dropdown-basic">
    //           <Icon sx={{ fontWeight: "light" }}>settings</Icon>
    //         </Dropdown.Toggle>

    //         <Dropdown.Menu>
    //           <Dropdown.Item onClick={() => handleDisable(value)}>Remove</Dropdown.Item>
    //         </Dropdown.Menu>
    //       </Dropdown>
    //     </div>
    //   ),
    //   align: "left",
    // },
  ];

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
              Grade Appraisal
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <Form.Select
                      value={appraiserIDx}
                      onChange={(e) => setAppraiserIDx(e.target.value)}
                      aria-label="Default select example"
                    >
                      <option value="">Select The Appraiser</option>
                      {appraisers.map((api) => (
                        <option key={api.empID} value={api.empID}>
                          {api.empName}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleClick} color="info" width="50%">
                View Answers
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: appraiserAnswers }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>
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
              Grade These Answers
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
                  <div className="col-sm-12">
                    <MDInput
                      type="number"
                      value={scorex}
                      onChange={(e) => setScorex(e.target.value)}
                      label="Maximum Score"
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
                onClick={handleGrade}
                disabled={!enabled}
                color="info"
                width="50%"
              >
                Grade
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

export default AppraisalResult;
