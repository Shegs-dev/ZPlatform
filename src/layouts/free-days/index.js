import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { Container } from "react-bootstrap";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DataTable from "examples/Tables/DataTable";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

import FreeDaysData from "./free-days-list/freeDaysList";

const locales = {
  // eslint-disable-next-line global-require
  "en-US": require("date-fns/locale/en-US"),
};
const localizers = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function FreeDay() {
  const [checkedName, setCheckedName] = useState("");
  const [enabled, setEnabled] = useState("");
  const { columns: pColumns, rows: pRows } = FreeDaysData();

  const MySwal = withReactContent(Swal);

  const [newEvent, setNewEvent] = useState({ title: "", time: "" });
  const [allEvents, setAllEvents] = useState([]);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    const eventList = [];
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/freedays/getAll/${orgIDs}`, { headers })
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
          // eslint-disable-next-line array-callback-return
          result.map((item) => {
            const fdy = {
              title: item.name,
              time: new Date(item.freeDate),
            };
            eventList.push(fdy);
          });
          setAllEvents(eventList);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnTitleKeys = () => {
    const letters = /^[a-zA-Z0-9 -']+$/;
    if (!newEvent.title.match(letters)) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML =
        "Title - input only capital, small letters and numbers<br>";
    }
    if (newEvent.title.match(letters)) {
      setCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML = "";
    }
    if (newEvent.title.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML = "Title is required<br>";
    }
    setEnabled(checkedName === true);
  };

  const handleAddEvent = (e) => {
    handleOnTitleKeys();
    if (enabled) {
      setOpened(true);
      const end = new Date(newEvent.time);
      end.setHours(23, 59, 59, 999);
      const eventTime = end.getTime();
      const eventName = newEvent.title;
      const CurTime = new Date().getTime();
      setAllEvents([...allEvents, newEvent]);

      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
      const orgIDs = data11.orgID;

      const raw = JSON.stringify([
        {
          orgID: orgIDs,
          name: eventName,
          freeDate: eventTime,
        },
      ]);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      if (eventTime < CurTime) {
        MySwal.fire({
          title: "Invalid Date",
          type: "error",
          text: "Please Enter A Date From The Future",
        });
      } else {
        fetch(`${process.env.REACT_APP_NSUTANA_URL}/freedays/add`, requestOptions)
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
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox component="form" role="form">
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={0}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Add Free Day
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
            <MDTypography variant="gradient" fontSize="60%" color="white" id="title">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="date">
              {" "}
            </MDTypography>
          </MDBox>
          <div align="center">
            <MDBox mt={2} mb={2}>
              <MDInput
                type="text"
                value={newEvent.title}
                onKeyUp={handleOnTitleKeys}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                label="Title"
                variant="standard"
                style={{ width: "30%" }}
              />
            </MDBox>
            <Container>
              <div className="row">
                <div className="col-sm-12">
                  <div align="center">
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                      mt={2}
                    >
                      Date
                    </MDTypography>
                    <DatePicker
                      placeholderText="MM/DD/YY"
                      style={{ marginRight: "10px" }}
                      selected={newEvent.time}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      onChange={(time) => setNewEvent({ ...newEvent, time })}
                    />
                  </div>
                </div>
              </div>
            </Container>
            <MDBox mt={2} mb={2}>
              <MDButton
                variant="gradient"
                onClick={handleAddEvent}
                color="info"
                width="50%"
                align="left"
              >
                Add Event
              </MDButton>
            </MDBox>
          </div>
        </MDBox>
      </Card>
      &nbsp;
      <Card>
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
            Calendar
          </MDTypography>
        </MDBox>
        <Calendar
          localizer={localizers}
          events={allEvents}
          startAccessor="time"
          endAccessor="time"
          style={{ height: 700, margin: "50px" }}
        />
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

export default FreeDay;
