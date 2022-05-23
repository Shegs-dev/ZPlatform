import { useEffect, useState } from "react";
import { Form, Container } from "react-bootstrap";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import "bootstrap/dist/css/bootstrap.min.css";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MDButton from "components/MDButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function updatesystemrole() {
  const MySwal = withReactContent(Swal);
  const [users, setUsers] = useState({});
  const [lists, setLists] = useState([]);
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const [roleIDx, setRoleID] = useState("");
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;

    const id = urlParams.get("id");
    const idVal = JSON.parse([id]);

    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/personalcompany/getByPersonalID/${orgIDs}/${idVal}`, {
      headers,
    })
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
          if (resultg.roleID === null) setRoleID("0");
          else setRoleID(resultg.roleID);
          setUsers(resultg);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;

    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/roles/getForOrganization/${orgIDs}`, { headers })
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
          setLists(resultg);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = () => {
    setOpened(true);

    const raw = JSON.stringify({
      id: users.id,
      personalID: users.personalID,
      email: users.email,
      orgID: users.orgID,
      roleID: roleIDx,
      statusID: users.statusID,
      staffID: users.staffID,
      reasonForDelete: users.reasonForDelete,
      deleteFlag: users.deleteFlag,
      createdTime: users.createdTime,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/personalcompany/update`, requestOptions)
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
        MySwal.fire({
          title: resultrp.status,
          type: "success",
          text: resultrp.message,
        }).then(() => {
          // window.location.reload();
          navigate(`/user-Management`);
        });
      })
      .catch((error) => {
        setOpened(false);
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
            Update User System Role
          </MDTypography>
          <MDTypography variant="gradient" fontSize="60%" color="white" id="numbers">
            {" "}
          </MDTypography>
        </MDBox>
        <MDBox
          variant="gradient"
          bgColor="error"
          borderRadius="lg"
          coloredShadow="success"
          mx={3}
          mt={1}
          p={1}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="gradient" fontSize="60%" color="white" id="numofdays">
            {" "}
          </MDTypography>
        </MDBox>
        <Card>
          <Container>
            <div className="row">
              <div className="col-sm-12">
                <MDBox mb={2}>
                  <Form.Select
                    value={roleIDx}
                    onChange={(e) => setRoleID(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option value="0">Admin</option>
                    {lists.map((api) => (
                      <option key={api.id} value={api.id}>
                        {api.name}
                      </option>
                    ))}
                  </Form.Select>
                </MDBox>
              </div>
            </div>

            <div className="row">
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" onClick={handleClick} color="info" width="50%">
                  Save
                </MDButton>
              </MDBox>
            </div>
          </Container>
        </Card>
      </MDBox>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default updatesystemrole;
