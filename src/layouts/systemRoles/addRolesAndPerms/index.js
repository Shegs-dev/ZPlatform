import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import "bootstrap/dist/css/bootstrap.min.css";

function RolesAndPerms() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  const idVal = JSON.parse([id]);

  const [rolName, setRolName] = useState("");
  const [services, setServices] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [rolPermissions, setRolPermissions] = useState([]);
  const [vPermissions, setVPermissions] = useState([]);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  fetch(`${process.env.REACT_APP_ZAVE_URL}/roles/get/${idVal}`)
    .then((res) => res.json())
    .then((resultg) => {
      setRolName(resultg[0].name);
    });

  const permissionsList = [];

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
          setServices(resultapi);
          // apiList = resultapi;
          console.log(apppi);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  /* const checkPermission = (value) => {
    console.log(`Value${value}`);
    let checks = false;
    rolPermissions.map((rolPermi) => {
      console.log(`Val${rolPermi.permissionCall}`);
      if (rolPermi.permissionCall === value) {
        if (rolPermi.isCheck === 1) {
          checks = true;
          return checks;
        }
      }
      return checks;
    });
  }; */

  const handleOnChange = (e) => {
    const apiValue = e.target.value;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/permissions/getForService/${apiValue}`)
      .then((res) => res.json())
      .then((resulta) => {
        setPermissions(resulta);
        console.log(resulta);

        fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/rolespermissions/getbyroleid/${idVal}`)
          .then((res) => res.json())
          .then((resultrpg) => {
            setRolPermissions(resultrpg);
            console.log(resultrpg);

            console.log(permissions);
            console.log(rolPermissions);
            // eslint-disable-next-line array-callback-return
            resulta.map((permission) => {
              let check = false;

              if (resultrpg != null) {
                // eslint-disable-next-line array-callback-return
                resultrpg.map((rolPermi) => {
                  if (rolPermi.permissionCall === permission.actionCall) {
                    if (rolPermi.isCheck === 1) {
                      check = true;
                    }
                  }
                  // check = false;
                });
              }

              const pObj = {
                id: permission.id,
                name: permission.displayName,
                isCheck: check,
                actionCall: permission.actionCall,
              };

              permissionsList.push(pObj);
            });

            console.log(permissionsList);
            setVPermissions(permissionsList);
            console.log(vPermissions);
          });
      });
  };

  const handleOnClick = (e, apix) => {
    let isChecked = 0;
    const checks = e.target.checked;
    console.log(checks);
    if (checks) {
      isChecked = 1;
    }
    console.log(isChecked);
    console.log(apix);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);

    const orgIDs = data11.orgID;
    console.log(orgIDs);
    const permCall = apix.actionCall;

    const raw = JSON.stringify({
      orgID: orgIDs,
      roleID: idVal,
      permissionCall: permCall,
      isCheck: isChecked,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/rolespermissions/save`, requestOptions)
      .then((res) => res.json())
      .then((resultrp) => {
        console.log(resultrp);
      });
    console.log(apix.actionCall);
  };

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
        <MDBox mb={2}>
          &nbsp;
          <div>
            <MDTypography
              variant="h6"
              textAlign="center"
              fontWeight="medium"
              color="secondary"
              mt={0}
            >
              Select Permissions
            </MDTypography>
            <MDBox mx={34} textAlign="right">
              <Form.Select aria-label="Default select example" onChange={handleOnChange}>
                <option>--Select Service--</option>
                {services.map((api) => (
                  <option key={api.id} value={api.name}>
                    {api.name}
                  </option>
                ))}
              </Form.Select>
            </MDBox>
          </div>
        </MDBox>
      </Card>
      &nbsp;
      <Card>
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
                <Form.Check.Input
                  type="checkbox"
                  defaultChecked={api.isCheck}
                  onClick={(e) => handleOnClick(e, api)}
                />
                <Form.Check.Label>{api.name}</Form.Check.Label>
              </div>
            ))}
          </Form>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default RolesAndPerms;

/* <Form.Select aria-label="Default select example">
          <option>--Select Permission--</option>
          {permissions.map((api) => (
            <option key={api.id} value={api.displayName}>
              {api.displayName}
            </option>
          ))}
        </Form.Select> 
        
                <Form.Check
                  type="checkbox"
                  id={api.id}
                  checked={api.isCheck}
                  label={api.id}
                  onClick={() => handleOnClick(api)}
                /> */
