import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

function ViewProfile() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  const idVal = JSON.parse([id]);

  const [namex, setName] = useState("");
  const [emailx, setEmail] = useState("");
  const [streetx, setStreet] = useState("");
  const [cityx, setCity] = useState("");
  const [statex, setState] = useState("");
  const [countryx, setCountry] = useState("");
  const [pnox, setPno] = useState("");
  const [descripx, setescrip] = useState("");
  const [createdDate, setCreatedDate] = useState(new Date());
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const data11 = JSON.parse(localStorage.getItem("user1"));
  console.log(data11);
  const orgIDs = data11.orgID;
  console.log(orgIDs);

  useEffect(() => {
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/company/get/${idVal}`)
      .then((res) => res.json())
      .then((resultp) => {
        if (isMounted) {
          setName(resultp[0].name);
          setEmail(resultp[0].email);
          setStreet(resultp[0].street);
          setCity(resultp[0].city);
          setState(resultp[0].state);
          setCountry(resultp[0].country);
          setPno(resultp[0].pno);
          setDescrip(resultp[0].descrip);


          setStartDate(
            new Date(
              `${resultp[0].monthOfBirth}/${resultp[0].dayOfBirth}/${resultp[0].yearOfBirth}`
            )
          );
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Name"
                          disabled
                          value={namex || ""}
                          onChange={(e) => setName(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-8">
                        <MDInput
                          type="email"
                          label="Company Email"
                          disabled
                          value={emailx || ""}
                          onChange={(e) => setEmail(e.target.value)}
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
                          label="Street"
                          disabled
                          value={streetx || ""}
                          onChange={(e) => setStreet(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                      <div className="col-sm-4">
                        <MDInput
                          type="text"
                          label="City"
                          disabled
                          value={cityx || ""}
                          onChange={(e) => setCity(e.target.value)}
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
                          label="State"
                          disabled
                          value={statex || ""}
                          onChange={(e) => setState(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Country"
                          disabled
                          value={countryx || ""}
                          onChange={(e) => setCountry(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <MDBox mb={2} mx={0}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-8">
                        <MDInput
                          type="number"
                          label="Phone Number"
                          disabled
                          value={phonex || ""}
                          onChange={(e) => setPhone(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                      <div className="col-sm-4">
                        <MDInput
                          type="text"
                          label="Drscription"
                          disabled
                          value={descripx || ""}
                          onChange={(e) => setDescrip(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
              </MDBox>
          </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default Viewprofile;
