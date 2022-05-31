import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { Container, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "bootstrap/dist/css/bootstrap.min.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

function ViewUser() {
  const [fnamex, setFname] = useState("");
  const [lnamex, setLname] = useState("");
  const [onamex, setOname] = useState("");
  const [emailx, setEmail] = useState("");
  const [phonex, setPhone] = useState("");
  const [nationalityx, setNationality] = useState("");
  const [residentialStreetx, setResidentialStreet] = useState("");
  const [residentialCityx, setResidentialCity] = useState("");
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const [maritalStatusx, setMaritalStatus] = useState("");

  const [nkFnamex, setNkFname] = useState("");
  const [nkLnamex, setNkLname] = useState("");
  const [nkOnamex, setNkOname] = useState("");
  const [nkEmailx, setNKEmail] = useState("");
  const [nkPhonex, setNkPhone] = useState("");
  const [nkTitlex, setNkTitle] = useState("");
  const [nkResidentialStreetx, setNkResidentialStreet] = useState("");
  const [nkResidentialCityx, setNkResidentialCity] = useState("");
  const [nkResidentialStatex, setNkResidentialState] = useState("");
  const [nkResidentialCountryx, setNkResidentialCountry] = useState("");
  const [nkOccupationx, setNkOccupation] = useState("");

  const [startDate, setStartDate] = useState(new Date());

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [baBankx, setBaBank] = useState("");
  const [baCountryx, setBaCountry] = useState("");
  const [baAcctNox, setBaAcctNo] = useState("");
  const [baAcctNamex, setBaAcctName] = useState("");

  const [maNoOfSpousesx, setMaNoOfSpouses] = useState("");
  const [maNoOfChildrenx, setMaNoOfChildren] = useState("");
  // From d modals
  const [department, setDepartment] = useState([]);
  const [companyRole, setCompanyRole] = useState([]);
  const [position, setPosition] = useState([]);
  const [branch, setBranch] = useState([]);
  const [stepsss, setStep] = useState([]);
  const [status, setStatus] = useState([]);
  const [statusmap, setStatusmap] = useState([]);
  // medical
  const [meBloodGroupx, setMeBloodGroup] = useState("");
  const [meGenotypex, setMeGenotype] = useState("");
  // onChange const
  const [departx, setDepartx] = useState("");
  const [companyx, setCompanyx] = useState("");
  const [positx, setPositx] = useState("");
  const [branx, setBranx] = useState("");
  const [stepx, stepStepx] = useState("");
  const [statusx, setStatusx] = useState("");

  const [opened, setOpened] = useState(false);

  const MySwal = withReactContent(Swal);

  // save all changes
  const handleOfficeSave = () => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const raw = JSON.stringify({
      orgID: orgIDs,
      empID: id,
      positionID: positx,
      roleID: companyx,
      branchID: branx,
      deptID: departx,
      stepID: stepx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/office/update`, requestOptions)
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

  useEffect(() => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const headers = miHeaders;
    let isMounted = true;
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

                      fetch(`${process.env.REACT_APP_KUBU_URL}/position/gets/${orgIDs}`, {
                        headers,
                      })
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

                            fetch(`${process.env.REACT_APP_ZAVE_URL}/office/getForEmployee/${id}`, {
                              headers,
                            })
                              .then(async (res) => {
                                const aToken = res.headers.get("token-1");
                                localStorage.setItem("rexxdex", aToken);
                                return res.json();
                              })
                              .then((result) => {
                                setOpened(false);
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
                                  // Setting Branch
                                  if (result.length > 0) {
                                    if (result[0].branchID != null) {
                                      let fBranch = {};
                                      // eslint-disable-next-line array-callback-return
                                      resultx.map((item) => {
                                        if (item.id === result[0].branchID) {
                                          // eslint-disable-next-line prefer-destructuring
                                          fBranch = item;
                                          setBranx(fBranch.id);
                                        }
                                      });
                                    }

                                    if (result[0].deptID != null) {
                                      let fDepartment = {};
                                      // eslint-disable-next-line array-callback-return
                                      resultd.map((item) => {
                                        if (item.id === result[0].deptID) {
                                          // eslint-disable-next-line prefer-destructuring
                                          fDepartment = item;
                                          setDepartx(fDepartment.id);
                                        }
                                      });
                                    }

                                    if (result[0].positionID != null) {
                                      let fPosition = {};
                                      // eslint-disable-next-line array-callback-return
                                      resultp.map((item) => {
                                        if (item.id === result[0].positionID) {
                                          // eslint-disable-next-line prefer-destructuring
                                          fPosition = item;
                                          setPositx(fPosition.id);
                                        }
                                      });
                                    }

                                    if (result[0].roleID != null) {
                                      let fCompanyRole = {};
                                      // eslint-disable-next-line array-callback-return
                                      resultr.map((item) => {
                                        if (item.id === result[0].roleID) {
                                          // eslint-disable-next-line prefer-destructuring
                                          fCompanyRole = item;
                                          setCompanyx(fCompanyRole.id);

                                          fetch(
                                            `${process.env.REACT_APP_KUBU_URL}/rolestep/gets/${orgIDs}/${fCompanyRole.id}`,
                                            { headers }
                                          )
                                            .then(async (res) => {
                                              const aToken = res.headers.get("token-1");
                                              localStorage.setItem("rexxdex", aToken);
                                              return res.json();
                                            })
                                            .then((resultst) => {
                                              if (resultst.message === "Expired Access") {
                                                navigate("/authentication/sign-in");
                                              }
                                              if (resultst.message === "Token Does Not Exist") {
                                                navigate("/authentication/sign-in");
                                              }
                                              if (resultst.message === "Unauthorized Access") {
                                                navigate("/authentication/forbiddenPage");
                                              }
                                              if (isMounted) {
                                                setStep(resultst.steps);

                                                if (result[0].stepID != null) {
                                                  // eslint-disable-next-line array-callback-return
                                                  resultst.steps.map((sitem) => {
                                                    if (sitem.id === result[0].stepID) {
                                                      // eslint-disable-next-line prefer-destructuring
                                                      stepStepx(sitem.id);
                                                    }
                                                  });
                                                }
                                              }
                                            });
                                        }
                                      });

                                      // fetch(
                                      //   `${process.env.REACT_APP_KUBU_URL}/rolestep/gets/${orgIDs}/${result[0].roleID}`,
                                      //   { headers }
                                      // )
                                      //   .then(async (res) => {
                                      //     const aToken = res.headers.get("token-1");
                                      //     localStorage.setItem("rexxdex", aToken);
                                      //     return res.json();
                                      //   })
                                      //   .then((resultst) => {
                                      //     if (resultst.message === "Expired Access") {
                                      //       navigate("/authentication/sign-in");
                                      //     }
                                      //     if (resultst.message === "Token Does Not Exist") {
                                      //       navigate("/authentication/sign-in");
                                      //     }
                                      //     if (resultst.message === "Unauthorized Access") {
                                      //       navigate("/authentication/forbiddenPage");
                                      //     }
                                      //     if (isMounted) {
                                      //       setStep(resultst.steps);
                                      //       console.log(resultst);

                                      //       if (result[0].stepID != null) {
                                      //         // let fStep = {};
                                      //         // eslint-disable-next-line array-callback-return
                                      //         resultst.steps.map((item) => {
                                      //           if (item.id === result[0].stepID) {
                                      //             // eslint-disable-next-line prefer-destructuring
                                      //             // fStep = item;
                                      //             console.log(item);
                                      //             // stepStepx(fStep.id);
                                      //           }
                                      //         });
                                      //       }
                                      //     }
                                      //   });
                                    }
                                  }
                                }
                              });
                          }
                        });
                    }
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
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const idVal = JSON.parse([id]);
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/personalcompany/getByPersonalID/${orgIDs}/${idVal}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultp) => {
        setOpened(false);
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
          setStatusx(resultp.statusID);
          setStatus(resultp);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/status/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultp) => {
        setOpened(false);
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
          setStatusmap(resultp);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleGetPersonalID = () => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const idVal = JSON.parse([id]);
    const raw = JSON.stringify({
      id: status.id,
      orgID: orgIDs,
      personalID: idVal,
      roleID: status.roleID,
      email: status.email,
      staffID: status.staffID,
      statusID: statusx,
      reasonForDelete: status.reasonForDelete,
      deleteFlag: status.deleteFlag,
      createdTime: status.createdTime,
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

  useEffect(() => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const idVal = JSON.parse([id]);
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/get/${idVal}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultp) => {
        setOpened(false);
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
          setFname(resultp[0].fname);
          setLname(resultp[0].lname);
          setOname(resultp[0].oname);
          setEmail(resultp[0].email);
          setPhone(resultp[0].pno);
          setNationality(resultp[0].nationality);
          setResidentialStreet(resultp[0].residentialStreet);
          setResidentialCity(resultp[0].residentialCity);
          setResidentialState(resultp[0].residentialState);
          setResidentialCountry(resultp[0].residentialCountry);
          setMaritalStatus(resultp[0].maritalStatus);

          setStartDate(
            new Date(
              `${resultp[0].monthOfBirth}/${resultp[0].dayOfBirth}/${resultp[0].yearOfBirth}`
            )
          );
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIds = data11.personalID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/medical/getForEmployee/${personalIds}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultma) => {
        setOpened(false);
        if (resultma.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultma.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultma.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          // eslint-disable-next-line eqeqeq
          if (resultma.length != 0) {
            setMeBloodGroup(resultma[0].bloodGroup);
            setMeGenotype(resultma[0].genotype);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIds = data11.personalID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/nextofkin/getForEmployee/${personalIds}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultnk) => {
        setOpened(false);
        if (resultnk.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultnk.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultnk.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          if (resultnk.length !== 0) {
            setNkFname(resultnk[0].fname);
            setNkLname(resultnk[0].lname);
            setNkOname(resultnk[0].oname);
            setNKEmail(resultnk[0].email);
            setNkPhone(resultnk[0].pno);
            setNkTitle(resultnk[0].title);
            setNkResidentialStreet(resultnk[0].residentialStreet);
            setNkResidentialCity(resultnk[0].residentialCity);
            setNkResidentialState(resultnk[0].residentialState);
            setNkResidentialCountry(resultnk[0].residentialCountry);
            setNkOccupation(resultnk[0].occupation);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/bankaccount/getForEmployee/${id}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultba) => {
        setOpened(false);
        if (resultba.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultba.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultba.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          // eslint-disable-next-line eqeqeq
          if (resultba.length != 0) {
            setBaBank(resultba[0].bank);
            setBaCountry(resultba[0].country);
            setBaAcctNo(resultba[0].acctNo);
            setBaAcctName(resultba[0].acctName);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRoleSteps = (e) => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    setCompanyx(e.target.value);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_KUBU_URL}/rolestep/gets/${orgIDs}/${e.target.value}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultst) => {
        setOpened(false);
        if (resultst.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultst.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultst.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        console.log(resultst);
        if (resultst.steps !== null) {
          setStep(resultst.steps);
        } else {
          setStep([]);
        }
      });
  };

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
                    BASIC INFO
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="First Name"
                          disabled
                          value={fnamex || ""}
                          onChange={(e) => setFname(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Last Name"
                          disabled
                          value={lnamex || ""}
                          onChange={(e) => setLname(e.target.value)}
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
                      <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Other Name"
                          disabled
                          value={onamex || ""}
                          onChange={(e) => setOname(e.target.value)}
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
                      <div className="col-sm-8">
                        <MDInput
                          type="email"
                          label="Personal Email"
                          disabled
                          value={emailx || ""}
                          onChange={(e) => setEmail(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <MDBox mb={2} mx={0}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-8">
                        <MDInput
                          type="number"
                          label="Phone Number"
                          disabled
                          value={phonex || ""}
                          onChange={(e) => setPhone(e.target.value)}
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
                      <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Marital Status"
                          disabled
                          value={maritalStatusx || ""}
                          onChange={(e) => setMaritalStatus(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <Container>
                  <div className="row">
                    <div className="col-sm-8">
                      <MDBox mb={0} mt={0} textAlign="left">
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          color="text"
                          mt={1}
                          textAlign="left"
                        >
                          Date Of Birth
                        </MDTypography>
                      </MDBox>
                      <MDBox mb={4} mt={0} textAlign="left">
                        <div>
                          <style>
                            {`.date-picker input {
                              width: 50%
                              align: left
                            }`}
                          </style>
                          <DatePicker
                            date={startDate}
                            wrapperClassName="date-picker"
                            placeholder="Select Birth Date"
                            disabled
                            dateFormat="MM/dd/yyyy"
                            confirmBtnText="Confirm"
                            showCancelButton="true"
                            customStyles={{
                              placeholderText: {
                                fontSize: 5,
                              },
                              dateIcon: {
                                height: 0,
                                width: 0,
                              },
                              dateText: {
                                color: "#b3b4b5",
                                fontSize: 16,
                              },
                              dateInput: {
                                borderWidth: 0,
                              },
                            }}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                          />
                        </div>
                      </MDBox>
                    </div>
                  </div>
                </Container>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Nationality"
                          disabled
                          value={nationalityx || ""}
                          onChange={(e) => setNationality(e.target.value)}
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
                      <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Street"
                          disabled
                          value={residentialStreetx || ""}
                          onChange={(e) => setResidentialStreet(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                      <div className="col-sm-4">
                        <MDInput
                          type="text"
                          label="City"
                          disabled
                          value={residentialCityx || ""}
                          onChange={(e) => setResidentialCity(e.target.value)}
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
                          label="State"
                          disabled
                          value={residentialStatex || ""}
                          onChange={(e) => setResidentialState(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>

                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Country"
                          disabled
                          value={residentialCountryx || ""}
                          onChange={(e) => setResidentialCountry(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
          &nbsp;
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="success"
                  mx={2}
                  mt={-6}
                  p={2}
                  mb={5}
                  textAlign="center"
                >
                  <MDTypography
                    variant="h4"
                    fontWeight="medium"
                    color="white"
                    textAlign="center"
                    mt={1}
                  >
                    Bank Account
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Bank Name"
                          disabled
                          value={baBankx || ""}
                          onChange={(e) => setBaBank(e.target.value)}
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
                      <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Country"
                          disabled
                          value={baCountryx || ""}
                          onChange={(e) => setBaCountry(e.target.value)}
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
                      <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Account Number"
                          disabled
                          value={baAcctNox || ""}
                          onChange={(e) => setBaAcctNo(e.target.value)}
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
                      <div className="col-sm-8">
                        <MDInput
                          type="email"
                          label="Account Name"
                          disabled
                          value={baAcctNamex || ""}
                          onChange={(e) => setBaAcctName(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
          &nbsp;
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="success"
                  mx={2}
                  mt={-6}
                  p={2}
                  mb={7}
                  textAlign="center"
                >
                  <MDTypography
                    variant="h4"
                    fontWeight="medium"
                    color="white"
                    textAlign="center"
                    mt={1}
                  >
                    Medical
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Blood Group"
                          value={meBloodGroupx || ""}
                          onChange={(e) => setMeBloodGroup(e.target.value)}
                          disabled
                          variant="standard"
                          fullWidth
                        />
                      </div>
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Genotype"
                          value={meGenotypex || ""}
                          onChange={(e) => setMeGenotype(e.target.value)}
                          disabled
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
          &nbsp;
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="success"
                  mx={2}
                  mt={-6}
                  p={2}
                  mb={7}
                  textAlign="center"
                >
                  <MDTypography
                    variant="h4"
                    fontWeight="medium"
                    color="white"
                    textAlign="center"
                    mt={1}
                  >
                    Marital
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Number Of Spouses"
                          disabled
                          value={maNoOfSpousesx || ""}
                          onChange={(e) => setMaNoOfSpouses(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Number Of Children"
                          disabled
                          value={maNoOfChildrenx || ""}
                          onChange={(e) => setMaNoOfChildren(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
          &nbsp;
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="success"
                  mx={2}
                  mt={-6}
                  p={2}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography
                    variant="h4"
                    fontWeight="medium"
                    color="white"
                    textAlign="center"
                    mt={1}
                  >
                    Next Of Kin
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="First Name"
                          disabled
                          value={nkFnamex || ""}
                          onChange={(e) => setNkFname(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Last Name"
                          value={nkLnamex || ""}
                          disabled
                          onChange={(e) => setNkLname(e.target.value)}
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
                      <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Other Name"
                          value={nkOnamex || ""}
                          disabled
                          onChange={(e) => setNkOname(e.target.value)}
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
                      <div className="col-sm-8">
                        <MDInput
                          type="email"
                          label="Email"
                          value={nkEmailx || ""}
                          disabled
                          onChange={(e) => setNKEmail(e.target.value)}
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
                      <div className="col-sm-8">
                        <MDTypography variant="button" fontWeight="regular" color="text">
                          Phone Number
                        </MDTypography>
                        <MDInput
                          type="text"
                          label="Phone Number"
                          value={nkPhonex || ""}
                          disabled
                          onChange={(e) => setNkPhone(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <Container>
                  <div className="row">
                    <div className="col-sm-6">
                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          label="Title"
                          value={nkTitlex || ""}
                          disabled
                          onChange={(e) => setNkTitle(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </MDBox>
                    </div>
                  </div>
                </Container>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Street"
                          value={nkResidentialStreetx || ""}
                          disabled
                          onChange={(e) => setNkResidentialStreet(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                      <div className="col-sm-4">
                        <MDInput
                          type="text"
                          label="City"
                          value={nkResidentialCityx || ""}
                          disabled
                          onChange={(e) => setNkResidentialCity(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <MDBox mb={2}>
                  <MDBox mb={2}>
                    <Container>
                      <div className="row">
                        <div className="col-sm-8">
                          <MDInput
                            type="email"
                            label="Country"
                            disabled
                            value={nkResidentialCountryx || ""}
                            onChange={(e) => setNkResidentialCountry(e.target.value)}
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
                        <div className="col-sm-8">
                          <MDInput
                            type="email"
                            label="State"
                            disabled
                            value={nkResidentialStatex || ""}
                            onChange={(e) => setNkResidentialState(e.target.value)}
                            variant="standard"
                            fullWidth
                          />
                        </div>
                      </div>
                    </Container>
                  </MDBox>
                </MDBox>
                <Container>
                  <div className="row">
                    <div className="col-sm-8">
                      <MDBox mb={2}>
                        <MDInput
                          type="email"
                          label="Occupation"
                          value={nkOccupationx || ""}
                          disabled
                          onChange={(e) => setNkOccupation(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </MDBox>
                    </div>
                  </div>
                </Container>
              </MDBox>
            </MDBox>
          </Card>
          &nbsp;
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
                    OFFICE
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <MDBox mx={4} textAlign="left">
                      <Form.Select
                        value={departx || ""}
                        onChange={(e) => setDepartx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Add Users To Company Departments</option>
                        {department.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                    <MDBox mx={4} textAlign="left">
                      <Form.Select
                        value={companyx || ""}
                        onChange={handleRoleSteps}
                        // onChange={(e) => setCompanyx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Add Users To Company Roles</option>
                        {companyRole.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                    <MDBox mx={4} textAlign="left">
                      <Form.Select
                        value={positx || ""}
                        onChange={(e) => setPositx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Add Users To Company Position</option>
                        {position.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                    <MDBox mx={4} textAlign="left">
                      <Form.Select
                        value={branx || ""}
                        onChange={(e) => setBranx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Add Users To Company Branch</option>
                        {branch.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                    <MDBox mx={4} textAlign="left">
                      <Form.Select
                        value={stepx || ""}
                        onChange={(e) => stepStepx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Add Users To Company Steps</option>
                        {stepsss.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                    <Button variant="primary" onClick={handleOfficeSave}>
                      Save Changes
                    </Button>
                  </Container>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
          &nbsp;
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
                    Status
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <MDBox mx={4} textAlign="left">
                      <Form.Select
                        value={statusx || ""}
                        onChange={(e) => setStatusx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Add Status Type</option>
                        {statusmap.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                    <Button variant="primary" onClick={handleGetPersonalID}>
                      Save Changes
                    </Button>
                  </Container>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </div>
      </div>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default ViewUser;
