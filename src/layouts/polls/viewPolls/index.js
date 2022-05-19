import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";

function ViewPolls() {
  const navigate = useNavigate();

  const { allGHeaders: miHeaders } = GHeaders();
  const [groups, setGroups] = useState([]);
  const [groupIDx, setGroupIDx] = useState("");
  const [questionx, setQuestionx] = useState("");

  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
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
        if (isMounted) {
          setGroups(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/poll/getByIds/${ids}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
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
        if (isMounted) {
          setQuestionx(result[0].question);
          setGroupIDx(result[0].groupID);
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
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              View Polls
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
            <MDTypography variant="gradient" fontSize="60%" color="white" id="title">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="message">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox mb={2}>
            <Container>
              <div className="row">
                <div className="col-sm-6">
                  <MDInput
                    type="text"
                    label="Question *"
                    value={questionx || ""}
                    disabled
                    // onKeyUp={handleOnTitleKeys}
                    onChange={(e) => setQuestionx(e.target.value)}
                    variant="standard"
                    fullWidth
                  />
                </div>
              </div>
            </Container>
          </MDBox>
          <MDBox>
            <Container>
              <div className="row">
                <div className="col-sm-6">
                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Select Group
                    </MDTypography>
                    <Form.Select
                      value={groupIDx || ""}
                      onChange={(e) => setGroupIDx(e.target.value)}
                      disabled
                      aria-label="Default select example"
                    >
                      <option value="">Select Group</option>
                      {groups.map((api) => (
                        <option key={api.group.id} value={api.group.id}>
                          {api.group.name}
                        </option>
                      ))}
                    </Form.Select>
                    <br />
                  </MDBox>
                </div>
              </div>
            </Container>
          </MDBox>

          {/* <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              onClick={(e) => handleUpdate(e)}
              // disabled={!enabled}
              color="info"
              width="50%"
              align="center"
            >
              Update
            </MDButton>
          </MDBox> */}
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default ViewPolls;
