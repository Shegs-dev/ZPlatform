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

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UserData from "./data/usersTableData";

function UserManagement() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = UserData();

  const [namex, setName] = useState("");
  const [emailx, setEmail] = useState("");
  const [lastNamex, setLastName] = useState("");

  const myHeaders = new Headers();

  const [items, setItems] = useState([]);
  console.log(items);

  const handleClick = (e) => {
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);

    const orgIDs = data11.orgID;
    console.log(orgIDs);
    const raw = JSON.stringify({
      orgID: orgIDs,
      fname: namex,
      email: emailx,
      lastname: lastNamex,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const appp = [];

    useEffect(() => {
      let isMounted = true;
      fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/services/gets`)
        .then((res) => res.json())
        .then((resultapi) => {
          if (isMounted) {
            const jApi = JSON.stringify(resultapi);
            const apppi = JSON.parse(jApi);
            let apiList = [];
            apiList = apppi;
            console.log(apiList);
            setItems(resultapi);
            // apiList = resultapi;
            console.log(apppi);
            console.log(appp);
          }
        });
      return () => {
        isMounted = false;
      };
    }, []);

    fetch(`${process.env.REACT_APP_KUBU_URL}/branch/add`, requestOptions)
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

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);
    const orgIDs = data11.orgID;
    console.log(orgIDs);
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/roles/getForOrganization/${orgIDs}`)
      .then((res) => res.json())
      .then((result) => {
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
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="First Name"
                      value={namex || ""}
                      onChange={(e) => setName(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={lastNamex || ""}
                      onChange={(e) => setLastName(e.target.value)}
                      label="Last Name"
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
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <Form.Select aria-label="Default select example" width="50%" mx={34}>
                      <option>--Select Roles--</option>
                      {items.map((api) => (
                        <option key={api.id} value={api.name}>
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
    </DashboardLayout>
  );
}

export default UserManagement;
