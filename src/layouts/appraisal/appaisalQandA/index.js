import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function AppraiseQandA() {
  const MySwal = withReactContent(Swal);

  const animatedComponents = makeAnimated();

  const [questionIDx, setQuestionID] = useState("");
  const [orgIDx, setOrgID] = useState("");
  const [questionx, setQuestion] = useState("");
  const [hintx, setHint] = useState("");
  const [answerx, setAnswer] = useState("");

  const [appraisalName, setAppraisalName] = useState("");
  const [appraiseeName, setAppraiseeName] = useState("");

  const [showF, setShowF] = useState(true);
  const [showCom, setShowCom] = useState(true);

  const [pageNo, setPageNo] = useState(1);
  const [questNo, setQuestNo] = useState(1);
  const [rLength, setRLength] = useState(0);

  const [items, setItems] = useState([]);
  const [allObj, setAllObj] = useState([]);
  //   console.log(allObj);

  const [viewOption, setViewOption] = useState(false);
  const [viewMultiple, setViewMultiple] = useState(false);
  const [viewText, setViewText] = useState(false);

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
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/getByIds/${id}`, {
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
          localStorage.removeItem("selOpt");
          setAppraisalName(result[0].name);
          setAppraiseeName(result[0].appraiseeName);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));

    setOpened(true);
    const orgIDs = data11.orgID;

    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/questions/gets/${orgIDs}/${id}`, {
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

        const questID = result[pageNo - 1].questionID;
        fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalQuestion/getByIds/${questID}`, {
          headers,
        })
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resultq) => {
            setOpened(false);
            if (resultq.message === "Expired Access") {
              navigate("/authentication/sign-in");
              window.location.reload();
            }
            if (resultq.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
              window.location.reload();
            }
            if (resultq.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
              window.location.reload();
            }
            if (isMounted) {
              setRLength(result.length);
              setItems(resultq);
              setQuestionID(resultq[0].question.id);
              setOrgID(resultq[0].question.orgID);
              setQuestion(resultq[0].question.question);
              setHint(resultq[0].question.hint);

              if (resultq[0].question.inputType === "Option") {
                setItems(resultq[0].options);
              } else if (resultq[0].question.inputType === "Multiple") {
                const anwerMap = [];
                // eslint-disable-next-line array-callback-return
                resultq[0].options.map((item) => {
                  const fdy = {
                    value: item.optionValue,
                    label: item.optionValue,
                  };
                  anwerMap.push(fdy);
                });
                setItems(anwerMap);
              }

              if (resultq[0].question.inputType === "Option") {
                setViewOption(true);
                setViewMultiple(false);
                setViewText(false);
              } else if (resultq[0].question.inputType === "Multiple") {
                setViewMultiple(true);
                setViewOption(false);
                setViewText(false);
              } else {
                setViewText(true);
                setViewMultiple(false);
                setViewOption(false);
              }
            }
          });
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFetchQuest = (tNum) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;

    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/questions/gets/${orgIDs}/${id}`, {
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
        const questID = result[tNum - 1].questionID;
        fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalQuestion/getByIds/${questID}`, {
          headers,
        })
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resultq) => {
            setOpened(false);
            if (resultq.message === "Expired Access") {
              navigate("/authentication/sign-in");
              window.location.reload();
            }
            if (resultq.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
              window.location.reload();
            }
            if (resultq.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
              window.location.reload();
            }
            setQuestionID(resultq[0].question.id);
            setOrgID(resultq[0].question.orgID);
            setQuestion(resultq[0].question.question);
            setHint(resultq[0].question.hint);

            if (resultq[0].question.inputType === "Option") {
              setItems(resultq[0].options);
            } else if (resultq[0].question.inputType === "Multiple") {
              const anwerMap = [];
              // eslint-disable-next-line array-callback-return
              resultq[0].options.map((item) => {
                const fdy = {
                  value: item.optionValue,
                  label: item.optionValue,
                };
                anwerMap.push(fdy);
              });
              setItems(anwerMap);
            }

            if (resultq[0].question.inputType === "Option") {
              setViewOption(true);
              setViewMultiple(false);
              setViewText(false);
            } else if (resultq[0].question.inputType === "Multiple") {
              setViewMultiple(true);
              setViewOption(false);
              setViewText(false);
            } else {
              setViewText(true);
              setViewMultiple(false);
              setViewOption(false);
            }
          });
      });
  };

  const handleOnChangeOption = (e) => {
    const opVal = e.target.value;
    setAnswer(opVal);
  };

  const handleOnSelect = (select) => {
    const ansA = [];
    // eslint-disable-next-line array-callback-return
    select.map((item) => {
      const fdy = item.value;
      ansA.push(fdy);
    });
    setAnswer(ansA);
  };

  const handleNext = () => {
    localStorage.removeItem("selOpt");
    const numberYu = 1;
    const tNum = pageNo + numberYu;
    if (pageNo <= rLength) {
      if (tNum <= rLength) {
        setQuestNo(tNum);
        setPageNo(tNum);
        handleFetchQuest(tNum);

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get("id");

        const data11 = JSON.parse(localStorage.getItem("user1"));

        const answery = answerx.toString();
        const personalIds = data11.personalID;
        const obj = {
          orgID: orgIDx,
          appraisalID: id,
          questionID: questionIDx,
          empID: personalIds,
          answer: answery,
        };
        //   if (answerx !== "") {
        //     if (allObj.length !== 0) {
        //       // eslint-disable-next-line array-callback-return
        //       allObj.map((objectx) => {
        //         console.log(objectx.questionID);
        //         if (questionIDx !== objectx.questionID) {
        //           setAllObj((list) => [...list, obj]);
        //         }
        //       });
        //     } else {
        //       setAllObj((list) => [...list, obj]);
        //     }
        //   }
        setAllObj((list) => [...list, obj]);
        setAnswer("");
      }
    }
    if (tNum > rLength) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get("id");

      const data11 = JSON.parse(localStorage.getItem("user1"));
      const answery = answerx.toString();
      const personalIds = data11.personalID;
      const obj = {
        orgID: orgIDx,
        appraisalID: id,
        questionID: questionIDx,
        empID: personalIds,
        answer: answery,
      };

      setAllObj((list) => [...list, obj]);
      setAnswer("");

      setShowCom(false);
      setShowF(true);
    }
  };

  const handleComplete = () => {
    const raw = JSON.stringify(allObj);
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraiserAnswer/save`, requestOptions)
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
          navigate("/dashboard", { replace: true });
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

  const handleChangeToForm = () => {
    setShowF(false);
  };

  return (
    <DashboardLayout>
      {/* { <DashboardNavbar />} */}
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          {showF ? (
            <MDBox mb={2} mt={3}>
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
                  {appraisalName}
                </MDTypography>
              </MDBox>
              <MDBox
                variant="gradient"
                bgColor="white"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={0}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography variant="h6" fontWeight="medium" color="text" mt={1}>
                  Appraisal For {appraiseeName}
                </MDTypography>
              </MDBox>
              <div align="center">
                {showCom ? (
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={handleChangeToForm}
                      color="info"
                      width="50%"
                    >
                      Start
                    </MDButton>
                  </MDBox>
                ) : (
                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" onClick={handleComplete} color="info" width="50%">
                      Complete
                    </MDButton>
                  </MDBox>
                )}
              </div>
            </MDBox>
          ) : (
            <MDBox component="form" role="form">
              <MDBox mb={0}>
                <Container>
                  <div className="row">
                    <div className="col-sm-12">
                      <Container>
                        <div className="row">
                          <div className="col-sm-4">
                            <MDBox
                              variant="gradient"
                              bgColor="info"
                              borderRadius="lg"
                              coloredShadow="info"
                              mx={2}
                              mt={-3}
                              p={2}
                              mb={1}
                              textAlign="left"
                            >
                              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                                Question {questNo}
                              </MDTypography>
                            </MDBox>
                          </div>
                        </div>
                      </Container>
                      <MDBox
                        variant="gradient"
                        bgColor="white"
                        borderRadius="lg"
                        coloredShadow="info"
                        mx={2}
                        mt={0}
                        p={2}
                        mb={1}
                        textAlign="center"
                      >
                        <MDTypography variant="h6" fontWeight="medium" color="text" mt={1}>
                          {questionx}
                        </MDTypography>
                      </MDBox>
                    </div>
                  </div>
                </Container>
              </MDBox>
              <MDBox mb={2}>
                <Container>
                  <div className="row">
                    <div className="col-sm-1" />
                    <div className="col-sm-11">
                      <MDTypography variant="h4" fontWeight="medium" fontSize="55%">
                        Hint: {hintx}
                      </MDTypography>
                    </div>
                  </div>
                </Container>
              </MDBox>
              <MDBox mb={2}>
                <Container>
                  <div className="row">
                    <div className="col-sm-4">
                      <MDBox
                        variant="gradient"
                        bgColor="info"
                        borderRadius="lg"
                        coloredShadow="info"
                        mx={5}
                        mt={2}
                        p={2}
                        mb={-1}
                        textAlign="left"
                      >
                        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                          Answer
                        </MDTypography>
                      </MDBox>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-8">
                      <MDBox textAlign="right">
                        {viewText ? (
                          <MDBox mb={2} mt={3}>
                            <Container>
                              <div className="row">
                                <div className="col-sm-12">
                                  <Form.Group
                                    className="mb-1"
                                    controlId="exampleForm.ControlTextarea1"
                                  >
                                    <Form.Control
                                      as="textarea"
                                      onChange={(e) => setAnswer(e.target.value)}
                                      rows={2}
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            </Container>
                          </MDBox>
                        ) : (
                          <MDBox mt={4} mb={1} />
                        )}
                        {viewOption ? (
                          <MDBox mb={2}>
                            <Container>
                              <div className="row">
                                <div className="col-sm-4">
                                  <FormControl>
                                    <RadioGroup
                                      aria-labelledby="demo-controlled-radio-buttons-group"
                                      name="controlled-radio-buttons-group"
                                      onChange={handleOnChangeOption}
                                    >
                                      {items.map((apis) => (
                                        <FormControlLabel
                                          key={apis.id}
                                          value={apis.optionValue}
                                          control={<Radio />}
                                          label={apis.optionValue}
                                        />
                                      ))}
                                    </RadioGroup>
                                  </FormControl>
                                </div>
                              </div>
                            </Container>
                          </MDBox>
                        ) : (
                          <MDBox mt={4} mb={1} />
                        )}
                        {viewMultiple ? (
                          <MDBox mb={2}>
                            <Container>
                              <div className="row">
                                <div className="col-sm-6">
                                  <Select
                                    closeMenuOnSelect
                                    components={animatedComponents}
                                    onChange={handleOnSelect}
                                    isMulti
                                    options={items}
                                  />
                                </div>
                              </div>
                            </Container>
                          </MDBox>
                        ) : (
                          <MDBox mt={4} mb={1} />
                        )}
                      </MDBox>
                    </div>
                  </div>
                </Container>

                <Container>
                  <div className="row">
                    <div className="col-sm-9" />
                    <div className="col-sm-3">
                      <MDBox mt={4} mb={1}>
                        <MDButton variant="gradient" onClick={handleNext} color="info" width="50%">
                          Next
                        </MDButton>
                      </MDBox>
                    </div>
                  </div>
                </Container>
              </MDBox>
            </MDBox>
          )}
        </MDBox>
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default AppraiseQandA;
