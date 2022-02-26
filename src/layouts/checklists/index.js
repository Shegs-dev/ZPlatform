import { Form } from "react-bootstrap";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useState, useEffect, React } from "react";

function Checkbox() {
  const [rolName, setRolName] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [vPermissions, setVPermissions] = useState([]);
  const [roleStep, setRoleStep] = useState([]);

  const data11 = JSON.parse(localStorage.getItem("user1"));
  console.log(data11);

  const orgIDs = data11.orgID;
  console.log(orgIDs);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  // const idVal = JSON.parse([id]);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const handleOnClick = (e, apix) => {
    let isChecked = 0;
    const checks = e.target.checked;
    console.log(checks);
    if (checks) {
      isChecked = 1;
    }
    console.log(isChecked);
    const raw = JSON.stringify({
      orgID: orgIDs,
      roleID: id,
      stepID: apix.id,
      isCheck: isChecked,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_KUBU_URL}/rolestep/save`, requestOptions)
      .then((res) => res.json())
      .then((resultrp) => {
        console.log(resultrp);
      });
  };

  fetch(`${process.env.REACT_APP_KUBU_URL}/role/get/${id}`)
    .then((res) => res.json())
    .then((resultg) => {
      setRolName(resultg[0].name);
      console.log(rolName);
    });

  const permissionsList = [];

  useEffect(() => {
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/step/gets/${orgIDs}`)
      .then((res) => res.json())
      .then((resulta) => {
        if (isMounted) {
          setPermissions(resulta);
          console.log(resulta);
        }

        fetch(`${process.env.REACT_APP_KUBU_URL}/rolestep/getsRoleSteps/${orgIDs}/${id}`)
          .then((res) => res.json())
          .then((resultrs) => {
            setRoleStep(resultrs);
            console.log(resultrs);

            // eslint-disable-next-line array-callback-return
            resulta.map((permission) => {
              let check = false;
              console.log(resultrs);
              if (resultrs != null) {
                // eslint-disable-next-line array-callback-return
                resultrs.map((rolPermi) => {
                  if (rolPermi.stepID === permission.id) {
                    if (rolPermi.isCheck === 1) {
                      check = true;
                    }
                  }
                  // check = false;
                });
              }

              const pObj = {
                id: permission.id,
                name: permission.name,
                isCheck: check,
              };

              permissionsList.push(pObj);
            });
            console.log(roleStep);
            console.log(permissionsList);
            setVPermissions(permissionsList);
            console.log(permissions);
            console.log(vPermissions);
          });
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
            {vPermissions.map((api) => (
              <div key={api.id} className="mb-3">
                <Form.Check type="checkbox">
                  <Form.Check.Input
                    type="checkbox"
                    defaultChecked={api.isCheck}
                    onClick={(e) => handleOnClick(e, api)}
                  />
                  <Form.Check.Label>{api.name}</Form.Check.Label>
                </Form.Check>
              </div>
            ))}
          </Form>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}
export default Checkbox;
