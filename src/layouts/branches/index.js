import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import BranchData from "layouts/branches/data/BranchTableData";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AllCountriesAndStates from "countries-states-master/countries";
// import AllCountryCode from "countries-states-master/country-code";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";

function Branches() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = BranchData();

  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const navigate = useNavigate();

  const [namex, setName] = useState("");
  const [emailx, setEmail] = useState("");
  const [streetx, setStreet] = useState("");
  const [cityx, setCity] = useState("");
  const [statex, setState] = useState("");
  const [countryx, setCountry] = useState("");
  const [pnox, setPno] = useState("");
  const [allStates, setAllStates] = useState([]);

  const [checkedEmail, setCheckedEmail] = useState("");
  const [checkedStreet, setCheckedStreet] = useState("");
  const [checkedName, setCheckedName] = useState("");
  const [checkedCity, setCheckedCity] = useState("");
  const [enabled, setEnabled] = useState("");
  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      name: namex,
      email: emailx,
      street: streetx,
      city: cityx,
      state: statex,
      country: countryx,
      pno: pnox,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_KUBU_URL}/branch/add`, requestOptions)
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
  };

  const handleOnChangeRCCountry = (e) => {
    const filteredItems = AlCountry.filter((item) => item.name === e.target.value);
    setAllStates(filteredItems[0].states);
    setCountry(e.target.value);
  };

  const handleOnChangeRCState = (e) => {
    setState(e.target.value);
  };

  const handleOnNameKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!namex.match(letters)) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
    }
    if (namex.match(letters)) {
      setCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (namex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name is required<br>";
    }
    setEnabled(
      checkedEmail === true &&
        checkedName === true &&
        checkedCity === true &&
        checkedStreet === true
    );
  };

  const handleOnEmailKeys = () => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    if (!emailx.match(letters)) {
      setCheckedEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
    }
    if (emailx.match(letters)) {
      setCheckedEmail(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (emailx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email is required<br>";
    }
    setEnabled(
      checkedEmail === true &&
        checkedName === true &&
        checkedCity === true &&
        checkedStreet === true
    );
  };

  const handleOnStreetKeys = () => {
    // eslint-disable-next-line no-invalid-regexp
    const letters = /^[a-zA-Z0-9 .,-]+$/;
    if (!streetx.match(letters)) {
      setCheckedStreet(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Street - use only [ - . , ] as symbols<br>";
    }
    if (streetx.match(letters)) {
      setCheckedStreet(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "";
    }
    if (streetx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Street is required<br>";
    }
    setEnabled(
      checkedEmail === true &&
        checkedName === true &&
        checkedCity === true &&
        checkedStreet === true
    );
  };

  const handleOnCityKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!cityx.match(letters)) {
      setCheckedCity(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "City - input only capital and small letters<br>";
    }
    if (cityx.match(letters)) {
      setCheckedCity(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "";
    }
    if (cityx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "City is required<br>";
    }
    setEnabled(
      checkedEmail === true &&
        checkedName === true &&
        checkedCity === true &&
        checkedStreet === true
    );
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
              Add New Branch
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
            <MDTypography variant="gradient" fontSize="60%" color="white" id="email">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="phone">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="street">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="city">
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
                      label="Name"
                      value={namex || ""}
                      onKeyUp={handleOnNameKeys}
                      onChange={(e) => setName(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={emailx || ""}
                      onKeyUp={handleOnEmailKeys}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
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
                  <div className="col-sm-8">
                    <MDInput
                      type="text"
                      value={streetx || ""}
                      onKeyUp={handleOnStreetKeys}
                      onChange={(e) => setStreet(e.target.value)}
                      label="Street"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-4">
                    <MDInput
                      type="text"
                      value={cityx || ""}
                      onKeyUp={handleOnCityKeys}
                      onChange={(e) => setCity(e.target.value)}
                      label="City"
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
                  <div className="col-sm-8">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      Country
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={countryx || ""}
                        aria-label="Default select example"
                        onChange={handleOnChangeRCCountry}
                      >
                        <option>--Select Country--</option>
                        {AlCountry.map((apic) => (
                          <option key={apic.code3} value={apic.name}>
                            {apic.name}
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
                      State
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={statex || ""}
                        aria-label="Default select example"
                        onChange={handleOnChangeRCState}
                      >
                        <option>--Select State--</option>
                        {allStates.map((apis) => (
                          <option key={apis.code} value={apis.name}>
                            {apis.name}
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
                  <div className="col-sm-8">
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Phone Number
                    </MDTypography>
                    <PhoneInput
                      value={pnox}
                      inputStyle={{ width: "100%" }}
                      buttonStyle={{}}
                      onChange={setPno}
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleClick}
                disabled={!enabled}
                color="info"
                width="50%"
              >
                Save
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

export default Branches;
