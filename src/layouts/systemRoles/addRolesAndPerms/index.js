import { Form } from "react-bootstrap";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
console.log(id);

export default function RolesAndPerms() {
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
