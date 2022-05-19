/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Dropdown } from "react-bootstrap";
import Icon from "@mui/material/Icon";
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

  const [items, setItems] = useState([]);

  const [sUser, setSUser] = useState([]);

  const [allUserID, setAllUserID] = useState([]);

  const [enabled, setEnabled] = useState(false);

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

  useEffect(() => {
    const userMap = [];
    setSUser(userMap);
    setOpened(true);
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
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Method to fetch all departments
  // env.environments
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
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
        if (isMounted) {
          console.log(result);
          setItems(result);
        }
      });
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
        if (result.status === "SUCCESS") {
          setEnabled(true);
        }
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

  const handleAllCal = (e) => {
    e.preventDefault();

    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;

    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
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
          const fdy = item.personal.id;
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
            setOpened(false);
            if (result.status === "SUCCESS") {
              setEnabled(true);
            }
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
    {
      Header: "actions",
      accessor: "id",
      Cell: ({ cell: { value } }) => (
        <div
          style={{
            width: "100%",
            backgroundColor: "#dadada",
            borderRadius: "2px",
          }}
        >
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <Icon sx={{ fontWeight: "light" }}>settings</Icon>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item value={value}>Generate Receipt</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      align: "center",
    },
  ];

  const handleOnSelect = (select) => {
    const userIDs = [];
    setAllUserID(userIDs);
    // eslint-disable-next-line array-callback-return
    select.map((item) => {
      const fdy = item.value;
      console.log(fdy);
      userIDs.push(fdy);
    });
    console.log(select);
    console.log(userIDs);
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
                            closeMenuOnSelectf
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
                      <MDBox mt={4} mb={1}>
                        <MDButton
                          variant="outlined"
                          onClick={handleClick}
                          color="info"
                          width="50%"
                          disabled={!enabled}
                        >
                          Pay Salary
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
