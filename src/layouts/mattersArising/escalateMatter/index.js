import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import Card from "@mui/material/Card";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";

function EscalateMatter() {
  const MySwal = withReactContent(Swal);

  const [userx, setUser] = useState([]);
  const [escalatetox, setEscalateto] = useState();
  const [reasonx, setReason] = useState("");
  //   const [reasonTitle, setReasonTitle] = useState("");
  //   const [enabled, setEnabled] = useState("");

  const navigate = useNavigate();

  const { allGHeaders: miHeaders } = GHeaders();
  const { allPHeaders: myHeaders } = PHeaders();

  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          setUser(result);
          // setEscalateto(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const concernids = urlParams.get("id");

    const raw = JSON.stringify({
      concernID: concernids,
      escalateTo: escalatetox,
      reasonForEscalation: reasonx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_SHASHA_URL}/concern/escalate`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
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

  //   const handleOnEscalateKeys = () => {
  //     const letters = /^[a-zA-Z ]+$/;
  //     if (!reasonx.match(letters)) {
  //       setReasonTitle(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("reason").innerHTML =
  //         "Reason - input only capital and small letters<br>";
  //     }
  //     if (reasonx.match(letters)) {
  //       setReasonTitle(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("reason").innerHTML = "";
  //     }
  //     if (reasonx.length === 0) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("reason").innerHTML = "Reason is required<br>";
  //     }
  //     setEnabled(reasonTitle === true);
  //   };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="row">
        <div className="col-sm-2">&nbsp;</div>
        <div className="col-sm-8" align="center">
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="success"
                  mx={25}
                  mt={-6}
                  p={3}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                    Escalation
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
                  <MDTypography variant="gradient" fontSize="60%" color="white" id="reason">
                    {" "}
                  </MDTypography>
                </MDBox>
                {/* <Form> */}
                <Form.Group
                  className="mb-3"
                  controlId="setPurposex"
                  placeholder="Description"
                  value={reasonx || ""}
                  onChange={(e) => setReason(e.target.value)}
                >
                  <Form.Label>Reason For Escalation</Form.Label>
                  <Form.Control as="textarea" rows={2} />
                </Form.Group>
                {/* </Form> */}
                {/* <option align="center">Escalate Matter To</option>
                {userx.map((api) => (
                  <div key={api.personal.id} className="mb-3" align="left">
                    <Form.Check.Input
                      type="radio"
                      defaultChecked={api.isCheck}
                      onClick={(e) => handleClick(e, api)}
                      // onChange={setEscalateto}
                    />
                    <Form.Check.Label>
                      &nbsp; {api.personal.fname} {api.personal.lname}
                    </Form.Check.Label>
                  </div>
                ))} */}
                <MDBox mb={2}>
                  <MDTypography variant="button" fontWeight="regular" color="text">
                    Reason For Escalation
                  </MDTypography>
                  <Form.Select
                    value={escalatetox}
                    onChange={(e) => setEscalateto(e.target.value)}
                    aria-label="Default select example"
                    // onClick={(e) => handleClick(e)}
                  >
                    <option value="">Escalate Matter To</option>
                    {userx.map((api) => (
                      <option key={api.personal.id} value={api.personal.id}>
                        {api.personal.fname} {api.personal.lname}
                      </option>
                    ))}
                  </Form.Select>
                  <br />
                </MDBox>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  onClick={handleClick}
                  // onKeyUp={handleOnEscalateKeys}
                  // disabled={!enabled}
                  color="info"
                  width="50%"
                  align="center"
                >
                  Add
                </MDButton>
              </MDBox>
            </MDBox>
          </Card>
        </div>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default EscalateMatter;
