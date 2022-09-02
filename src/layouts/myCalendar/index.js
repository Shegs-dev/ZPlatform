import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";

import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Checkbox from "@mui/material/Checkbox";
// import AccordionDetails from "@mui/material/AccordionDetails";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

// aimport CalendarData from "./data";

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

function MyCalendar() {
  // eslint-disable-next-line prefer-const
  // const { columns: pColumns, rows: pRows } = CalendarData();
  const [allEvents, setAllEvents] = useState([]);

  const [opened, setOpened] = useState(false);
  const d = new Date(new Date().getFullYear(), 0, 1);
  const s = new Date(new Date().getFullYear(), 12, 1);
  console.log(d);
  console.log(s);
  const strt = d.getTime();
  const end = s.getTime();
  console.log(strt);
  console.log(end);
  const navigate = useNavigate();
  const { allGHeaders: miHeaders } = GHeaders();
  useEffect(() => {
    const eventList = [];
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const myID = data11.id;
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_RAGA_URL}/appointment/getMonoCalendar/${myID}?startTime=${strt}&endTime=${end}`,
      { headers }
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
        if (isMounted) {
          // const data = result;
          // const dara = [];
          // data.forEach((r) => {
          //   if (r.purpose === "APPOINTMENT") {
          //     dara.push(r);
          //   }
          // });
          // eslint-disable-next-line array-callback-return
          result.map((item) => {
            const fdy = {
              title: item.title,
              time: new Date(item.startTime),
              end: new Date(item.endTime),
            };
            eventList.push(fdy);
          });
          setAllEvents(eventList);
          // const resultx = result;
          // const apu = resultx.map((item) => ({
          //   title: item.name,
          //   time: new Date(item.freeDate),
          // }));
          // console.log(apu);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
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
            My Calendar
          </MDTypography>
        </MDBox>
        <Calendar
          localizer={localizers}
          events={allEvents}
          startAccessor="time"
          endAccessor="end"
          style={{ height: 700, margin: "50px", fontSize: "20px" }}
        />
      </Card>
      <MDBox pt={3}>
        <></>
      </MDBox>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default MyCalendar;
