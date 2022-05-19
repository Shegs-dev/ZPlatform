import { Form } from "react-bootstrap";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useState, useEffect, React } from "react";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import PHeaders from "postHeader";

function Checkbox() {
  const MySwal = withReactContent(Swal);

  const [rolName, setRolName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [vPermissions, setVPermissions] = useState([]);
  const [roleStep, setRoleStep] = useState([]);

  const [opened, setOpened] = useState(false);

  const data11 = JSON.parse(localStorage.getItem("user1"));

  const orgIDs = data11.orgID;

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();

  const { allGHeaders: miHeaders } = GHeaders();

  const handleOnClick = (e, apix) => {
    setOpened(true);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    let isChecked = 0;
    const checks = e.target.checked;
    if (checks) {
      isChecked = 1;
    }
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

    // const headers = miHeaders;
    fetch(`${process.env.REACT_APP_KUBU_URL}/rolestep/save`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
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
    // setOpened(true);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/role/get/${id}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultg) => {
        // setOpened(false);
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
  });

  useEffect(() => {
    // setOpened(true);

    const permissionsList = [];
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/step/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultd) => {
        if (resultd.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultd.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultd.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          setPermissions(resultd);
        }

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get("id");
        fetch(`${process.env.REACT_APP_KUBU_URL}/rolestep/getsRoleSteps/${orgIDs}/${id}`, {
          headers,
        })
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resultrs) => {
            // setOpened(false);
            if (resultrs.message === "Expired Access") {
              navigate("/authentication/sign-in");
            }
            if (resultrs.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
            }
            if (resultrs.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }
            if (isMounted) {
              setRoleStep(resultrs);
            }

            // eslint-disable-next-line array-callback-return
            resultd.map((permission) => {
              let check = false;
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
            console.log(permissions);
            console.log(roleStep);
            console.log(permissionsList);
            setVPermissions(permissionsList);
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
          Steps
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
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
export default Checkbox;
