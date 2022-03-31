import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import MDButton from "components/MDButton";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import AddDetailsData from "layouts/timeofftype/addDetailsToTimeOffType/adddetailstable";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";

function AddTimeOffType() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = AddDetailsData();

  // const [malex, setMalex] = useState("");
  // const [femalex, setFemalex] = useState("");

  const [position, setPosition] = useState([]);
  const [branch, setBranch] = useState([]);

  const [positx, setPositx] = useState("");
  const [branx, setBranx] = useState("");
  const [enabled, setEnabled] = useState("");
  console.log(setEnabled);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const data11 = JSON.parse(localStorage.getItem("user1"));
  const orgIDs = data11.orgID;

  useEffect(() => {
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/position/gets/${orgIDs}`)
      .then((res) => res.json())
      .then((resultp) => {
        if (isMounted) {
          setPosition(resultp);

          fetch(`${process.env.REACT_APP_KUBU_URL}/branch/gets/${orgIDs}`)
            .then((res) => res.json())
            .then((resultx) => {
              if (isMounted) {
                setBranch(resultx);
                console.log(resultx);
              }
            });
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    const raw = JSON.stringify({
      orgID: "string",
      timeOffTypeID: 0,
      type: 0,
      name: "string",
      value: "string",
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeofftype/add$`, requestOptions)
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
        <MDBox pt={4} pb={3} px={3}>
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
            <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
              Add Detail
            </MDTypography>
          </MDBox>
          <MDBox mx={4} textAlign="left">
            <Form.Select
              value={positx || ""}
              onChange={(e) => setPositx(e.target.value)}
              aria-label="Default select example"
            >
              <option value="">Add Details To Company Position</option>
              {position.map((api) => (
                <option key={api.id} value={api.id}>
                  {api.name}
                </option>
              ))}
            </Form.Select>
            <br />
          </MDBox>
          <MDBox mx={4} textAlign="left">
            <Form.Select
              value={branx || ""}
              onChange={(e) => setBranx(e.target.value)}
              aria-label="Default select example"
            >
              <option value="">Add Details To Company Branch</option>
              {branch.map((api) => (
                <option key={api.id} value={api.id}>
                  {api.name}
                </option>
              ))}
            </Form.Select>
            <br />
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

export default AddTimeOffType;
