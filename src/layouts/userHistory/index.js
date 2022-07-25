/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function UserAudit() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);
  const [services, setServices] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [auditServ, setAuditServ] = useState("");
  const [auditPerm, setAuditPerm] = useState("");
  const [auditSDate, setAuditSDate] = useState("");
  const [auditEDate, setAuditEDate] = useState("");

  const [user, setUser] = useState([]);
  const [userIDx, setUserIDx] = useState("");

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const orgIDs = data11.orgID;

    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
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
          setUser(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/services/gets`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultapi) => {
        setOpened(false);
        if (resultapi.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultapi.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultapi.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          setServices(resultapi);
        }
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnChange = (e) => {
    setOpened(true);
    const headers = miHeaders;
    const apiValue = e.target.value;
    setAuditServ(e.target.value);
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/permissions/getForService/${apiValue}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resulta) => {
        setOpened(false);
        if (resulta.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resulta.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resulta.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        setPermissions(resulta);
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

  const handleOnPermChange = (e) => {
    setAuditPerm(e.target.value);
  };

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));

    const orgIDs = data11.orgID;
    const auditConSDate = new Date(auditSDate).getTime();
    const auditConEDate = new Date(auditEDate).getTime();
    const raw = JSON.stringify({
      userID: userIDx,
      orgID: orgIDs,
      service: auditServ,
      actionCall: auditPerm,
      startTime: auditConSDate,
      endTime: auditConEDate,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/audit/getFilter`, requestOptions)
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
        setItems(result);
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

  const pColumns = [
    { Header: "User", accessor: "userName", align: "left" },
    { Header: "Service", accessor: "service", align: "left" },
    { Header: "Action Call", accessor: "actionCallDisplayName", align: "left" },
    { Header: "Action Call URL", accessor: "actionCall", align: "left" },
    { Header: "Cost (NGN)", accessor: "price", align: "left" },
    {
      Header: "Date Executed",
      accessor: "executionTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
  ];

  // Return table
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={30}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={1}
            mt={2}
            p={2}
            mb={1}
            textAlign="left"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" textAlign="center" mt={1}>
              User History
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
                <div align="center">
                  {" "}
                  <div className="row">
                    <div className="col-sm-6">
                      <MDBox mt={2}>
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          fontSize="80%"
                          align="left"
                          color="text"
                        >
                          Start Date *
                        </MDTypography>
                        <DatePicker
                          placeholderText="MM/DD/YY"
                          style={{ marginRight: "10px" }}
                          selected={auditSDate}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          onChange={(time) => setAuditSDate(time)}
                        />{" "}
                      </MDBox>{" "}
                    </div>
                    <div className="col-sm-6">
                      <MDBox mt={2}>
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          fontSize="80%"
                          align="left"
                          color="text"
                        >
                          End Date *
                        </MDTypography>
                        <DatePicker
                          placeholderText="MM/DD/YY"
                          style={{ marginRight: "10px" }}
                          selected={auditEDate}
                          onChange={(time) => setAuditEDate(time)}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />{" "}
                      </MDBox>
                    </div>
                  </div>
                  <MDBox mt={2}>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                    >
                      User
                    </MDTypography>
                    <Form.Select
                      value={userIDx}
                      onChange={(e) => setUserIDx(e.target.value)}
                      aria-label="Default select example"
                    >
                      <option value="">--Select User--</option>
                      {user.map((api) => (
                        <option key={api.personal.id} value={api.personal.id}>
                          {api.personal.fname} {api.personal.lname}
                        </option>
                      ))}
                    </Form.Select>
                    <br />
                  </MDBox>
                  <MDBox mt={-1}>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                    >
                      Services
                    </MDTypography>
                    <Form.Select aria-label="Default select example" onChange={handleOnChange}>
                      <option>--Select Service--</option>
                      {services.map((api) => (
                        <option key={api.id} value={api.name}>
                          {api.name}
                        </option>
                      ))}
                    </Form.Select>
                  </MDBox>
                  <MDBox mt={2}>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                    >
                      Permissions
                    </MDTypography>
                    <Form.Select aria-label="Default select example" onChange={handleOnPermChange}>
                      <option>--Select Permissions--</option>
                      {permissions.map((api) => (
                        <option key={api.id} value={api.actionCall}>
                          {api.displayName}
                        </option>
                      ))}
                    </Form.Select>
                  </MDBox>{" "}
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={handleClick}
                      color="info"
                      width="50%"
                      align="center"
                    >
                      Add Filters
                    </MDButton>
                  </MDBox>
                </div>
              </Container>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox>
        <DataTable
          table={{ columns: pColumns, rows: items }}
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

export default UserAudit;
