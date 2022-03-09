import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function CompanyProfile() {
  const MySwal = withReactContent(Swal);

  const [idx, setId] = useState("");
  const [namex, setName] = useState("");
  const [emailx, setEmail] = useState("");
  const [streetx, setStreet] = useState("");
  const [cityx, setCity] = useState("");
  const [statex, setState] = useState("");
  const [countryx, setCountry] = useState("");
  const [pnox, setPno] = useState("");
  const [descripx, setDescrip] = useState("");
  const [downloadURIx, setDownloadURI] = useState("");
  const [displayURIx, setDisplayURI] = useState("");
  const [planStatusx, setPlanStatus] = useState("");
  const [sysStatusx, setSysStatus] = useState("");
  const [createdDatex, setCreatedDate] = useState("");
  const [createdByx, setCreatedBy] = useState("");
  const [deletedflagx, setDeletedflag] = useState("");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const data11 = JSON.parse(localStorage.getItem("user1"));
  console.log(data11);
  const orgIDs = data11.orgID;
  console.log(orgIDs);

  useEffect(() => {
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/company/get/${orgIDs}`)
      .then((res) => res.json())
      .then((resultp) => {
        if (isMounted) {
          setId(resultp[0].id);
          setName(resultp[0].name);
          setEmail(resultp[0].email);
          setStreet(resultp[0].street);
          setCity(resultp[0].city);
          setState(resultp[0].state);
          setCountry(resultp[0].country);
          setPno(resultp[0].pno);
          setDescrip(resultp[0].descrip);
          setDownloadURI(resultp[0].downloadURI);
          setDisplayURI(resultp[0].displayURI);
          setPlanStatus(resultp[0].planStatus);
          setSysStatus(resultp[0].sysStatus);
          setCreatedDate(resultp[0].createdDate);
          setCreatedBy(resultp[0].createdBy);
          setDeletedflag(resultp[0].deletedflag);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({
      id: idx,
      name: namex,
      email: emailx,
      street: streetx,
      city: cityx,
      state: statex,
      country: countryx,
      pno: pnox,
      descrip: descripx,
      downloadURI: downloadURIx,
      displayURI: displayURIx,
      planStatus: planStatusx,
      sysStatus: sysStatusx,
      createdDate: createdDatex,
      createdBy: createdByx,
      deletedflag: deletedflagx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_KUBU_URL}/company/update`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
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
              CompanyProfile
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
                      onChange={(e) => setName(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={emailx || ""}
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
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={statex || ""}
                      onChange={(e) => setState(e.target.value)}
                      label="State"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={countryx || ""}
                      onChange={(e) => setCountry(e.target.value)}
                      label="Country"
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
                      value={pnox || ""}
                      onChange={(e) => setPno(e.target.value)}
                      label="Phone Number"
                      variant="standard"
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={descripx || ""}
                      onChange={(e) => setDescrip(e.target.value)}
                      label="Description"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleClick} color="info" width="50%">
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default CompanyProfile;
