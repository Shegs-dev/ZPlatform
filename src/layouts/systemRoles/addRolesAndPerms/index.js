import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import "bootstrap/dist/css/bootstrap.min.css";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

function RolesAndPerms() {
  const [rolName, setRolName] = useState("");
  const [services, setServices] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [rolPermissions, setRolPermissions] = useState([]);
  const [vPermissions, setVPermissions] = useState([]);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const idVal = JSON.parse([id]);
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/roles/get/${idVal}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultg) => {
        if (resultg.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultg.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultg.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          setRolName(resultg[0].name);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const permissionsList = [];

  useEffect(() => {
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/services/gets`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultapi) => {
        if (resultapi.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultapi.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultapi.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          setServices(resultapi);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnChange = (e) => {
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const idVal = JSON.parse([id]);

    const apiValue = e.target.value;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/permissions/getForService/${apiValue}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resulta) => {
        if (resulta.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resulta.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resulta.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        setPermissions(resulta);

        fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/rolespermissions/getbyroleid/${idVal}`, {
          headers,
        })
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resultrpg) => {
            if (resultrpg.message === "Expired Access") {
              navigate("/authentication/sign-in");
            }
            if (resultrpg.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
            }
            if (resultrpg.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }
            setRolPermissions(resultrpg);

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

            setVPermissions(permissionsList);
            console.log(vPermissions);
            console.log(permissions);
            console.log(rolPermissions);
          });
      });
  };

  const handleOnClick = (e, apix) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const idVal = JSON.parse([id]);

    let isChecked = 0;
    const checks = e.target.checked;
    if (checks) {
      isChecked = 1;
    }
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

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
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultrp) => {
        if (resultrp.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultrp.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultrp.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
      });
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
              Select A Service
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
