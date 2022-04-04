import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { Form, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import MDButton from "components/MDButton";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import AddDetailsData from "layouts/timeofftype/addDetailsToTimeOffType/adddetailstable";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";
import { useNavigate } from "react-router-dom";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import MDInput from "components/MDInput";

function AddTimeOffType() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = AddDetailsData();

  const [position, setPosition] = useState([]);
  const [branch, setBranch] = useState([]);
  const [statusmap, setStatusmap] = useState([]);
  const [department, setDepartment] = useState([]);
  const [companyRole, setCompanyRole] = useState([]);

  const [positx, setPositx] = useState("");
  const [numofdaysx, setNumofdaysx] = useState("0");
  const [positionx, setPositionx] = useState("0");
  const [statustx, setStatustx] = useState("0");
  const [branchx, setBranchx] = useState("0");
  const [departx, setDepartx] = useState("0");
  const [companyxt, setCompanyxt] = useState("0");
  const [branx, setBranx] = useState("");
  const [genderx, setGender] = useState("");
  const [statusx, setStatusx] = useState("");
  const [departxt, setDepartxt] = useState("");
  const [companyx, setCompanyx] = useState("");
  // const [numofdays, setNumofdays] = useState("");
  // const [enabled, setEnabled] = useState("");
  // const [checkedNumbers, setCheckedNumbers] = useState("");

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const data11 = JSON.parse(localStorage.getItem("user1"));
  const orgIDs = data11.orgID;

  useEffect(() => {
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/position/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultp) => {
        if (resultp.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultp.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultp.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          setPosition(resultp);

          fetch(`${process.env.REACT_APP_KUBU_URL}/branch/gets/${orgIDs}`, { headers })
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resultx) => {
              if (resultx.message === "Expired Access") {
                navigate("/authentication/sign-in");
              }
              if (resultx.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
              }
              if (resultx.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
              }
              if (isMounted) {
                setBranch(resultx);
                console.log(resultx);

                fetch(`${process.env.REACT_APP_KUBU_URL}/department/gets/${orgIDs}`, { headers })
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
                      setDepartment(resultd);
                    }

                    fetch(`${process.env.REACT_APP_KUBU_URL}/role/gets/${orgIDs}`, { headers })
                      .then(async (res) => {
                        const aToken = res.headers.get("token-1");
                        localStorage.setItem("rexxdex", aToken);
                        return res.json();
                      })
                      .then((resultr) => {
                        if (resultr.message === "Expired Access") {
                          navigate("/authentication/sign-in");
                        }
                        if (resultr.message === "Token Does Not Exist") {
                          navigate("/authentication/sign-in");
                        }
                        if (resultr.message === "Unauthorized Access") {
                          navigate("/authentication/forbiddenPage");
                        }
                        if (isMounted) {
                          setCompanyRole(resultr);
                        }
                      });
                  });
              }
            });
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/status/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultp) => {
        if (isMounted) {
          setStatusmap(resultp);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e, valueType) => {
    console.log(valueType);
    e.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const ids = JSON.parse([id]);

    let allRaw = {};

    const raw1 = JSON.stringify({
      orgID: orgIDs,
      timeOffTypeID: ids,
      type: valueType,
      name: genderx,
      value: numofdaysx,
    });

    const raw2 = JSON.stringify({
      orgID: orgIDs,
      timeOffTypeID: ids,
      type: valueType,
      name: positx,
      value: positionx,
    });

    const raw3 = JSON.stringify({
      orgID: orgIDs,
      timeOffTypeID: ids,
      type: valueType,
      name: branx,
      value: branchx,
    });

    const raw4 = JSON.stringify({
      orgID: orgIDs,
      timeOffTypeID: ids,
      type: valueType,
      name: statusx,
      value: statustx,
    });

    const raw5 = JSON.stringify({
      orgID: orgIDs,
      timeOffTypeID: ids,
      type: valueType,
      name: departxt,
      value: departx,
    });

    const raw6 = JSON.stringify({
      orgID: orgIDs,
      timeOffTypeID: ids,
      type: valueType,
      name: companyx,
      value: companyxt,
    });
    if (valueType === 1) {
      allRaw = raw1;
    } else if (valueType === 2) {
      allRaw = raw2;
    } else if (valueType === 3) {
      allRaw = raw3;
    } else if (valueType === 4) {
      allRaw = raw4;
    } else if (valueType === 5) {
      allRaw = raw5;
    } else if (valueType === 6) {
      allRaw = raw6;
    }
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: allRaw,
      redirect: "follow",
    };
    console.log(allRaw);
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeofftype/details/add`, requestOptions)
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
            Add Detail
          </MDTypography>
          <MDTypography variant="gradient" fontSize="60%" color="white" id="numbers">
            {" "}
          </MDTypography>
        </MDBox>
        <Card>
          <Container>
            <div className="row">
              <div className="col-sm-6">
                <MDBox mb={2} mx={4} textAlign="left">
                  <Form.Select value={genderx || ""} onChange={(e) => setGender(e.target.value)}>
                    <option>---Select Gender---</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </MDBox>
              </div>
              <div className="col-sm-6">
                <MDInput
                  type="text"
                  value={numofdaysx || ""}
                  onChange={(e) => setNumofdaysx(e.target.value)}
                  label="Number Of Days"
                  variant="standard"
                  fullWidth
                />
              </div>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  onClick={(e) => handleClick(e, 1)}
                  color="info"
                  width="50%"
                >
                  Save
                </MDButton>
              </MDBox>
            </div>
          </Container>
        </Card>
        &nbsp;
        <Card>
          <Container>
            <div className="row">
              <div className="col-sm-6">
                <MDBox mx={4} textAlign="left">
                  <Form.Select
                    value={positx || ""}
                    onChange={(e) => setPositx(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option value="">---Select Position---</option>
                    {position.map((api) => (
                      <option key={api.id} value={api.name}>
                        {api.name}
                      </option>
                    ))}
                  </Form.Select>
                  <br />
                </MDBox>
              </div>
              <div className="col-sm-6">
                <MDInput
                  type="text"
                  value={positionx || ""}
                  onChange={(e) => setPositionx(e.target.value)}
                  label="Number Of Days"
                  variant="standard"
                  fullWidth
                />
              </div>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  onClick={(e) => handleClick(e, 2)}
                  color="info"
                  width="50%"
                >
                  Save
                </MDButton>
              </MDBox>
            </div>
          </Container>
        </Card>
        &nbsp;
        <Card>
          <Container>
            <div className="row">
              <div className="col-sm-6">
                <MDBox mx={4} textAlign="left">
                  <Form.Select
                    value={branx || ""}
                    onChange={(e) => setBranx(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option value="">---Select Branch---</option>
                    {branch.map((api) => (
                      <option key={api.id} value={api.name}>
                        {api.name}
                      </option>
                    ))}
                  </Form.Select>
                  <br />
                </MDBox>
              </div>
              <div className="col-sm-6">
                <MDInput
                  type="text"
                  value={branchx || ""}
                  onChange={(e) => setBranchx(e.target.value)}
                  label="Number Of Days"
                  variant="standard"
                  fullWidth
                />
              </div>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  onClick={(e) => handleClick(e, 3)}
                  color="info"
                  width="50%"
                >
                  Save
                </MDButton>
              </MDBox>
            </div>
          </Container>
        </Card>
        &nbsp;
        <Card>
          <Container>
            <div className="row">
              <div className="col-sm-6">
                <MDBox mx={4} textAlign="left">
                  <Form.Select
                    value={statusx || ""}
                    onChange={(e) => setStatusx(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option value="">---Select Status---</option>
                    {statusmap.map((api) => (
                      <option key={api.id} value={api.name}>
                        {api.name}
                      </option>
                    ))}
                  </Form.Select>
                  <br />
                </MDBox>
              </div>
              <div className="col-sm-6">
                <MDInput
                  type="text"
                  value={statustx || ""}
                  onChange={(e) => setStatustx(e.target.value)}
                  label="Number Of Days"
                  variant="standard"
                  fullWidth
                />
              </div>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  onClick={(e) => handleClick(e, 4)}
                  color="info"
                  width="50%"
                >
                  Save
                </MDButton>
              </MDBox>
            </div>
          </Container>
        </Card>
        &nbsp;
        <Card>
          <Container>
            <div className="row">
              <div className="col-sm-6">
                <MDBox mx={4} textAlign="left">
                  <Form.Select
                    value={departxt || ""}
                    onChange={(e) => setDepartxt(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option value="">---Select Department---</option>
                    {department.map((api) => (
                      <option key={api.id} value={api.name}>
                        {api.name}
                      </option>
                    ))}
                  </Form.Select>
                  <br />
                </MDBox>
              </div>
              <div className="col-sm-6">
                <MDInput
                  type="text"
                  value={departx || ""}
                  onChange={(e) => setDepartx(e.target.value)}
                  label="Number Of Days"
                  variant="standard"
                  fullWidth
                />
              </div>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  onClick={(e) => handleClick(e, 5)}
                  color="info"
                  width="50%"
                >
                  Save
                </MDButton>
              </MDBox>
            </div>
          </Container>
        </Card>
        &nbsp;
        <Card>
          <Container>
            <div className="row">
              <div className="col-sm-6">
                <MDBox mx={4} textAlign="left">
                  <Form.Select
                    value={companyx || ""}
                    onChange={(e) => setCompanyx(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option value="">---Select Company Role---</option>
                    {companyRole.map((api) => (
                      <option key={api.id} value={api.name}>
                        {api.name}
                      </option>
                    ))}
                  </Form.Select>
                  <br />
                </MDBox>
              </div>
              <div className="col-sm-6">
                <MDInput
                  type="text"
                  value={companyxt || ""}
                  onChange={(e) => setCompanyxt(e.target.value)}
                  label="Number Of Days"
                  variant="standard"
                  fullWidth
                />
              </div>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  onClick={(e) => handleClick(e, 6)}
                  color="info"
                  width="50%"
                >
                  Save
                </MDButton>
              </MDBox>
            </div>
          </Container>
        </Card>
        {/* <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              onClick={handleClick}
              disabled={!enabled}
              color="info"
              width="50%"
            >
              Save
            </MDButton>
          </MDBox> */}
      </MDBox>
      <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: pRows }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddTimeOffType;
