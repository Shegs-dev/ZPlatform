import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";

import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Form } from "react-bootstrap";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import "bootstrap/dist/css/bootstrap.min.css";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function AppraisalQuestion() {
  // const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [appraisalQuestions, setAppraisalQuestions] = useState([]);
  const [aQuestions, setAQuestions] = useState([]);
  const [appraisal, setAppraisal] = useState({});
  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handleOnClick = (e, apix) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const checks = e.target.checked;
    if (checks) {
      // const headers = miHeaders;
      const raw = JSON.stringify({
        orgID: orgIDs,
        questionID: apix.questionID,
        appraisalID: id,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/questions/add`, requestOptions)
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
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // const headers = miHeaders;
      const requestOptions = {
        method: "DELETE",
        headers: miHeaders,
      };

      fetch(
        `${process.env.REACT_APP_SHASHA_URL}/appraisal/questions/remove/${apix.id}`,
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
          console.log(resx);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/getByIds/${id}`, { headers })
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
        if (isMounted) {
          setAppraisal(result[0]);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;

    const questionsList = [];
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalQuestion/gets/${orgIDs}`, { headers })
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
          setQuestions(resultd);
        }

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get("id");

        fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/questions/gets/${orgIDs}/${id}`, {
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
              setAppraisalQuestions(resultrs);
            }

            // eslint-disable-next-line array-callback-return
            resultd.map((question) => {
              let check = false;
              let myID = null;
              if (resultrs != null) {
                // eslint-disable-next-line array-callback-return
                resultrs.map((aQues) => {
                  if (aQues.questionID === question.question.id) {
                    // if (rolPermi.isCheck === 1) {
                    myID = aQues.id;
                    check = true;
                    // }
                  }
                  // check = false;
                });
              }

              const pObj = {
                id: myID,
                questionID: question.question.id,
                question: question.question.question,
                isCheck: check,
              };

              questionsList.push(pObj);
            });
            setAQuestions(questionsList);
            console.log(questions);
            console.log(appraisalQuestions);
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
            <MDTypography variant="h4" fontWeight="medium" color="white" textAlign="center" mt={1}>
              {appraisal.name}
            </MDTypography>
          </MDBox>
          <MDBox pt={0} px={4}>
            &nbsp;
            <Form>
              {aQuestions.map((api) => (
                <div key={api.questionID} className="mb-3">
                  <Form.Check type="checkbox">
                    <Form.Check.Input
                      type="checkbox"
                      defaultChecked={api.isCheck}
                      onClick={(e) => handleOnClick(e, api)}
                    />
                    <Form.Check.Label>{api.question}</Form.Check.Label>
                  </Form.Check>
                </div>
              ))}
            </Form>
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default AppraisalQuestion;
