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
  const eventList = [];
  const [titleNames, setTitleName] = useState("");
  const [checkedName, setCheckedName] = useState("");
  const [enabled, setEnabled] = useState("");
  const { columns: pColumns, rows: pRows } = FreeDaysData();

  const MySwal = withReactContent(Swal);

  const [newEvent, setNewEvent] = useState({ title: "", time: "" });
  const [allEvents, setAllEvents] = useState(eventList);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  console.log(titleNames);

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/freedays/getAll/${orgIDs}`, { headers })
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
        if (isMounted) {
          console.log(result);
          // eslint-disable-next-line array-callback-return
          result.map((item) => {
            setTitleName(item.name);
            const fdy = {
              title: item.name,
              time: new Date(item.freeDate),
            };
            eventList.push(fdy);
          });
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddEvent = (e) => {
    const end = new Date(newEvent.time);
    end.setHours(23, 59, 59, 999);
    const eventTime = end.getTime();
    const eventName = newEvent.title;
    const CurTime = new Date().getTime();
    setAllEvents([...allEvents, newEvent]);

    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
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
          MySwal.fire({
            title: error.status,
            type: "error",
            text: error.message,
          });
        });
    }
  };

  const handleOnTitleKeys = () => {
    const letters = /^[a-zA-Z0-9 -]+$/;
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

  //   const handleOnDateKeys = () => {
  //     const letters = /^[0-9 ]+$/;
  //     if (!newEvent.time.match(letters)) {
  //       setCheckedDate(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("date").innerHTML =
  //         "Date - Click on the Date Dropdown to set a valid date<br>";
  //     }
  //     if (newEvent.time.match(letters)) {
  //       setCheckedDate(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("date").innerHTML = "";
  //     }
  //     if (newEvent.time.length === 0) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("date").innerHTML = "Date is required<br>";
  //     }
  //     setEnabled(checkedDate === true && checkedName === true);
  //   };

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
                disabled={!enabled}
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
    </DashboardLayout>
  );
}

export default FreeDay;
