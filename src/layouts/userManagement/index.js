import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Select } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import UserData from "./data/userTableData";

function UserManagement() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = UserData();

  const [fnamex, setName] = useState("");
  const [emailx, setEmail] = useState("");
  const [lNamex, setLastName] = useState("");
  const [roleIDs, setRoleID] = useState("");

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [items, setItems] = useState([]);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const orgIDz = data11.orgID;
    // const idVal = JSON.parse([orgIDz]);
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/company/get/${orgIDz}`, { headers })
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
          setCompany(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnFirstKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!fnamex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML =
        "First Name - input only capital and small letters<br>";
    }
    if (fnamex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML = "";
    }
    if (fnamex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML = "First Name is required<br>";
    }
  };

  const handleOnLastKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!lNamex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML =
        "Last Name - input only capital and small letters<br>";
    }
    if (lNamex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML = "";
    }
    if (lNamex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML = "Last Name is required<br>";
    }
  };

  const handleOnPEmailKeys = () => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    if (!emailx.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
    }
    if (emailx.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (emailx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email is required<br>";
    }
  };

  // eslint-disable-next-line consistent-return
  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();

    const letterNumber = /^[0-9a-zA-Z]+$/;
    if (fnamex.length > 0 && !fnamex.match(letterNumber)) {
      MySwal.fire({
        title: "NAME_ERROR",
        type: "error",
        text: "Input First Name Invalid",
      });
      return false;
    }
    if (lNamex.length > 0 && !lNamex.match(letterNumber)) {
      MySwal.fire({
        title: "NAME_ERROR",
        type: "error",
        text: "Input Last Name Invalid",
      });
      return false;
    }
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const orgIDz = data11.orgID;
    const raw = JSON.stringify({
      roleID: roleIDs,
      fname: fnamex,
      email: emailx,
      lname: lNamex,
      companyName: company[0].name,
      orgID: orgIDz,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_ZAVE_URL}/login/invite`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
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
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };
  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/roles/getForOrganization/${orgIDs}`, { headers })
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
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

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
              Invite Other Users
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
            <MDTypography variant="gradient" fontSize="60%" color="white" id="first">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="last">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="email">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="First Name *"
                      value={fnamex || ""}
                      onKeyUp={handleOnFirstKeys}
                      onChange={(e) => setName(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={lNamex || ""}
                      onKeyUp={handleOnLastKeys}
                      onChange={(e) => setLastName(e.target.value)}
                      label="Last Name *"
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
                      type="text"
                      value={emailx || ""}
                      onKeyUp={handleOnPEmailKeys}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email *"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <Form.Select
                      aria-label="Default select example"
                      width="50%"
                      mx={34}
                      onChange={(e) => setRoleID(e.target.value)}
                    >
                      <option>Select Roles *</option>
                      <option value="0">Admin</option>
                      {items.map((api) => (
                        <option key={api.id} value={api.id}>
                          {api.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleClick} color="info" width="50%">
                Invite User
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
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

export default UserManagement;
