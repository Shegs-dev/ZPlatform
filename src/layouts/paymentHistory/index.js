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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { MonnifyConsumer } from "react-monnify";

function PaymentHis() {
  const MySwal = withReactContent(Swal);

  const [namex, setName] = useState("");
  const [emailx, setEmail] = useState("");
  const [descripx, setDescripx] = useState("");
  const [currencyx, setCurrency] = useState("NGN");
  const [amountx, setAmountx] = useState(0);
  const [comBalance, setComBalance] = useState("");
  const [pnox, setPno] = useState("");
  const [bonusCheck, setBonusCheck] = useState([]);
  const [referenceSKey, setReferenceSKey] = useState();
  const [bonusSetID, setBonusSetID] = useState([]);

  const [checkedEmail, setCheckedEmail] = useState("");
  const [checkedName, setCheckedName] = useState("");
  const [checkedCity, setCheckedCity] = useState("");
  const [enabled, setEnabled] = useState("");

  const [items, setItems] = useState([]);
  const [auditSDate, setAuditSDate] = useState("");
  const [auditEDate, setAuditEDate] = useState("");

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };
  const bonusStatus = "0";
  const concaBalance = `NGN ${+" " + comBalance}`;
  useEffect(() => {
    setOpened(true);

    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/paymentHistory/getBalance/${orgIDs}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultapi) => {
        console.log(resultapi);
        setOpened(false);
        if (resultapi.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultapi.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultapi.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          if (resultapi.length === 0) {
            setComBalance(0);
          } else {
            setComBalance(resultapi.balance);
          }
        }
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setReferenceSKey(`${Math.floor(Math.random() * 1000000000 + 1)}`);

    setOpened(true);
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/bonusSetting/getByStatus/${bonusStatus}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultapi) => {
        setOpened(false);
        if (resultapi.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultapi.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultapi.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          setBonusCheck(resultapi);
        }
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
    return () => {
      isMounted = false;
    };
  }, []);

  //   const honComplete = (response) => {
  //     setReferenceSKey(`${Math.floor(Math.random() * 1000000000 + 1)}`);

  //     console.log(response); // card charged successfully, get reference here
  //     if (response.paymentStatus === "PAID" && response.status === "SUCCESS") {
  //       setOpened(true);
  //       const data11 = JSON.parse(localStorage.getItem("user1"));
  //       //   bonusAmount: 10
  //       //   createdTime: 1649875827073
  //       //   deleteFlag: 0
  //       //   endTime: 1651104000000
  //       //   id: "62571b73813e040d304c13fd"
  //       //   maxTrigger: 6000
  //       //   minTrigger: 2000
  //       //   name: "Test Freebie"
  //       //   startTime: 1649894400000
  //       //   status: 0
  //       let allPayandBonus = 0;
  //       let mBonusAmount = 0;
  //       // eslint-disable-next-line radix
  //       const amountCOn = parseInt(amountx);
  //       // eslint-disable-next-line array-callback-return
  //       bonusCheck.map((checkBonus) => {
  //         if (checkBonus.minTrigger <= amountCOn && checkBonus.maxTrigger >= amountCOn) {
  //           mBonusAmount = checkBonus.bonusAmount;
  //           allPayandBonus = checkBonus.bonusAmount + amountCOn;
  //         } else if (checkBonus.minTrigger === 0 && checkBonus.maxTrigger >= amountCOn) {
  //           mBonusAmount = checkBonus.bonusAmount;
  //           allPayandBonus = checkBonus.bonusAmount + amountCOn;
  //         } else if (checkBonus.minTrigger <= amountCOn && checkBonus.maxTrigger === 0) {
  //           mBonusAmount = checkBonus.bonusAmount;
  //           allPayandBonus = checkBonus.bonusAmount + amountCOn;
  //         } else {
  //           mBonusAmount = 0;
  //           allPayandBonus = amountCOn;
  //         }
  //         // check = false;
  //       });
  //       const orgIDs = data11.orgID;
  //       const raw = JSON.stringify({
  //         orgID: orgIDs,
  //         paidAmount: amountCOn,
  //         bonusAmount: mBonusAmount,
  //         totalAmount: allPayandBonus,
  //       });
  //       const requestOptions = {
  //         method: "POST",
  //         headers: myHeaders,
  //         body: raw,
  //         redirect: "follow",
  //       };
  //       console.log(raw);
  //       fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/paymentHistory/add`, requestOptions)
  //         .then(async (res) => {
  //           const aToken = res.headers.get("token-1");
  //           localStorage.setItem("rexxdex", aToken);
  //           return res.json();
  //         })
  //         .then((result) => {
  //           if (result.message === "Expired Access") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (result.message === "Token Does Not Exist") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (result.message === "Unauthorized Access") {
  //             navigate("/authentication/forbiddenPage");
  //           }
  //           setOpened(false);
  //           MySwal.fire({
  //             title: result.status,
  //             type: "success",
  //             text: result.message,
  //           }).then(() => {
  //             window.location.reload();
  //           });
  //         })
  //         .catch((error) => {
  //           setOpened(false);
  //           MySwal.fire({
  //             title: error.status,
  //             type: "error",
  //             text: error.message,
  //           });
  //         });
  //     }
  //   };

  const honClose = (response) => {
    setReferenceSKey(`${Math.floor(Math.random() * 1000000000 + 1)}`);

    if (response.paymentStatus === "PAID" && response.status === "SUCCESS") {
      setOpened(true);

      let allPayandBonus = 0;
      let mBonusAmount = 0;
      // eslint-disable-next-line radix
      const amountCOn = parseInt(amountx);
      // eslint-disable-next-line array-callback-return
      bonusCheck.map((checkBonus) => {
        if (checkBonus.minTrigger <= amountCOn && checkBonus.maxTrigger >= amountCOn) {
          mBonusAmount = checkBonus.bonusAmount;
          setBonusSetID(checkBonus.id);
          allPayandBonus = checkBonus.bonusAmount + amountCOn;
        } else if (checkBonus.minTrigger === 0 && checkBonus.maxTrigger >= amountCOn) {
          mBonusAmount = checkBonus.bonusAmount;
          setBonusSetID(checkBonus.id);
          allPayandBonus = checkBonus.bonusAmount + amountCOn;
        } else if (checkBonus.minTrigger <= amountCOn && checkBonus.maxTrigger === 0) {
          mBonusAmount = checkBonus.bonusAmount;
          setBonusSetID(checkBonus.id);
          allPayandBonus = checkBonus.bonusAmount + amountCOn;
        } else {
          mBonusAmount = 0;
          allPayandBonus = amountCOn;
        }
        // check = false;
      });

      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      const raw = JSON.stringify({
        orgID: orgIDs,
        paidAmount: amountCOn,
        bonusAmount: mBonusAmount,
        totalAmount: allPayandBonus,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/paymentHistory/add`, requestOptions)
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
          setOpened(false);

          const raw1 = JSON.stringify({
            orgID: orgIDs,
            bonusSettingID: bonusSetID,
          });
          const requestOptions1 = {
            method: "POST",
            headers: myHeaders,
            body: raw1,
            redirect: "follow",
          };
          if (mBonusAmount !== 0) {
            fetch(
              `${process.env.REACT_APP_EKOATLANTIC_URL}/bonusHistory/add`,
              requestOptions1
            ).then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            });
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

  const personalApiKey = "MK_TEST_JB2L9T7HMG";
  const personalConCode = "6428086775";

  const monNey = {
    onClose: honClose,
    amount: amountx,
    currency: currencyx,
    reference: referenceSKey,
    customerFullName: namex,
    customerEmail: emailx,
    customerMobileNumber: pnox,
    apiKey: personalApiKey,
    contractCode: personalConCode,
    paymentDescription: descripx,
    isTestMode: true,
  };

  //   const handleOnClick = () => {
  //     setOpened(true);
  //     const data11 = JSON.parse(localStorage.getItem("user1"));
  //     //   bonusAmount: 10
  //     //   createdTime: 1649875827073
  //     //   deleteFlag: 0
  //     //   endTime: 1651104000000
  //     //   id: "62571b73813e040d304c13fd"
  //     //   maxTrigger: 6000
  //     //   minTrigger: 2000
  //     //   name: "Test Freebie"
  //     //   startTime: 1649894400000
  //     //   status: 0
  //     let allPayandBonus = 0;
  //     let mBonusAmount = 0;
  //     // eslint-disable-next-line radix
  //     const amountCOn = parseInt(amountx);
  //     // eslint-disable-next-line array-callback-return
  //     bonusCheck.map((checkBonus) => {
  //       if (checkBonus.minTrigger <= amountCOn && checkBonus.maxTrigger >= amountCOn) {
  //         mBonusAmount = checkBonus.bonusAmount;
  //         allPayandBonus = checkBonus.bonusAmount + amountCOn;
  //       } else if (checkBonus.minTrigger === 0 && checkBonus.maxTrigger >= amountCOn) {
  //         mBonusAmount = checkBonus.bonusAmount;
  //         allPayandBonus = checkBonus.bonusAmount + amountCOn;
  //       } else if (checkBonus.minTrigger <= amountCOn && checkBonus.maxTrigger === 0) {
  //         mBonusAmount = checkBonus.bonusAmount;
  //         allPayandBonus = checkBonus.bonusAmount + amountCOn;
  //       } else {
  //         mBonusAmount = 0;
  //         allPayandBonus = amountCOn;
  //       }
  //       // check = false;
  //     });
  //     const orgIDs = data11.orgID;
  //     const raw = JSON.stringify({
  //       orgID: orgIDs,
  //       paidAmount: amountCOn,
  //       bonusAmount: mBonusAmount,
  //       totalAmount: allPayandBonus,
  //     });
  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };
  //     console.log(raw);
  //     fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/paymentHistory/add`, requestOptions)
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res.json();
  //       })
  //       .then((result) => {
  //         console.log(result);
  //         if (result.message === "Expired Access") {
  //           navigate("/authentication/sign-in");
  //         }
  //         if (result.message === "Token Does Not Exist") {
  //           navigate("/authentication/sign-in");
  //         }
  //         if (result.message === "Unauthorized Access") {
  //           navigate("/authentication/forbiddenPage");
  //         }
  //         setOpened(false);
  //         MySwal.fire({
  //           title: result.status,
  //           type: "success",
  //           text: result.message,
  //         }).then(() => {
  //           window.location.reload();
  //         });
  //       })
  //       .catch((error) => {
  //         setOpened(false);
  //         MySwal.fire({
  //           title: error.status,
  //           type: "error",
  //           text: error.message,
  //         });
  //       });
  //   };

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const auditConSDate = new Date(auditSDate).getTime();
    const auditConEDate = new Date(auditEDate).getTime();
    const raw = JSON.stringify({
      orgID: orgIDs,
      startDate: auditConSDate,
      endDate: auditConEDate,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/paymentHistory/getFilter`, requestOptions)
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
        setItems(result);
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

  const pColumns = [
    { Header: "Organization", accessor: "orgName", align: "left" },
    { Header: "Paid Amount", accessor: "paidAmount", align: "left" },
    { Header: "Bonus Amount", accessor: "bonusAmount", align: "left" },
    { Header: "Total Amount", accessor: "totalAmount", align: "left" },
    { Header: "Balance", accessor: "balance", align: "left" },
    {
      Header: "Last Updated",
      accessor: "lastUpdatedTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "Date Created",
      accessor: "createdTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
  ];

  const handleOnNameKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!namex.match(letters)) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
    }
    if (namex.match(letters)) {
      setCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (namex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name is required<br>";
    }
    setEnabled(checkedEmail === true && checkedName === true && checkedCity === true);
  };

  const handleOnEmailKeys = () => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    if (!emailx.match(letters)) {
      setCheckedEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
    }
    if (emailx.match(letters)) {
      setCheckedEmail(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (emailx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email is required<br>";
    }
    setEnabled(checkedEmail === true && checkedName === true && checkedCity === true);
  };

  const handleOnCityKeys = () => {
    const letters = /^[0-9]+$/;
    if (!amountx.match(letters)) {
      setCheckedCity(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "Amount - input only numbers<br>";
    }
    if (amountx.match(letters)) {
      setCheckedCity(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "";
    }
    if (amountx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "Amount is required<br>";
    }
    setEnabled(checkedEmail === true && checkedName === true && checkedCity === true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container>
        <div className="row">
          <div className="col-sm-5">
            <Card>
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="success"
                mt={2}
                mx={0}
                p={1}
                textAlign="left"
              >
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  color="white"
                  textAlign="center"
                  mt={1}
                >
                  Balance
                </MDTypography>
              </MDBox>
              <MDBox
                variant="gradient"
                bgColor="white"
                borderRadius="lg"
                coloredShadow="success"
                mx={3}
                mt={2}
                p={6}
                mb={1}
                textAlign="left"
              >
                <MDTypography variant="h1" fontWeight="medium" color="info" textAlign="center">
                  {concaBalance}
                </MDTypography>
              </MDBox>
            </Card>
          </div>
          <div className="col-sm-7">
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
                    Make Payment
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
                            label="Name(name on receipt) *"
                            value={namex || ""}
                            onKeyUp={handleOnNameKeys}
                            onChange={(e) => setName(e.target.value)}
                            variant="standard"
                            fullWidth
                          />
                        </div>
                        <div className="col-sm-6">
                          <MDInput
                            type="text"
                            value={emailx || ""}
                            onKeyUp={handleOnEmailKeys}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email *"
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
                        <div className="col-sm-3">
                          <MDInput
                            type="text"
                            value={currencyx || ""}
                            onChange={(e) => setCurrency(e.target.value)}
                            label="Currency *"
                            disabled
                            variant="standard"
                            fullWidth
                          />
                        </div>
                        <div className="col-sm-9">
                          <MDInput
                            type="text"
                            value={amountx || ""}
                            onKeyUp={handleOnCityKeys}
                            onChange={(e) => setAmountx(e.target.value)}
                            label="Amount *"
                            variant="standard"
                            fullWidth
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-8">
                          <MDInput
                            type="text"
                            value={descripx || ""}
                            onKeyUp={handleOnCityKeys}
                            onChange={(e) => setDescripx(e.target.value)}
                            label="Description *"
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
                            Phone Number *
                          </MDTypography>
                          <PhoneInput
                            value={pnox}
                            inputStyle={{ width: "100%" }}
                            buttonStyle={{}}
                            onChange={setPno}
                          />
                        </div>
                      </div>
                    </Container>
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <div>
                      <MonnifyConsumer {...monNey} className="btn">
                        {({ initializePayment }) => (
                          // eslint-disable-next-line react/button-has-type
                          <MDButton
                            variant="gradient"
                            onClick={() => initializePayment()}
                            disabled={!enabled}
                            color="info"
                            width="50%"
                          >
                            Pay
                          </MDButton>
                        )}
                      </MonnifyConsumer>
                    </div>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </div>
        </div>
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
                Payment History
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
                      <div className="col-sm-6">
                        <MDBox mt={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            fontSize="80%"
                            align="left"
                            color="text"
                          >
                            Start Date
                          </MDTypography>
                          <DatePicker
                            placeholderText="MM/DD/YY"
                            style={{ marginRight: "10px" }}
                            selected={auditSDate}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            onChange={(time) => setAuditSDate(time)}
                          />{" "}
                        </MDBox>{" "}
                      </div>
                      <div className="col-sm-6">
                        <MDBox mt={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            fontSize="80%"
                            align="left"
                            color="text"
                          >
                            End Date
                          </MDTypography>
                          <DatePicker
                            placeholderText="MM/DD/YY"
                            style={{ marginRight: "10px" }}
                            selected={auditEDate}
                            onChange={(time) => setAuditEDate(time)}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                          />{" "}
                        </MDBox>
                      </div>
                    </div>
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        onClick={handleClick}
                        color="info"
                        width="50%"
                        align="center"
                      >
                        Add Filters
                      </MDButton>
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

export default PaymentHis;
