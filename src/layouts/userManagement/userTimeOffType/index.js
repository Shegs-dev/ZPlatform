import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
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
import UserTOTdata from "./data/userTOTTableData";

function UserTOT() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = UserTOTdata();

  const navigate = useNavigate();

  const [noOfDaysTOT, setNoOfDaysTOT] = useState("");
  const [prevNODs, setPrevNODs] = useState("");
  const [tOTConID, setTOTConID] = useState("");
  const [allTOT, setallTOT] = useState([]);
  const [allTOTDet, setallTOTDet] = useState([]);

  const [opened, setOpened] = useState(false);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // Method to fetch all timeofftype
  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeofftype/getAll/${orgIDs}`, { headers })
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
        if (isMounted) {
          setallTOT(result);
          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const raw = JSON.stringify({
      orgID: orgIDs,
      empID: id,
      timeOffDays: [
        {
          timeOffID: tOTConID,
          noOfDays: noOfDaysTOT,
        },
      ],
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    // eslint-disable-next-line radix
    const conPrevNODs = parseInt(prevNODs);
    if (noOfDaysTOT <= conPrevNODs) {
      fetch(`${process.env.REACT_APP_NSUTANA_URL}/employeetimeoffsetup/add`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          if (result.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (result.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (result.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
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
    } else {
      setOpened(false);
      MySwal.fire({
        title: "INVALID NO OF DAYS",
        type: "error",
        text: "input days lesser than the Authorized days",
      });
    }
  };

  const handleOnChangeTimeOffType = (e) => {
    setOpened(true);
    const headers = miHeaders;
    const timeOffTimeID = e.target.value;

    fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeofftype/getByIds/${timeOffTimeID}`, { headers })
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
        // eslint-disable-next-line array-callback-return
        result.map((item) => {
          setallTOTDet(item.conditions);
        });
      });
  };

  const handleOnChangeTOTCon = (e) => {
    setOpened(true);
    const headers = miHeaders;
    setTOTConID(e.target.value);
    const totConID = e.target.value;

    fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeofftype/details/getByIds/${totConID}`, {
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
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        setPrevNODs(result[0].value);
        console.log(result[0].value);
      });
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
              Add Time-Off Type To User
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
                  <div className="col-sm-8">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      Time-Off Type
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        aria-label="Default select example"
                        onChange={handleOnChangeTimeOffType}
                      >
                        <option>--Select Time-Off Type--</option>
                        {allTOT.map((apitot) => (
                          <option key={apitot.id} value={apitot.id}>
                            {apitot.name}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </div>
                </div>
              </Container>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      Conditions
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        aria-label="Default select example"
                        onChange={handleOnChangeTOTCon}
                      >
                        <option>--Select Conditions--</option>
                        {allTOTDet.map((apico) => (
                          <option key={apico.id} value={apico.id}>
                            {apico.name}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="number"
                      label="Authorized No Of Days"
                      value={prevNODs || ""}
                      onChange={(e) => setPrevNODs(e.target.value)}
                      disabled
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
                      type="number"
                      label="No Of Days"
                      value={noOfDaysTOT || ""}
                      onChange={(e) => setNoOfDaysTOT(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleClick} color="info" width="50%">
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox pt={3}>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
          <CircularProgress color="info" />
        </Backdrop>
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

export default UserTOT;
