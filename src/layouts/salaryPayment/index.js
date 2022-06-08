/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function SalaryPayment() {
  const MySwal = withReactContent(Swal);

  const animatedComponents = makeAnimated();

  const [namex, setName] = useState("");
  const [descripx, setDescrip] = useState("");

  const [items, setItems] = useState([]);

  const [sUser, setSUser] = useState([]);
  const [aUser, setAUser] = useState([]);

  const [allUserID, setAllUserID] = useState([]);
  const [usersID, setUsersID] = useState([]);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    if (timestamp === 0) {
      return "No Date";
      // eslint-disable-next-line no-else-return
    } else {
      const date = new Date(timestamp);
      const retDate = date.toDateString();
      return retDate;
    }
  };

  useEffect(() => {
    const userMap = [];
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
          // eslint-disable-next-line array-callback-return
          result.map((item) => {
            const fdy = {
              value: item.personal.id,
              label: `${item.personal.fname} ${item.personal.lname}`,
            };
            console.log(fdy);
            userMap.push(fdy);
          });
          setAUser(userMap);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // useEffect(() => {
  //   const userMap = [];
  //   setOpened(true);
  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgIDs = data11.orgID;

  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_TANTA_URL}/payroll/gets/${orgIDs}`, { headers })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       setOpened(false);
  //       if (result.message === "Expired Access") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Token Does Not Exist") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Unauthorized Access") {
  //         navigate("/authentication/forbiddenPage");
  //         window.location.reload();
  //       }
  //       if (isMounted) {
  //         console.log(result);
  //         // eslint-disable-next-line array-callback-return
  //         result.map((item) => {
  //           const fdy = {
  //             value: item.remuneration.id,
  //             label: item.empName,
  //           };
  //           console.log(fdy);
  //           userMap.push(fdy);
  //         });
  //         setSUser(userMap);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // Method to fetch all departments
  // env.environments
  const handleGets = () => {
    setOpened(true);
    const userMap = [];
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    fetch(`${process.env.REACT_APP_TANTA_URL}/payroll/gets/${orgIDs}`, { headers })
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
        setOpened(false);
        setItems(result);
        // eslint-disable-next-line array-callback-return
        result.map((item) => {
          const fdy = {
            value: item.remuneration.id,
            label: item.empName,
          };
          console.log(fdy);
          userMap.push(fdy);
        });
        setSUser(userMap);
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      // fetches the table data
      handleGets();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      ids: allUserID,
      generatedBy: personalIDs,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_TANTA_URL}/payroll/create`, requestOptions)
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
        }
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        });
        // fetches the table data
        handleGets();
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

  const handleAllCal = (e) => {
    e.preventDefault();

    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;

    fetch(`${process.env.REACT_APP_TANTA_URL}/payroll/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultS) => {
        if (resultS.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (resultS.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (resultS.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        const userIDsMap = [];
        // eslint-disable-next-line array-callback-return
        resultS.map((item) => {
          const fdy = item.remuneration.id;
          console.log(fdy);
          userIDsMap.push(fdy);
        });
        console.log(userIDsMap);

        const raw = JSON.stringify({
          orgID: orgIDs,
          ids: userIDsMap,
          generatedBy: personalIDs,
        });
        console.log(raw);
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        fetch(`${process.env.REACT_APP_TANTA_URL}/payroll/create`, requestOptions)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((result) => {
            console.log(result);
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
            // fetches the table data
            handleGets();
          })
          .catch((error) => {
            setOpened(false);
            MySwal.fire({
              title: error.status,
              type: "error",
              text: error.message,
            });
          });
      });
  };

  // Method to change type
  const changeType = (status) => {
    if (status === 1) {
      return "Initiated";
      // eslint-disable-next-line no-else-return
    } else if (status === 2) {
      return "Paid";
    } else if (status === 3) {
      return "Payment Error";
    } else {
      return "Created";
    }
  };

  const pColumns = [
    { Header: "Employee's Name", accessor: "empName", align: "left" },
    { Header: "Amount (NGN)", accessor: "remuneration.amount", align: "left" },
    { Header: "Updated Amount (NGN)", accessor: "payroll.amount", align: "left" },
    { Header: "Generated By", accessor: "payroll.generatedByName", align: "left" },
    {
      Header: "Payment Status",
      accessor: "payroll.paymentStatus",
      Cell: ({ cell: { value } }) => changeType(value),
      align: "left",
    },
    { Header: "Last Retried By", accessor: "payroll.lastRetryByName", align: "left" },
    { Header: "Retried Times", accessor: "payroll.retryTimes", align: "left" },
    {
      Header: "Last Retried Time",
      accessor: "payroll.lastRetryTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    { Header: "Terminated By", accessor: "payroll.terminatedByName", align: "left" },
    {
      Header: "Terminated Time",
      accessor: "payroll.terminatedTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
  ];

  const handleOnSelect = (select) => {
    const userIDs = [];
    // eslint-disable-next-line array-callback-return
    select.map((item) => {
      const fdy = item.value;
      console.log(fdy);
      userIDs.push(fdy);
    });
    setAllUserID(userIDs);
    console.log(select);
    console.log(userIDs);
  };

  const handleAllSelect = (select) => {
    const userIDs = [];
    // eslint-disable-next-line array-callback-return
    select.map((item) => {
      const fdy = item.value;
      console.log(fdy);
      userIDs.push(fdy);
    });
    setUsersID(userIDs);
    console.log(select);
    console.log(userIDs);
  };

  const handleInitiatePay = (e) => {
    if (namex === "") {
      MySwal.fire({
        title: "EMPTY_TITLE",
        type: "error",
        text: "Please input a title",
      });
    } else {
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const personalIDs = data11.personalID;

      const userMap = [];
      // eslint-disable-next-line array-callback-return
      items.map((item) => {
        if (item.payroll !== null) {
          if (item.bankAccount !== null) {
            const fdy = {
              payrollID: item.payroll.id,
              destinationBankCode: item.bankAccount.bankCode,
              destinationAccountNumber: item.bankAccount.acctNo,
            };
            console.log(fdy);
            userMap.push(fdy);
          }
        }
      });
      console.log(userMap);

      const raw = JSON.stringify({
        paymentList: userMap,
        orgID: orgIDs,
        title: namex,
        narration: descripx,
        by: personalIDs,
      });
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(
        `${process.env.REACT_APP_TANTA_URL}/payroll/initiateSalaryPayment/${personalIDs}`,
        requestOptions
      )
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
    }
  };

  const handleRetryPayment = (e) => {
    if (namex === "") {
      MySwal.fire({
        title: "EMPTY_TITLE",
        type: "error",
        text: "Please input a title",
      });
    } else {
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const personalIDs = data11.personalID;

      const userMap = [];
      // eslint-disable-next-line array-callback-return
      items.map((item) => {
        // eslint-disable-next-line array-callback-return
        usersID.map((ids) => {
          if (item.payroll !== null) {
            if (item.bankAccount !== null) {
              if (ids === item.payroll.empID) {
                const fdy = {
                  payrollID: item.payroll.id,
                  destinationBankCode: item.bankAccount.bankCode,
                  destinationAccountNumber: item.bankAccount.acctNo,
                };
                console.log(fdy);
                userMap.push(fdy);
              }
            }
          }
        });
      });
      console.log(userMap);

      const raw = JSON.stringify({
        paymentList: userMap,
        orgID: orgIDs,
        title: namex,
        narration: descripx,
        by: personalIDs,
      });
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_TANTA_URL}/payroll/retrySalaryPayment`, requestOptions)
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
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container>
        <Card>
          <MDBox pt={4} pb={3} px={30}>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={1}
              mt={2}
              p={2}
              mb={1}
              textAlign="left"
            >
              <MDTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                textAlign="center"
                mt={1}
              >
                Calculate Bonus and Deduction
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
              <MDBox mb={2}>
                <Container>
                  <div align="center">
                    {" "}
                    <div className="row">
                      <div className="col-sm-12">
                        <MDBox mt={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            fontSize="80%"
                            align="left"
                            color="text"
                          >
                            Select User
                          </MDTypography>
                          <Select
                            closeMenuOnSelect
                            components={animatedComponents}
                            onChange={handleOnSelect}
                            isMulti
                            options={sUser}
                          />
                        </MDBox>
                      </div>
                    </div>
                    <MDBox
                      variant="gradient"
                      bgColor="white"
                      borderRadius="lg"
                      coloredShadow="info"
                      mx={-20}
                      mt={3}
                      p={2}
                      mb={1}
                      textAlign="center"
                    >
                      <MDBox mt={4} mb={1}>
                        <MDButton
                          variant="gradient"
                          onClick={handleClick}
                          color="info"
                          width="50%"
                          ml={10}
                        >
                          Calculate Selected Users
                        </MDButton>
                        <MDButton variant="text" size="small" color="info" width="50%">
                          OR
                        </MDButton>
                        <MDButton
                          variant="gradient"
                          onClick={handleAllCal}
                          color="info"
                          width="50%"
                        >
                          calculate All Users
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </div>
                </Container>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
        &nbsp;
        <Card>
          <MDBox pt={4} pb={3} px={30}>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={1}
              mt={2}
              p={2}
              mb={1}
              textAlign="left"
            >
              <MDTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                textAlign="center"
                mt={1}
              >
                Initiate Payment
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
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Title *"
                  value={namex || ""}
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  value={descripx || ""}
                  onChange={(e) => setDescrip(e.target.value)}
                  label="Narration"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <Container>
                  <div align="center">
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        onClick={handleInitiatePay}
                        color="info"
                        width="50%"
                      >
                        Initiate
                      </MDButton>
                    </MDBox>
                  </div>
                </Container>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
        &nbsp;
        <Card>
          <MDBox pt={4} pb={3} px={30}>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={1}
              mt={2}
              p={2}
              mb={1}
              textAlign="left"
            >
              <MDTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                textAlign="center"
                mt={1}
              >
                Retry Payment
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
              <MDBox mb={2}>
                <MDBox mb={0}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Title *"
                          value={namex || ""}
                          className="form-control"
                          onChange={(e) => setName(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          value={descripx || ""}
                          onChange={(e) => setDescrip(e.target.value)}
                          label="Narration"
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <Container>
                  <div align="center">
                    {" "}
                    <div className="row">
                      <div className="col-sm-12">
                        <MDBox mt={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            fontSize="80%"
                            align="left"
                            color="text"
                          >
                            Select User
                          </MDTypography>
                          <Select
                            closeMenuOnSelect
                            components={animatedComponents}
                            onChange={handleAllSelect}
                            isMulti
                            options={aUser}
                          />
                        </MDBox>
                      </div>
                    </div>
                    <MDBox mb={2}>
                      <Container>
                        <div align="center">
                          <MDBox mt={4} mb={1}>
                            <MDButton
                              variant="gradient"
                              onClick={handleRetryPayment}
                              color="info"
                              width="50%"
                            >
                              <span className="material-icons">refresh</span> &nbsp; Retry
                            </MDButton>
                          </MDBox>
                        </div>
                      </Container>
                    </MDBox>
                  </div>
                </Container>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
        &nbsp;
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
      </Container>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default SalaryPayment;
