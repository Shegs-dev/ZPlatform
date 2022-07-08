import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
// // import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import Paper from "@mui/material/Paper";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Divider } from "@mui/material";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";

function UserProfile() {
  const [fnamex, setFname] = useState("");
  const [lnamex, setLname] = useState("");
  const [onamex, setOname] = useState("");
  const [emailx, setEmail] = useState("");
  const [phonex, setPhone] = useState("");
  // const [nationalityx, setNationality] = useState("");
  // const [residentialStreetx, setResidentialStreet] = useState("");
  const [residentialCityx, setResidentialCity] = useState("");
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  // const [deleteFlagx, setDeleteFlag] = useState("");
  // const [sysStatusx, setSysStatus] = useState("");
  // const [createdTimex, setCreatedTime] = useState("");
  // const [startDate, setStartDate] = useState();

  const [skillsx, setSkills] = useState([]);
  const [educationx, setEducation] = useState([]);
  const [workHistoryx, setWorkHistory] = useState([]);
  const [positionHeldx, setPositionHeld] = useState([]);

  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();

  const { allGHeaders: miHeaders } = GHeaders();

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
    return `${syearx}/${smonthx}/${sdayx} - ${eyearx}/${emonthx}/${edayx}`;
  };

  useEffect(() => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIDs = data11.id;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/get/${personalIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
      })
      .then((resultp) => {
        setOpened(false);
        if (resultp.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultp.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultp.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          console.log(resultp);
          setFname(resultp[0].fname);
          setLname(resultp[0].lname);
          setOname(resultp[0].oname);
          setEmail(resultp[0].email);
          setPhone(resultp[0].pno);
          //   setDayOfBirth(resultp[0].dayOfBirth);
          //   setMonthOfBirth(resultp[0].monthOfBirth);
          //   setYearOfBirth(resultp[0].yearOfBirth);
          // setNationality(resultp[0].nationality);
          // setResidentialStreet(resultp[0].residentialStreet);
          setResidentialCity(resultp[0].residentialCity);
          setResidentialState(resultp[0].residentialState);
          setResidentialCountry(resultp[0].residentialCountry);
          // setDeleteFlag(resultp[0].deleteFlag);
          // setSysStatus(resultp[0].sysStatus);
          // setCreatedTime(resultp[0].createdTime);

          // setStartDate(
          //   `${resultp[0].monthOfBirth}/${resultp[0].dayOfBirth}/${resultp[0].yearOfBirth}`
          // );
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const headers = miHeaders;
    let isMounted = true;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIDs = data11.id;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/resume/getForEmployee/${personalIDs}`, { headers })
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
        if (isMounted) {
          console.log(result);
          if (result === null) {
            setSkills([]);
            setWorkHistory([]);
            setEducation([]);
            setPositionHeld([]);
          } else {
            setSkills(result.skills);
            setWorkHistory(result.workHistories);
            setEducation(result.educations);
            setPositionHeld(result.positionHelds);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("CV.pdf");
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton
            variant="gradient"
            onClick={printDocument}
            color="info"
            width="50%"
            align="left"
          >
            Download
          </MDButton>
        </MDBox>
        <Paper
          id="divToPrint"
          sx={{
            display: "flex",
            "& > :not(style)": {
              width: 2480,
              height: 3508,
              maxWidth: 2480,
              maxHeight: 3508,
            },
          }}
          variant="outlined"
          square
        >
          <Paper
            style={{
              backgroundColor: "info",
              width: 720,
              height: 3508,
              maxWidth: 720,
              maxHeight: 3508,
            }}
            variant="outlined"
            square
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <MDTypography variant="h3" fontWeight="medium" color="text" ml={2} mt={3} mb={-3}>
                  {`${fnamex} ${lnamex} ${onamex}`}
                  <Divider />
                </MDTypography>
              </Grid>
            </Grid>
            <br />
            <MDBox id="personalInfo">
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <Stack direction="row" spacing={1} ml={2} mb={-4}>
                    <Avatar sx={{ bgcolor: "primary", width: 32, height: 32 }}>
                      <Icon fontSize="medium">person</Icon>
                    </Avatar>
                    <MDTypography variant="h4" fontWeight="medium" color="text">
                      Personal Information
                      <Divider />
                    </MDTypography>
                  </Stack>
                </Grid>
              </Grid>
              <br />
              <MDBox>
                <MDTypography variant="h5" fontWeight="medium" color="text" ml={2} mt={1}>
                  Email
                </MDTypography>
                <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                  {emailx}{" "}
                </MDTypography>
              </MDBox>
              <MDBox>
                <MDTypography variant="h5" fontWeight="medium" color="text" ml={2} mt={2}>
                  Phone
                </MDTypography>
                <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                  {phonex}{" "}
                </MDTypography>
              </MDBox>
              <MDBox>
                <MDTypography variant="h5" fontWeight="medium" color="text" ml={2} mt={2}>
                  Residental Area
                </MDTypography>
                <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                  {`${residentialCityx} ${residentialStatex}, ${residentialCountryx}`}{" "}
                </MDTypography>
              </MDBox>
            </MDBox>
            <br />
            <MDBox id="skills">
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <Stack direction="row" spacing={1} ml={2} mb={-2}>
                    <Avatar sx={{ bgcolor: "primary", width: 32, height: 32 }}>
                      <Icon fontSize="medium">accessibility</Icon>
                    </Avatar>
                    <MDTypography variant="h4" fontWeight="medium" color="text">
                      Skills
                      <Divider />
                    </MDTypography>
                  </Stack>
                </Grid>
              </Grid>
              <MDBox ml={2}>
                {skillsx.map((item) => (
                  <MDBox key={item.id}>
                    <MDTypography variant="h5" fontWeight="medium" color="text" ml={2} mt={2}>
                      {item.name}{" "}
                    </MDTypography>
                    <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                      {item.descrip}{" "}
                    </MDTypography>
                  </MDBox>
                ))}
              </MDBox>
            </MDBox>
            <br />
            <MDBox mb={5}> &nbsp;</MDBox>
          </Paper>
          <Paper
            style={{ color: "318CE7", width: 1760, height: 3508, maxWidth: 1760, maxHeight: 3508 }}
            variant="outlined"
            square
          >
            <MDBox id="workHistory">
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <Stack direction="row" spacing={1} ml={2} mb={-2} mt={13}>
                    <Avatar sx={{ bgcolor: "primary", width: 32, height: 32 }}>
                      <Icon fontSize="medium">work_history</Icon>
                    </Avatar>
                    <MDTypography variant="h4" fontWeight="medium" color="text">
                      Work History
                      <Divider />
                    </MDTypography>
                  </Stack>
                </Grid>
              </Grid>
              <MDBox ml={2}>
                {workHistoryx.map((item) => (
                  <MDBox key={item.id}>
                    <MDTypography variant="h5" fontWeight="medium" color="text" ml={2} mt={2}>
                      {item.name}{" "}
                    </MDTypography>
                    <MDTypography variant="h6" fontWeight="medium" color="text" ml={2}>
                      {item.position}{" "}
                    </MDTypography>
                    <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                      {item.descrip}{" "}
                    </MDTypography>
                    <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                      {changeDateandTime(item.startTime, item.endTime)}
                    </MDTypography>
                  </MDBox>
                ))}
              </MDBox>
            </MDBox>
            <MDBox id="education">
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <Stack direction="row" spacing={1} ml={2} mb={-2} mt={5}>
                    <Avatar sx={{ bgcolor: "primary", width: 32, height: 32 }}>
                      <Icon fontSize="medium">school</Icon>
                    </Avatar>
                    <MDTypography variant="h4" fontWeight="medium" color="text">
                      Education
                      <Divider />
                    </MDTypography>
                  </Stack>
                </Grid>
              </Grid>
              <MDBox ml={2}>
                {educationx.map((item) => (
                  <MDBox key={item.id}>
                    <MDTypography variant="h5" fontWeight="medium" color="text" ml={2} mt={2}>
                      {item.specialization}{" "}
                    </MDTypography>
                    <MDTypography variant="h6" fontWeight="medium" color="text" ml={2}>
                      {item.name}{" "}
                    </MDTypography>
                    <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                      {item.degree} {item.grade}{" "}
                    </MDTypography>
                    <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                      {changeDateandTime(item.startTime, item.endTime)}{" "}
                    </MDTypography>
                  </MDBox>
                ))}
              </MDBox>
            </MDBox>
            <MDBox id="positionHeld">
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <Stack direction="row" spacing={1} ml={2} mb={-2} mt={5}>
                    <Avatar sx={{ bgcolor: "primary", width: 32, height: 32 }}>
                      <Icon fontSize="medium">person_outline</Icon>
                    </Avatar>
                    <MDTypography variant="h4" fontWeight="medium" color="text">
                      Position Held
                      <Divider />
                    </MDTypography>
                  </Stack>
                </Grid>
              </Grid>
              <br />
              <MDBox ml={2}>
                {positionHeldx.map((item) => (
                  <MDBox key={item.id}>
                    <MDTypography variant="h5" fontWeight="medium" color="text" ml={2} mt={2}>
                      {item.name}{" "}
                    </MDTypography>
                    <MDTypography variant="h6" fontWeight="medium" color="text" ml={2}>
                      {item.place}{" "}
                    </MDTypography>
                    <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                      {item.descrip}{" "}
                    </MDTypography>
                    <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                      {changeDateandTime(item.startTime, item.endTime)}{" "}
                    </MDTypography>
                  </MDBox>
                ))}
              </MDBox>
            </MDBox>
            <MDBox mb={5} />
          </Paper>
        </Paper>
      </MDBox>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default UserProfile;
