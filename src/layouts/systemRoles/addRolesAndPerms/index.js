import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import "bootstrap/dist/css/bootstrap.min.css";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function RolesAndPerms() {
  const [rolName, setRolName] = useState("");
  const [serviceVal, setServiceVal] = useState("");

  const [services, setServices] = useState([]);
  const [rService, setRService] = useState("");
  const [vPermissions, setVPermissions] = useState([]);

  const [showSAll, setSAll] = useState(false);
  const [checkSelAll, setcheckSelAll] = useState(true);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    setOpened(true);
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
        setOpened(false);
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

  const handleOnChange = (value) => {
    setOpened(true);
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const idVal = JSON.parse([id]);
    JSON.stringify(localStorage.setItem("permVal", value));

    const apiValue = value;
    setRService(value);
    setServiceVal(apiValue);
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
        fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/rolespermissions/getbyroleid/${idVal}`, {
          headers,
        })
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resultrpg) => {
            setOpened(false);
            if (resultrpg.message === "Expired Access") {
              navigate("/authentication/sign-in");
            }
            if (resultrpg.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
            }
            if (resultrpg.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }

            let countPerm = 0;
            // eslint-disable-next-line array-callback-return
            resulta.map((permission) => {
              let check = false;

              if (resultrpg != null) {
                // eslint-disable-next-line array-callback-return
                resultrpg.map((rolPermi) => {
                  if (rolPermi.permissionCall === permission.actionCall) {
                    if (rolPermi.isCheck === 1) {
                      check = true;
                      countPerm += 1;
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
                descrip: permission.descrip,
              };

              permissionsList.push(pObj);
            });
            if (resulta.length !== 0) {
              setSAll(true);
              if (countPerm === resulta.length) {
                setcheckSelAll(false);
              } else {
                setcheckSelAll(true);
              }
            } else {
              setSAll(false);
            }
            setVPermissions(permissionsList);
          });
      });
  };

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/services/gets`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultapi) => {
        setOpened(false);
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
          const permm = localStorage.getItem("permVal");
          if (permm !== null) {
            setRService(permm);
            handleOnChange(permm);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnClick = (e, apix) => {
    setOpened(true);
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

    const raw = JSON.stringify([
      {
        orgID: orgIDs,
        roleID: idVal,
        permissionCall: permCall,
        isCheck: isChecked,
      },
    ]);
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
        setOpened(false);
        if (resultrp.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultrp.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultrp.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        const permm = localStorage.getItem("permVal");
        if (permm !== null) {
          handleOnChange(permm);
        }
      });
  };
  const handleSelectAll = (e) => {
    if (showSAll) {
      setOpened(true);
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get("id");
      const idVal = JSON.parse([id]);

      let isChecked = 0;
      const checks = e.target.value;
      if (checks === "1") {
        isChecked = 1;
      }

      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;

      const headers = miHeaders;
      fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/permissions/getForService/${serviceVal}`, {
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
          const selectAllPrems = [];
          // eslint-disable-next-line array-callback-return
          resulta.map((item) => {
            const fdy = {
              orgID: orgIDs,
              roleID: idVal,
              permissionCall: item.actionCall,
              isCheck: isChecked,
            };
            selectAllPrems.push(fdy);
          });

          const raw = JSON.stringify(selectAllPrems);
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
              const result = await res.text();
              if (result === null || result === undefined || result === "") {
                return {};
              }
              return JSON.parse(result);
            })
            .then((resultrp) => {
              setOpened(false);
              if (resultrp.message === "Expired Access") {
                navigate("/authentication/sign-in");
              }
              if (resultrp.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
              }
              if (resultrp.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
              }
              setOpened(false);
              window.location.reload();
            });
        });
    }
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
              <Form.Select
                aria-label="Default select example"
                value={rService}
                onChange={(e) => handleOnChange(e.target.value)}
              >
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
          {showSAll ? (
            <div align="left">
              {checkSelAll ? (
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    value={1}
                    onClick={(e) => handleSelectAll(e)}
                    color="info"
                    width="50%"
                  >
                    Select All
                  </MDButton>
                </MDBox>
              ) : (
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    value={0}
                    onClick={(e) => handleSelectAll(e)}
                    color="info"
                    width="50%"
                  >
                    UnSelect All
                  </MDButton>
                </MDBox>
              )}
            </div>
          ) : (
            <MDBox mt={4} mb={1} />
          )}
          <Form>
            {vPermissions.map((api) => (
              <div key={api.id} className="mb-3">
                <Form.Check.Input
                  type="checkbox"
                  defaultChecked={api.isCheck}
                  onClick={(e) => handleOnClick(e, api)}
                />
                <Form.Check.Label>{api.name}</Form.Check.Label>
                &nbsp;
                <h6>{api.descrip}</h6>
              </div>
            ))}
          </Form>
        </MDBox>
      </Card>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default RolesAndPerms;
