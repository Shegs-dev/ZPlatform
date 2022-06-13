import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Swal from "sweetalert2";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import withReactContent from "sweetalert2-react-content";
import GHeaders from "getHeader";
import PHeaders from "postHeader";

function AppraisalUpdate() {
  const MySwal = withReactContent(Swal);

  const { allGHeaders: miHeaders } = GHeaders();
  const { allPHeaders: myHeaders } = PHeaders();

  const navigate = useNavigate();

  const [idx, setIdx] = useState("");
  const [valuex, setValuex] = useState("");
  const [gradex, setGradex] = useState("");
  const [colorCodex, setColorCodex] = useState("");
  const [minScorex, setMinScorex] = useState(0);
  const [maxScorex, setMaxScorex] = useState(0);
  const [createdTimex, setCreatedTimex] = useState("");
  const [deleteFlagx, setDeleteFlagx] = useState("");

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalGrading/getByIds/${ids}`, {
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
            setValuex(result[0].value);
            setGradex(result[0].grade);
            setColorCodex(result[0].colorCode);
            console.log(result[0].minScore);
            setMinScorex(result[0].minScore);
            setMaxScorex(result[0].maxScore);
            setDeleteFlagx(result[0].deleteFlag);
            setCreatedTimex(result[0].createdTime);
          } else {
            setIdx(null);
          }
          console.log(result);
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
      value: valuex,
      grade: gradex,
      colorCode: colorCodex,
      minScore: minScorex,
      maxScore: maxScorex,
      createdTime: createdTimex,
      deletedFlag: deleteFlagx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalGrading/update`, requestOptions)
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={30}>
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
              Update Appraisal Grade
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
            <MDTypography variant="gradient" fontSize="60%" color="white" id="name">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="email">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="phone">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="street">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="city">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="Score Value *"
                      value={valuex || ""}
                      // onKeyUp={handleOnTitleKeys}
                      onChange={(e) => setValuex(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      placeholder="e.g A, B, C, D"
                      value={gradex || ""}
                      // onKeyUp={handleOnEmailKeys}
                      onChange={(e) => setGradex(e.target.value)}
                      label="Grade"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={minScorex}
                      // onKeyUp={handleOnStreetKeys}
                      onChange={(e) => setMinScorex(e.target.value)}
                      label="Minimum Score"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={maxScorex}
                      // onKeyUp={handleOnCityKeys}
                      onChange={(e) => setMaxScorex(e.target.value)}
                      label="Maximum Score"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            &nbsp;
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  {/* <div className="col-sm-6">
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Color:
                    </MDTypography>
                    <input
                      type="color"
                      className="form-control"
                      style={{ width: "70%" }}
                      onChange={(e) => setColorCode(e.target.value)}
                    />
                  </div> */}

                  <div className="col-sm-6">
                    <Form.Select
                      aria-label="Default select example"
                      width="50%"
                      mx={34}
                      onChange={(e) => setColorCodex(e.target.value)}
                    >
                      <option>Select Color *</option>
                      <option value="danger">Red</option>
                      <option value="warning">Yellow</option>
                      <option value="info">Blue</option>
                      <option value="success">Green</option>
                    </Form.Select>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
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
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default AppraisalUpdate;
