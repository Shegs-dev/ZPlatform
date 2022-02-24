import { Form } from "react-bootstrap";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useState, useEffect } from "react";

function checklist() {
  const [rolName, setRolName] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const data11 = JSON.parse(localStorage.getItem("user1"));
  console.log(data11);

  const orgIDs = data11.orgID;
  console.log(orgIDs);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  // const idVal = JSON.parse([id]);

  fetch(`${process.env.REACT_APP_KUBU_URL}/role/get/${id}`)
    .then((res) => res.json())
    .then((resultg) => {
      setRolName(resultg[0].name);
      console.log(setRolName);
    });

  useEffect(() => {
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/step/gets/${orgIDs}`)
      .then((res) => res.json())
      .then((resulta) => {
        if (isMounted) {
          setPermissions(resulta);
          console.log(resulta);
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
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={30}
          mt={2}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" textAlign="center" mt={1}>
            {rolName}
          </MDTypography>
        </MDBox>
        <MDTypography
          variant="h4"
          textAlign="left"
          fontWeight="medium"
          color="secondary"
          mx={4}
          mt={2}
        >
          Permissions
        </MDTypography>
        <MDBox pt={0} px={4}>
          &nbsp;
          <Form>
            {permissions.map((api) => (
              <div key={api.id} className="mb-3">
                <Form.Check type="checkbox" id={api.id} label={api.name} />
              </div>
            ))}
          </Form>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}
export default checklist;
