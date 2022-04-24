import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";

function EditMattersArising() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [idx, setIdx] = useState("");
  const [titlex, setTitlex] = useState("");
  const [messagex, setMessagex] = useState("");
  const [levelx, setLevelx] = useState("");
  const [raisedByx, setRaisedByx] = useState("");
  const [raisedTox, setRaisedTox] = useState("");
  const [escalatedTox, setEscalatedTox] = useState("");
  const [escalationTimex, setEscalationTimex] = useState("");
  const [reasonForEscalationx, setReasonForEscalationx] = useState("");
  const [deleteFlagx, setDeleteFlagx] = useState("");
  const [createdTimex, setCreatedTimex] = useState("");

  const [user, setUser] = useState([]);
  // const [updateMatter, setUpdateMatter] = useState([]);

  const [checkedTitle, setCheckedTitle] = useState("");
  const [enabled, setEnabled] = useState("");

  // /concern/getForEmp/{orgID}/{empID}    /concern/getByIds/{ids}

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/concern/getByIds/${ids}`, {
      headers,
    })
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
          // eslint-disable-next-line eqeqeq
          if (result.length != 0) {
            setIdx(result[0].id);
            setTitlex(result[0].title);
            setMessagex(result[0].message);
            setLevelx(result[0].level);
            setRaisedByx(result[0].raisedBy);
            setRaisedTox(result[0].raisedTo);
            setEscalatedTox(result[0].escalatedTo);
            setEscalationTimex(result[0].escalationTime);
            setReasonForEscalationx(result[0].reasonForEscalation);
            setDeleteFlagx(result[0].deleteFlag);
            setCreatedTimex(result[0].createdTime);
          } else {
            setIdx(null);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdate = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    // const ids = data11.id;
    // const personalIds = data11.personalID;
    const orgIDs = data11.orgID;

    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      title: titlex,
      message: messagex,
      level: levelx,
      raisedBy: raisedByx,
      raisedTo: raisedTox,
      escalatedTo: escalatedTox,
      escalationTime: escalationTimex,
      reasonForEscalation: reasonForEscalationx,
      deleteFlag: deleteFlagx,
      createdTime: createdTimex,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_SHASHA_URL}/concern/update`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        // setOpened(false);
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
        // setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

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
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnTitleKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!titlex.match(letters)) {
      setCheckedTitle(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML =
        "Title - input only capital and small letters<br>";
    }
    if (titlex.match(letters)) {
      setCheckedTitle(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML = "";
    }
    if (titlex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML = "Title is required<br>";
    }
    setEnabled(checkedTitle === true);
  };

  const handleOnMessageKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!messagex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("message").innerHTML =
        "Message - input only capital and small letters<br>";
    }
    if (messagex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("message").innerHTML = "";
    }
    if (messagex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("message").innerHTML = "Message is required<br>";
    }
    // setEnabled(checkedTitle === true);
  };

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
              Matters Arising
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
                    label="Title *"
                    value={titlex || ""}
                    onKeyUp={handleOnTitleKeys}
                    onChange={(e) => setTitlex(e.target.value)}
                    variant="standard"
                    fullWidth
                  />
                </div>

                <div className="col-sm-6">
                  <MDInput
                    type="text"
                    label="Message *"
                    value={messagex || ""}
                    onKeyUp={handleOnMessageKeys}
                    onChange={(e) => setMessagex(e.target.value)}
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
                      Level
                    </MDTypography>
                    <Form.Select
                      aria-label="Default select example"
                      value={levelx || ""}
                      onChange={(e) => setLevelx(e.target.value)}
                    >
                      <option>---Level---</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="HIGH">HIGH</option>
                      <option value="Critical">Critical</option>
                    </Form.Select>
                  </MDBox>
                </div>
                <div className="col-sm-6">
                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Raised To
                    </MDTypography>
                    <Form.Select
                      value={raisedTox || ""}
                      onChange={(e) => setRaisedTox(e.target.value)}
                      aria-label="Default select example"
                    >
                      <option value="">Select Raised To</option>
                      {user.map((api) => (
                        <option key={api.personal.id} value={api.personal.id}>
                          {api.personal.fname} {api.personal.lname}
                        </option>
                      ))}
                    </Form.Select>
                    <br />
                  </MDBox>
                </div>
              </div>
            </Container>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleUpdate}
                disabled={!enabled}
                color="info"
                width="50%"
                align="center"
              >
                Update
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default EditMattersArising;
