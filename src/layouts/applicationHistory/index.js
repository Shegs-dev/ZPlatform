/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import "react-datepicker/dist/react-datepicker.css";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Icon from "@mui/material/Icon";

function JobApplications() {
  const [applications, setApplications] = useState([]);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const { allGHeaders: miHeaders } = GHeaders();

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  // Method to change type
  const changeType = (value) => {
    if (value === 0) {
      return "Manual";
    }

    return "Automatic";
  };

  // Method to handle view
  const handleView = (value) => {
    navigate(`/Application-History/view?id=${value}`);
  };

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalID = data11.id;

    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplication/getUserHistory/${personalID}`, {
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
          setApplications(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const pColumns = [
    { Header: "Job Title", accessor: "jobPost.title", align: "left" },
    { Header: "Location", accessor: "jobPost.location", align: "left" },
    { Header: "Status", accessor: "status", align: "left" },
    { Header: "Industry", accessor: "jobPost.industry", align: "left" },
    {
      Header: "Type",
      accessor: "type",
      Cell: ({ cell: { value } }) => changeType(value),
      align: "left",
    },
    {
      Header: "Date Applied",
      accessor: "applicationTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "actions",
      accessor: "jobPost.id",
      // eslint-disable-next-line react/prop-types
      Cell: ({ cell: { value } }) => (
        <div
          style={{
            width: "100%",
            backgroundColor: "#dadada",
            borderRadius: "2px",
          }}
        >
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <Icon sx={{ fontWeight: "light" }}>settings</Icon>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleView(value)}>View</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      align: "left",
    },
  ];

  // Return table
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <DataTable
          table={{ columns: pColumns, rows: applications }}
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

export default JobApplications;
