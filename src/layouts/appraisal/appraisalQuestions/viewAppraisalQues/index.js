import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form, Dropdown } from "react-bootstrap";
import Icon from "@mui/material/Icon";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function VuAppraisalQuestion() {
  const MySwal = withReactContent(Swal);

  const [idx, setId] = useState("");
  const [orgIDx, setOrgID] = useState("");
  const [questionx, setQuestion] = useState("");
  const [hintx, setHint] = useState("");
  const [inputTypex, setInputType] = useState("");
  const [createdDatex, setCreatedDate] = useState("");
  const [deletedflagx, setDeletedflag] = useState("");

  const [optionx, setOption] = useState("");

  const [items, setItems] = useState([]);

  const [viewOption, setViewOption] = useState(false);
  const [viewMultiple, setViewMultiple] = useState(false);
  const [viewTable, setViewTable] = useState(false);

  const [opened, setOpened] = useState(false);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalQuestion/getByIds/${id}`, { headers })
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
          console.log(result);
          setId(result[0].question.id);
          setOrgID(result[0].question.orgID);
          setQuestion(result[0].question.question);
          setHint(result[0].question.hint);
          setInputType(result[0].question.inputType);
          setCreatedDate(result[0].question.createdDate);
          setDeletedflag(result[0].question.deletedflag);

          if (result[0].question.inputType === "Option") {
            setViewOption(true);
            setViewMultiple(false);
            setViewTable(true);
          } else if (result[0].question.inputType === "Multiple") {
            setViewMultiple(true);
            setViewOption(false);
            setViewTable(true);
          } else {
            setViewTable(false);
            setViewMultiple(false);
            setViewOption(false);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDx,
      question: questionx,
      hint: hintx,
      inputType: inputTypex,
      createdTime: createdDatex,
      deleteFlag: deletedflagx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalQuestion/update`, requestOptions)
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
        setOpened(false);
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          window.location.reload();
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

  const handleAddOption = (e) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    setOpened(true);
    e.preventDefault();
    const raw = JSON.stringify({
      orgID: orgIDs,
      questionID: id,
      optionValue: optionx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalQuestion/addOption`, requestOptions)
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
        setOpened(false);
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          window.location.reload();
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

  // Method to handle diable
  const handleDisable = (val) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(
          `${process.env.REACT_APP_SHASHA_URL}/appraisalQuestion/removeOption/${val}`,
          requestOptions
        )
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resx) => {
            if (resx.message === "Expired Access") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }
            MySwal.fire({
              title: resx.status,
              type: "success",
              text: resx.message,
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
      }
    });
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalQuestion/getByIds/${id}`, { headers })
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
          setItems(result[0].options);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const pColumns = [
    {
      Header: "Option",
      accessor: "optionValue",
      align: "left",
    },
    {
      Header: "actions",
      accessor: "id",
      // eslint-disable-next-line react/prop-types
      Cell: ({ cell: { value } }) => (
        <div
          style={{
            width: "100%",
            backgroundColor: "#dadada",
            borderRadius: "2px",
          }}
        >
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
              <Icon sx={{ fontWeight: "light" }}>settings</Icon>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleDisable(value)}>Remove</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      align: "center",
    },
  ];

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
              Appraisal Question
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
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={0}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                      <Form.Label style={{ fontSize: 14 }}>Questions</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={questionx || ""}
                        onChange={(e) => setQuestion(e.target.value)}
                        rows={2}
                      />
                    </Form.Group>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDInput
                      type="text"
                      value={hintx || ""}
                      onChange={(e) => setHint(e.target.value)}
                      label="Hint"
                      variant="standard"
                      fullWidth
                    />
                    <MDTypography variant="h4" fontWeight="medium" fontSize="55%">
                      (Hint is not Compulsory)
                    </MDTypography>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      Question Type
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        onChange={(e) => setInputType(e.target.value)}
                        value={inputTypex || ""}
                        aria-label="Default select example"
                      >
                        <option>---Question Type---</option>
                        <option value="Text">Text</option>
                        <option value="Option">Option</option>
                        <option value="Multiple">Multiple Select</option>
                      </Form.Select>
                    </MDBox>
                  </div>
                </div>
              </Container>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" onClick={handleClick} color="info" width="50%">
                  Save
                </MDButton>
              </MDBox>
            </MDBox>
            {viewOption ? (
              <MDBox mb={2}>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  mx={2}
                  mt={0}
                  p={2}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                    Add Option
                  </MDTypography>
                </MDBox>
                <Container>
                  <div className="row">
                    <div className="col-sm-12">
                      <MDInput
                        type="text"
                        value={optionx || ""}
                        onChange={(e) => setOption(e.target.value)}
                        label="Option"
                        variant="standard"
                        fullWidth
                      />
                    </div>
                  </div>
                </Container>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" onClick={handleAddOption} color="info" width="50%">
                    Add Option
                  </MDButton>
                </MDBox>
              </MDBox>
            ) : (
              <MDBox mt={4} mb={1} />
            )}
            {viewMultiple ? (
              <MDBox mb={2}>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  mx={2}
                  mt={0}
                  p={2}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                    Add Option
                  </MDTypography>
                </MDBox>
                <Container>
                  <div className="row">
                    <div className="col-sm-12">
                      <MDInput
                        type="text"
                        value={optionx || ""}
                        onChange={(e) => setOption(e.target.value)}
                        label="Option"
                        variant="standard"
                        fullWidth
                      />
                    </div>
                  </div>
                </Container>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" onClick={handleAddOption} color="info" width="50%">
                    Add Option
                  </MDButton>
                </MDBox>
              </MDBox>
            ) : (
              <MDBox mt={4} mb={1} />
            )}
          </MDBox>
        </MDBox>
      </Card>{" "}
      &nbsp;
      {viewTable ? (
        <MDBox>
          <DataTable
            table={{ columns: pColumns, rows: items }}
            isSorted
            entriesPerPage
            showTotalEntries
            noEndBorder
            canSearch
          />
        </MDBox>
      ) : (
        <MDBox mt={4} mb={1} />
      )}
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default VuAppraisalQuestion;
