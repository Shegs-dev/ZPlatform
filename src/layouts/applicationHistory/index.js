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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function JobApplications() {
  const MySwal = withReactContent(Swal);
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

  // Method to change type
  const changeIsRescinded = (value) => {
    if (value === true) {
      return "True";
    }

    return "False";
  };

  // Method to handle view
  const handleView = (value) => {
    navigate(`/Application-History/view?id=${value}`);
  };

  const handleGets = () => {
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const personalID = data11.id;

    fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplication/getUserHistory/${personalID}`, {
      headers,
    })
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
        setApplications(result);
      });
  };

  const handleDisable = (val) => {
    const requestOptions = {
      method: "DELETE",
      headers: miHeaders,
    };

    fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplication/rescind/${val}`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
      })
      .then((resx) => {
        // if (resx.message === "Expired Access") {
        //   navigate("/authentication/sign-in");
        // }
        // if (resx.message === "Token Does Not Exist") {
        //   navigate("/authentication/sign-in");
        // }
        if (resx.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        // } else {
        //   navigate("/authentication/sign-in");
        // }
        MySwal.fire({
          title: resx.status,
          type: "success",
          text: resx.message,
        }).then(() => {
          handleGets();
        });
      })
      .catch((error) => {
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      //   fetches the table data
      handleGets();
    }
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
      Header: "Is Rescinded?",
      accessor: "rescinded",
      Cell: ({ cell: { value } }) => changeIsRescinded(value),
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
      accessor: "id",
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
              <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
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
