import { Form } from "react-bootstrap";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import { useEffect, useState } from "react";

const queryString = window.location.search;
const [setItems] = useState([]);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
console.log(id);

useEffect(() => {
  const data11 = JSON.parse(localStorage.getItem("user1"));
  console.log(data11);

  const orgIDs = data11.orgID;
  console.log(orgIDs);
  let isMounted = true;
  fetch(`${process.env.REACT_APP_KUBU_URL}/department/gets/${orgIDs}`)
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

export default function checklist() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox mb={2}>
          <Form>
            <Form.Text className="text-muted">&nbsp; &nbsp;Company Roles</Form.Text>
            &nbsp; &nbsp;
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Admin" />
            </Form.Group>
          </Form>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}
