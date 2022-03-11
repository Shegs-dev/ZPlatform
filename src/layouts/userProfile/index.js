import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import team1 from "assets/images/team-1.jpg";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "bootstrap/dist/css/bootstrap.min.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AllCountries from "countries";
import BankNameAndCode from "./bankcode";

function UserProfile() {
  const { bankNameCode: allbankNameCode } = BankNameAndCode();
  const { countries: WCountries } = AllCountries();
  const MySwal = withReactContent(Swal);

  const [fnamex, setFname] = useState("");
  const [lnamex, setLname] = useState("");
  const [onamex, setOname] = useState("");
  const [emailx, setEmail] = useState("");
  const [phonex, setPhone] = useState("");
  //   const [dayOfBirthx, setDayOfBirth] = useState("");
  //   const [monthOfBirthx, setMonthOfBirth] = useState("");
  //   const [yearOfBirthx, setYearOfBirth]e = useState("");
  const [nationalityx, setNationality] = useState("");
  const [residentialStreetx, setResidentialStreet] = useState("");
  const [residentialCityx, setResidentialCity] = useState("");
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const [maritalStatusx, setMaritalStatus] = useState("");
  const [deleteFlagx, setDeleteFlag] = useState("");
  const [sysStatusx, setSysStatus] = useState("");
  const [createdTimex, setCreatedTime] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [nkIDx, setNkID] = useState("");
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
  const [nkDeleteFlagx, setNkDeleteFlag] = useState("");
  const [nkCreatedTimex, setNkCreatedTime] = useState("");

  const [baIDx, setBaID] = useState("");
  const [baBankx, setBaBank] = useState("");
  const [baCountryx, setBaCountry] = useState("");
  const [baAcctNox, setBaAcctNo] = useState("");
  const [baAcctNamex, setBaAcctName] = useState("");
  const [baBankCodex, setBaBankCode] = useState("");
  const [baDeleteFlagx, setBaDeleteFlag] = useState("");
  const [baCreatedTimex, setBaCreatedTime] = useState("");

  const [maIDx, setMaID] = useState("");
  const [maNoOfSpousesx, setMaNoOfSpouses] = useState("");
  const [maNoOfChildrenx, setMaNoOfChildren] = useState("");
  const [maDeleteFlagx, setMaDeleteFlag] = useState("");
  const [maCreatedTimex, setMaCreatedTime] = useState("");

  const [meIDx, setMeID] = useState("");
  const [meBloodGroupx, setMeBloodGroup] = useState("");
  const [meGenotypex, setMeGenotype] = useState("");
  const [meDeleteFlagx, setMeDeleteFlag] = useState("");
  const [meCreatedTimex, setMeCreatedTime] = useState("");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const data11 = JSON.parse(localStorage.getItem("user1"));
  console.log(data11);
  const personalIds = data11.personalID;
  // console.log(personalIds);
  const orgIDs = data11.orgID;
  // console.log(orgIDs);

  useEffect(() => {
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/get/${personalIds}`)
      .then((res) => res.json())
      .then((resultp) => {
        console.log(resultp);
        if (isMounted) {
          setFname(resultp[0].fname);
          setLname(resultp[0].lname);
          setOname(resultp[0].oname);
          setEmail(resultp[0].email);
          setPhone(resultp[0].pno);
          //   setDayOfBirth(resultp[0].dayOfBirth);
          //   setMonthOfBirth(resultp[0].monthOfBirth);
          //   setYearOfBirth(resultp[0].yearOfBirth);
          setNationality(resultp[0].nationality);
          setResidentialStreet(resultp[0].residentialStreet);
          setResidentialCity(resultp[0].residentialCity);
          setResidentialState(resultp[0].residentialState);
          setResidentialCountry(resultp[0].residentialCountry);
          setMaritalStatus(resultp[0].maritalStatus);
          setDeleteFlag(resultp[0].deleteFlag);
          setSysStatus(resultp[0].sysStatus);
          setCreatedTime(resultp[0].createdTime);

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
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/nextofkin/getForEmployee/${personalIds}`)
      .then((res) => res.json())
      .then((resultnk) => {
        console.log(resultnk);
        console.log(resultnk.length);
        if (isMounted) {
          // eslint-disable-next-line eqeqeq
          if (resultnk.length != 0) {
            setNkID(resultnk[0].id);
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
            setNkDeleteFlag(resultnk[0].deleteFlag);
            setNkCreatedTime(resultnk[0].createdTime);
          } else {
            setNkID(null);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/bankaccount/getForEmployee/${personalIds}`)
      .then((res) => res.json())
      .then((resultba) => {
        console.log(resultba);
        console.log(resultba.length);
        if (isMounted) {
          // eslint-disable-next-line eqeqeq
          if (resultba.length != 0) {
            setBaID(resultba[0].id);
            setBaBank(resultba[0].bank);
            console.log(resultba[0].bank);
            setBaCountry(resultba[0].country);
            setBaAcctNo(resultba[0].acctNo);
            setBaAcctName(resultba[0].acctName);
            setBaBankCode(resultba[0].bankCode);
            setBaDeleteFlag(resultba[0].deleteFlag);
            setBaCreatedTime(resultba[0].createdTime);
          } else {
            setBaID(null);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/marital/getForEmployee/${personalIds}`)
      .then((res) => res.json())
      .then((resultma) => {
        console.log(resultma);
        console.log(resultma.length);
        if (isMounted) {
          // eslint-disable-next-line eqeqeq
          if (resultma.length != 0) {
            setMaID(resultma[0].id);
            setMaNoOfSpouses(resultma[0].noOfSpouses);
            setMaNoOfChildren(resultma[0].noOfChildren);
            setMaDeleteFlag(resultma[0].deleteFlag);
            setMaCreatedTime(resultma[0].createdTime);
          } else {
            setMaID(null);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/medical/getForEmployee/${personalIds}`)
      .then((res) => res.json())
      .then((resultme) => {
        console.log(resultme);
        console.log(resultme.length);
        if (isMounted) {
          // eslint-disable-next-line eqeqeq
          if (resultme.length != 0) {
            setMeID(resultme[0].id);
            setMeBloodGroup(resultme[0].bloodGroup);
            setMeGenotype(resultme[0].genotype);
            setMeDeleteFlag(resultme[0].deleteFlag);
            setMeCreatedTime(resultme[0].createdTime);
          } else {
            setMeID(null);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdate = () => {
    let dayx = "";
    let monthx = "";
    let yearx = "";
    if (startDate != null) {
      const sDate = startDate.getTime();
      console.log(`startDate: ${startDate}`);
      console.log(`sDate: ${sDate}`);
      dayx = startDate.getDate();
      monthx = startDate.getMonth() + 1;
      yearx = startDate.getFullYear();
    }

    const raw = JSON.stringify({
      id: personalIds,
      fname: fnamex,
      lname: lnamex,
      oname: onamex,
      email: emailx,
      pno: phonex,
      nationality: nationalityx,
      residentialStreet: residentialStreetx,
      residentialCity: residentialCityx,
      residentialState: residentialStatex,
      residentialCountry: residentialCountryx,
      dayOfBirth: dayx,
      monthOfBirth: monthx,
      yearOfBirth: yearx,
      maritalStatus: maritalStatusx,
      sysStatus: sysStatusx,
      deleteFlag: deleteFlagx,
      createdTime: createdTimex,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/update`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
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

  const handleAddNOK = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({
      orgID: orgIDs,
      empID: personalIds,
      fname: nkFnamex,
      lname: nkLnamex,
      oname: nkOnamex,
      email: nkEmailx,
      pno: nkPhonex,
      title: nkTitlex,
      residentialStreet: nkResidentialStreetx,
      residentialCity: nkResidentialCityx,
      residentialState: nkResidentialStatex,
      residentialCountry: nkResidentialCountryx,
      occupation: nkOccupationx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/nextofkin/add`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
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

  const handleAddBA = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({
      orgID: orgIDs,
      empID: personalIds,
      bank: baBankx,
      country: baCountryx,
      acctNo: baAcctNox,
      acctName: baAcctNamex,
      bankCode: baBankCodex,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/bankaccount/add`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
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

  const handleAddMA = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({
      orgID: orgIDs,
      empID: personalIds,
      noOfSpouses: maNoOfSpousesx,
      noOfChildren: maNoOfChildrenx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/marital/add`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
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

  const handleAddME = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({
      orgID: orgIDs,
      empID: personalIds,
      bloodGroup: meBloodGroupx,
      genotype: meGenotypex,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/medical/add`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
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

  const handleNKUpdate = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({
      id: nkIDx,
      orgID: orgIDs,
      empID: personalIds,
      fname: nkFnamex,
      lname: nkLnamex,
      oname: nkOnamex,
      email: nkEmailx,
      pno: nkPhonex,
      title: nkTitlex,
      residentialStreet: nkResidentialStreetx,
      residentialCity: nkResidentialCityx,
      residentialState: nkResidentialStatex,
      residentialCountry: nkResidentialCountryx,
      occupation: nkOccupationx,
      deleteFlag: nkDeleteFlagx,
      createdTime: nkCreatedTimex,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/nextofkin/update`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
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
  const handleBAUpdate = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({
      id: baIDx,
      orgID: orgIDs,
      empID: personalIds,
      bank: baBankx,
      country: baCountryx,
      acctNo: baAcctNox,
      acctName: baAcctNamex,
      bankCode: baBankCodex,
      deleteFlag: baDeleteFlagx,
      createdTime: baCreatedTimex,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/bankaccount/update`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
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

  const handleMAUpdate = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({
      id: maIDx,
      orgID: orgIDs,
      empID: personalIds,
      noOfSpouses: maNoOfSpousesx,
      noOfChildren: maNoOfChildrenx,
      deleteFlag: maDeleteFlagx,
      createdTime: maCreatedTimex,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/marital/update`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
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

  const handleMEUpdate = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({
      id: meIDx,
      orgID: orgIDs,
      empID: personalIds,
      bloodGroup: meBloodGroupx,
      genotype: meGenotypex,
      deleteFlag: meDeleteFlagx,
      createdTime: meCreatedTimex,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/medical/update`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
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

  const handleNKAddUpdate = (e) => {
    e.preventDefault();
    if (nkIDx == null) {
      handleAddNOK(e);
    } else {
      handleNKUpdate(e);
    }
  };

  const handleBAAddUpdate = (e) => {
    e.preventDefault();
    if (baIDx == null) {
      handleAddBA(e);
    } else {
      handleBAUpdate(e);
    }
  };

  const handleMAAddUpdate = (e) => {
    e.preventDefault();
    if (maIDx == null) {
      handleAddMA(e);
    } else {
      handleMAUpdate(e);
    }
  };

  const handleMEAddUpdate = (e) => {
    e.preventDefault();
    if (meIDx == null) {
      handleAddME(e);
    } else {
      handleMEUpdate(e);
    }
  };

  const handleOnChangeBank = (e) => {
    const filteredItems = allbankNameCode.filter((item) => item.bankName === e.target.value);
    console.log(e.target.value);
    if (e.target.value === "1") {
      setBaBank("");
      setBaBankCode("");
    } else {
      setBaBank(e.target.value);
      setBaBankCode(filteredItems[0].cbnCode);
      console.log(baBankx);
      console.log(baBankCodex);
    }
  };

  const handleOnChangeCountry = (e) => {
    setBaCountry(e.target.value);
    console.log(baCountryx);
  };

  useEffect(() => {
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/medical/getForEmployee/${personalIds}`)
      .then((res) => res.json())
      .then((resultma) => {
        console.log(resultma);
        console.log(resultma.length);
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="row">
        <div className="col-sm-1" />
        <div className="col-sm-4">
          <Card>
            <div align="center">
              <MDBox mt={-4} mx={2} p={0}>
                <MDAvatar src={team1} alt="name" size="xxl" />
              </MDBox>
            </div>
            <div align="center">
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="sm"
                coloredShadow="info"
                mt={2}
                mx={0}
                p={1}
                textAlign="center"
              >
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  fontFamily="Helvetica"
                  fontSize="120%"
                  color="white"
                >
                  {fnamex} {onamex} {lnamex}
                </MDTypography>
              </MDBox>
            </div>
            <div align="center">
              <MDTypography
                variant="h7"
                fontWeight="medium"
                fontFamily="Century Gothic"
                fontSize="70%"
                color="dark"
                mt={0}
              >
                {emailx}
              </MDTypography>
            </div>
            <div align="center">
              <MDTypography
                variant="h5"
                fontWeight="light"
                fontSize="70%"
                fontFamily="Helvetica"
                color="dark"
                mt={0}
              >
                {phonex}
              </MDTypography>
            </div>
            <div align="center">
              <MDTypography
                variant="h6"
                fontWeight="medium"
                fontFamily="Helvetica"
                fontSize="80%"
                color="dark"
                mt={0}
              >
                {residentialStreetx}&#44; {residentialCityx}&#44; {residentialStatex}
              </MDTypography>

              <MDTypography
                variant="h6"
                fontWeight="medium"
                fontFamily="Helvetica"
                color="dark"
                mt={0}
                mb={5}
              >
                {residentialCountryx}
              </MDTypography>
            </div>
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
                          onChange={(e) => setNKEmail(e.target.value)}
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
                      <MDBox mb={2} mx={0}>
                        <MDInput
                          type="number"
                          label="Phone Number"
                          value={nkPhonex || ""}
                          onChange={(e) => setNkPhone(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </MDBox>
                    </div>
                  </div>
                </Container>
                <Container>
                  <div className="row">
                    <div className="col-sm-8">
                      <MDBox mb={2}>
                        <Form.Select
                          onChange={(e) => setNkTitle(e.target.value)}
                          value={nkTitlex || ""}
                          aria-label="Default select example"
                        >
                          <option>---Select Title---</option>
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Miss">Miss</option>
                        </Form.Select>
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
                          onChange={(e) => setNkResidentialCity(e.target.value)}
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
                          value={nkResidentialStatex || ""}
                          onChange={(e) => setNkResidentialState(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>

                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Country"
                          value={nkResidentialCountryx || ""}
                          onChange={(e) => setNkResidentialCountry(e.target.value)}
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
                      <MDBox mb={2}>
                        <MDInput
                          type="email"
                          label="Occupation"
                          value={nkOccupationx || ""}
                          onChange={(e) => setNkOccupation(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </MDBox>
                    </div>
                  </div>
                </Container>
                <div align="center">
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={handleNKAddUpdate}
                      color="info"
                      width="50%"
                    >
                      Save
                    </MDButton>
                  </MDBox>
                </div>
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
                          value={maNoOfChildrenx || ""}
                          onChange={(e) => setMaNoOfChildren(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <div align="center">
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={handleMAAddUpdate}
                      color="info"
                      width="50%"
                    >
                      Save
                    </MDButton>
                  </MDBox>
                </div>
              </MDBox>
            </MDBox>
          </Card>
        </div>
        &nbsp;
        <div className="col-sm-6">
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
                          value={residentialCountryx || ""}
                          onChange={(e) => setResidentialCountry(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <div align="center">
                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" onClick={handleUpdate} color="info" width="50%">
                      Save
                    </MDButton>
                  </MDBox>
                </div>
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
                      <div className="col-sm-12">
                        <MDBox textAlign="right">
                          <Form.Select
                            value={baBankx || ""}
                            aria-label="Default select example"
                            onChange={handleOnChangeBank}
                          >
                            <option value="1">--Select Bank--</option>
                            {allbankNameCode.map((api) => (
                              <option key={api.id} value={api.bankName}>
                                {api.bankName}
                              </option>
                            ))}
                          </Form.Select>
                        </MDBox>
                      </div>
                    </div>
                  </Container>
                  <Container>
                    <div className="row">
                      <div className="col-sm-12">
                        <MDBox textAlign="right" mt={2}>
                          <Form.Select
                            value={baCountryx || ""}
                            aria-label="Default select example"
                            onChange={handleOnChangeCountry}
                          >
                            <option>--Select Country--</option>
                            {WCountries.map((apic) => (
                              <option key={apic.code} value={apic.name}>
                                {apic.name}
                              </option>
                            ))}
                          </Form.Select>
                        </MDBox>
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
                          value={baAcctNamex || ""}
                          onChange={(e) => setBaAcctName(e.target.value)}
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
                          label="Bank Code"
                          disabled
                          value={baBankCodex || ""}
                          onChange={(e) => setBaBankCode(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <div align="center">
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={handleBAAddUpdate}
                      color="info"
                      width="50%"
                    >
                      Save
                    </MDButton>
                  </MDBox>
                </div>
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
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <div align="center">
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={handleMEAddUpdate}
                      color="info"
                      width="50%"
                    >
                      Save
                    </MDButton>
                  </MDBox>
                </div>
              </MDBox>
            </MDBox>
          </Card>
        </div>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default UserProfile;
