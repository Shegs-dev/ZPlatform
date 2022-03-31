/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Form, Container } from "react-bootstrap";
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

function UserAudit() {
  const MySwal = withReactContent(Swal);
  // const axios = require("axios");
  const [items, setItems] = useState([]);
  const [services, setServices] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [auditServ, setAuditServ] = useState("");
  const [auditPerm, setAuditPerm] = useState("");
  const [auditSDate, setAuditSDate] = useState("");
  const [auditEDate, setAuditEDate] = useState("");

  const [user, setUser] = useState([]);
  const [userIDx, setUserIDx] = useState("");

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  console.log(myHeaders);

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  const pRows = items;

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);

    const orgIDs = data11.orgID;
    console.log(orgIDs);
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (isMounted) {
          setUser(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/services/gets`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultapi) => {
        if (isMounted) {
          const jApi = JSON.stringify(resultapi);
          const apppi = JSON.parse(jApi);
          let apiList = [];
          apiList = apppi;
          console.log(apiList);
          setServices(resultapi);
          // apiList = resultapi;
          console.log(apppi);
        }
      })
      .catch((error) => {
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
        setPermissions(resulta);
        console.log(resulta);
      })
      .catch((error) => {
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
    e.preventDefault();
    console.log(auditServ);
    console.log(auditPerm);
    console.log(auditSDate);
    console.log(auditEDate);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);

    const personalIds = data11.id;
    console.log(personalIds);
    const orgIDs = data11.orgID;
    console.log(orgIDs);
    const auditConSDate = new Date(auditSDate).getTime();
    const auditConEDate = new Date(auditEDate).getTime();
    console.log(auditConSDate);
    console.log(auditConEDate);
    const raw = JSON.stringify({
      userID: userIDx,
      orgID: orgIDs,
      service: auditServ,
      startTime: auditConSDate,
      endTime: auditConEDate,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(myHeaders);
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/audit/getFilter`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setItems(result);
        console.log(result);
      })
      .catch((error) => {
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  const pColumns = [
    { Header: "Organization", accessor: "orgID", align: "left" },
    { Header: "Service", accessor: "service", align: "left" },
    { Header: "Action Call", accessor: "actionCall", align: "left" },
    {
      Header: "Date Created",
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
                          Start Date
                        </MDTypography>
                        <DatePicker
                          placeholderText="MM/DD/YY"
                          style={{ marginRight: "10px" }}
                          selected={auditSDate}
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
                          End Date
                        </MDTypography>
                        <DatePicker
                          placeholderText="MM/DD/YY"
                          style={{ marginRight: "10px" }}
                          selected={auditEDate}
                          onChange={(time) => setAuditEDate(time)}
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
                      <option value="">Select Duty Reliever</option>
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

export default UserAudit;
