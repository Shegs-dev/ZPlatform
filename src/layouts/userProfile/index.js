import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import dummyUser from "assets/images/dummy-user.png";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@mui/material/Grid";
// // import Icon from "@mui/material/Icon";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Divider } from "@mui/material";
import AllCountriesAndStates from "countries-states-master/countries";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// imports for the drawer
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
// imports for modal
import Modal from "@mui/material/Modal";

function UserProfile() {
  const MySwal = withReactContent(Swal);

  const [files, setFiles] = useState();

  const [state, setState] = React.useState({
    right: false,
  });

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
  const [deleteFlagx, setDeleteFlag] = useState("");
  const [sysStatusx, setSysStatus] = useState("");
  const [createdTimex, setCreatedTime] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [allStates, setAllStates] = useState([]);

  const [imageUrl, setImageUrl] = useState("");
  const [imgChanged, setImgChanged] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  const [openn, setOpenn] = React.useState(false);
  const [copenn, setCOpenn] = React.useState(false);
  const handleOpen = () => setOpenn(true);
  const handleClose = () => {
    setSelectedImage();
    setOpenn(false);
  };
  const handleCOpen = () => setCOpenn(true);
  const handleCClose = () => {
    setSelectedImage();
    setCOpenn(false);
  };
  const { countriesAndStates: AlCountry } = AllCountriesAndStates();

  const [skillsx, setSkills] = useState([]);
  const [educationx, setEducation] = useState([]);
  const [workHistoryx, setWorkHistory] = useState([]);
  const [positionHeldx, setPositionHeld] = useState([]);

  const [opened, setOpened] = useState(false);

  const [showUser, setShowUser] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showWorkHistory, setShowWorkHistory] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showPositionHeld, setShowPositionHeld] = useState(false);

  const navigate = useNavigate();

  const { allGHeaders: miHeaders } = GHeaders();
  const { allPHeaders: myHeaders } = PHeaders();

  const changeDateandTime = (stimestamp, etimestamp) => {
    const sdate = new Date(stimestamp);
    let sdayx = "";
    let smonthx = "";
    let syearx = "";
    if (sdate !== null) {
      sdayx = sdate.getDate();
      smonthx = sdate.getMonth() + 1;
      syearx = sdate.getFullYear();
    }

    const edate = new Date(etimestamp);
    let edayx = "";
    let emonthx = "";
    let eyearx = "";
    if (edate !== null) {
      edayx = edate.getDate();
      emonthx = edate.getMonth() + 1;
      eyearx = edate.getFullYear();
    }
    return `${syearx}/${smonthx}/${sdayx} - ${eyearx}/${emonthx}/${edayx}`;
  };

  useEffect(() => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    console.log(data11);
    const personalIDs = data11.id;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/get/${personalIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
          console.log(resultp);
          if (resultp.length > 0) {
            setShowUser(true);
          }
          setFname(resultp[0].fname);
          setLname(resultp[0].lname);
          setOname(resultp[0].oname);
          setEmail(resultp[0].email);
          setPhone(resultp[0].pno);
          //   setDayOfBirth(resultp[0].dayOfBirth);
          //   setMonthOfBirth(resultp[0].monthOfBirth);
          //   setYearOfBirth(resultp[0].yearOfBirth);
          const filteredItems = AlCountry.filter(
            (item) => item.name === resultp[0].residentialCountry
          );
          setAllStates(filteredItems[0].states);
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
    const headers = miHeaders;
    let isMounted = true;
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const personalIDs = data11.id;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/resume/getForEmployee/${personalIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
          if (result === null) {
            setSkills([]);
            setWorkHistory([]);
            setEducation([]);
            setPositionHeld([]);
          } else {
            setSkills(result.skills);
            setWorkHistory(result.workHistories);
            setEducation(result.educations);
            setPositionHeld(result.positionHelds);
          }
          if (result.skills.length > 0) {
            setShowSkills(true);
          }
          if (result.workHistories.length > 0) {
            setShowWorkHistory(true);
          }
          if (result.educations.length > 0) {
            setShowEducation(true);
          }
          if (result.positionHelds.length > 0) {
            setShowPositionHeld(true);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("CV.pdf");
    });
  };

  const handleUpdate = () => {
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const personalIDs = data11.id;
    let dayx = "";
    let monthx = "";
    let yearx = "";
    if (startDate != null) {
      dayx = startDate.getDate();
      monthx = startDate.getMonth() + 1;
      yearx = startDate.getFullYear();
    }

    const raw = JSON.stringify({
      id: personalIDs,
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
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/update`, requestOptions)
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

  const handleOnChangeRCCountry = (e) => {
    const filteredItems = AlCountry.filter((item) => item.name === e.target.value);
    setAllStates(filteredItems[0].states);
    setResidentialCountry(e.target.value);
  };

  const handleOnChangeRCState = (e) => {
    setResidentialState(e.target.value);
  };

  const handleOnChangeNationality = (e) => {
    setNationality(e.target.value);
  };

  const handleOnFirstKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!fnamex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML =
        "First Name - input only capital and small letters<br>";
    }
    if (fnamex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML = "";
    }
    if (fnamex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML = "First Name is required<br>";
    }
  };

  const handleOnLastKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!lnamex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML =
        "Last Name - input only capital and small letters<br>";
    }
    if (lnamex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML = "";
    }
    if (lnamex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML = "Last Name is required<br>";
    }
  };

  const handleOnOtherKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!onamex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("other").innerHTML =
        "Other Name - input only capital and small letters<br>";
    }
    if (onamex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("other").innerHTML = "";
    }
    if (onamex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("other").innerHTML = "Other Name is required<br>";
    }
  };

  const handleOnPEmailKeys = () => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    if (!emailx.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
    }
    if (emailx.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (emailx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email is required<br>";
    }
  };

  const handleOnStreetKeys = () => {
    // eslint-disable-next-line no-invalid-regexp
    const letters = /^[a-zA-Z0-9 .,-]+$/;
    if (!residentialStreetx.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Street - use only [ - . , ] as symbols<br>";
    }
    if (residentialStreetx.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "";
    }
    if (residentialStreetx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Street is required<br>";
    }
  };

  const handleOnCityKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!residentialCityx.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "City - input only capital and small letters<br>";
    }
    if (residentialCityx.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "";
    }
    if (residentialCityx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "City is required<br>";
    }
  };

  // modal
  const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#ffffff",
    // border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
  };

  const handleGetImage = () => {
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const personalIDs = data11.id;
    const imgKey = `PROF_PIC_EMP-${personalIDs}`;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getByKey/Mono/${imgKey}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
        fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${result.name}`, {
          headers,
        })
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            const resultres = await res.text();
            if (resultres === null || resultres === undefined || resultres === "") {
              return {};
            }
            return JSON.parse(resultres);
          })
          .then((resultxx) => {
            if (resultxx.message === "Expired Access") {
              navigate("/authentication/sign-in");
              window.location.reload();
            }
            if (resultxx.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
              window.location.reload();
            }
            if (resultxx.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
              window.location.reload();
            }
            console.log(resultxx[0]);
            setImageUrl(resultxx[0]);
          });
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      // fetches the table data
      handleGetImage();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleImageUpload = (e) => {
    handleClose();
    if (imageUrl) {
      MySwal.fire({
        title: "INVALID_ACTION",
        type: "error",
        text: "You can't upload a picture again, please change the image",
      });
    } else {
      console.log(files);
      if (!files) {
        MySwal.fire({
          title: "INVALID_INPUT",
          type: "error",
          text: "Please input a file",
        }).then(() => {
          handleOpen();
        });
      } else {
        console.log(files[0]);
        setOpened(true);
        e.preventDefault();
        // Headers for upload image
        const GenToken = localStorage.getItem("rexxdex1");
        const apiiToken = localStorage.getItem("rexxdex");

        if (apiiToken !== "null" && apiiToken !== null) {
          localStorage.setItem("rexxdex1", apiiToken);
        }
        const iiHeaders = new Headers();
        iiHeaders.append("Token-1", GenToken);

        const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
        console.log(data11);
        const personalIDs = data11.id;
        const imgKey = `PROF_PIC_EMP-${personalIDs}`;
        console.log(imgKey);

        const mOrgID = "Mono";

        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("orgID", mOrgID);
        formData.append("key", imgKey);
        formData.append("type", files[0].type);

        const raw = formData;
        console.log(raw);

        // const raw = JSON.stringify({
        //   mediaDTO: {
        //     multipartFile: formData,
        //     key: imgKey,
        //     type: files[0].type,
        //   },
        // });
        const requestOptions = {
          method: "POST",
          headers: iiHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/uploadFile`, requestOptions)
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
            console.log(result);
            MySwal.fire({
              title: result.status,
              type: "success",
              text: result.message,
            }).then(() => {
              if (result.status !== "SUCCESS") {
                handleOpen();
              } else {
                handleGetImage();
              }
              console.log("SUCCESS");
            });
          })
          .catch((error) => {
            setOpened(false);
            MySwal.fire({
              title: error.status,
              type: "error",
              text: error.message,
            }).then(() => {
              handleOpen();
            });
          });
      }
    }
  };

  const handleImageChange = (e) => {
    handleCClose();
    if (!imageUrl) {
      MySwal.fire({
        title: "INVALID_IMAGE",
        type: "error",
        text: "Sorry there is no image to change",
      });
    } else {
      console.log(files);
      if (!files) {
        MySwal.fire({
          title: "INVALID_INPUT",
          type: "error",
          text: "Please input a file",
        }).then(() => {
          handleCOpen();
        });
      } else {
        console.log(files[0]);
        const requestDelOptions = {
          method: "DELETE",
          headers: miHeaders,
        };
        const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
        const personalIDs = data11.id;
        const mOrgID = "Mono";
        const imgKey = `PROF_PIC_EMP-${personalIDs}`;
        fetch(
          `${process.env.REACT_APP_EKOATLANTIC_URL}/media/delete/${mOrgID}/${imgKey}`,
          requestDelOptions
        )
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            const result = await res.text();
            if (result === null || result === undefined || result === "") {
              return {};
            }
            return JSON.parse(result);
          })
          .then((resx) => {
            console.log(resx);
            // if (resx.message === "Expired Access") {
            //   navigate("/authentication/sign-in");
            // }
            // if (resx.message === "Token Does Not Exist") {
            //   navigate("/authentication/sign-in");
            // }
            if (resx.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }
            // } else {
            //   navigate("/authentication/sign-in");
            // }
            if (resx.status !== "SUCCESS") {
              MySwal.fire({
                title: "CHANGE_UNSUCCESSFUL",
                type: "error",
                text: "Changing of image was unsuccessful",
              }).then(() => {
                handleOpen();
              });
            } else {
              setOpened(true);
              e.preventDefault();
              // Headers for upload image
              const GenToken = localStorage.getItem("rexxdex1");
              const apiiToken = localStorage.getItem("rexxdex");

              if (apiiToken !== "null" && apiiToken !== null) {
                localStorage.setItem("rexxdex1", apiiToken);
              }
              const iiHeaders = new Headers();
              iiHeaders.append("Token-1", GenToken);

              const formData = new FormData();
              formData.append("file", files[0]);
              formData.append("orgID", mOrgID);
              formData.append("key", imgKey);
              formData.append("type", files[0].type);

              const raw = formData;
              console.log(raw);

              // const raw = JSON.stringify({
              //   mediaDTO: {
              //     multipartFile: formData,
              //     key: imgKey,
              //     type: files[0].type,
              //   },
              // });
              const requestOptions = {
                method: "POST",
                headers: iiHeaders,
                body: raw,
                redirect: "follow",
              };

              fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/uploadFile`, requestOptions)
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
                  console.log(result);
                  MySwal.fire({
                    title: result.status,
                    type: "success",
                    text: result.message,
                  }).then(() => {
                    if (result.status !== "SUCCESS") {
                      handleCOpen();
                    } else {
                      handleGetImage();
                    }
                    console.log("SUCCESS");
                  });
                })
                .catch((error) => {
                  setOpened(false);
                  MySwal.fire({
                    title: error.status,
                    type: "error",
                    text: error.message,
                  }).then(() => {
                    handleCOpen();
                  });
                });
            }
          });
      }
    }
  };

  const checkUImage = (e) => {
    if (files[0].size > 522240) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML = "File should not exceed 500kb<br>";
    } else if (
      files[0].type !== "image/png" &&
      files[0].type !== "image/jpg" &&
      files[0].type !== "image/jpeg" &&
      files[0].type !== "image/gif"
    ) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML =
        "use only JPG, JPEG, PNG, JFIF or GIF image formats<br>";
    } else {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML = "";
      handleImageUpload(e);
    }
  };
  const checkCImage = (e) => {
    if (files[0].size > 522240) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML = "File should not exceed 500kb<br>";
    } else if (
      files[0].type !== "image/png" &&
      files[0].type !== "image/jpg" &&
      files[0].type !== "image/jpeg" &&
      files[0].type !== "image/gif"
    ) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML =
        "use only JPG, JPEG, PNG, JFIF or GIF image formats<br>";
    } else {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML = "";
      handleImageChange(e);
    }
  };

  const previewImage = (e) => {
    setFiles(e.target.files);
    if (e.target.files[0].size > 522240) {
      setImgChanged(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML = "File should not exceed 500kb<br>";
    } else if (
      e.target.files[0].type !== "image/png" &&
      e.target.files[0].type !== "image/jpg" &&
      e.target.files[0].type !== "image/jpeg" &&
      e.target.files[0].type !== "image/gif"
    ) {
      setImgChanged(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML =
        "use only JPG, JPEG, PNG, JFIF or GIF image formats<br>";
    } else {
      console.log(e.target.files[0]);
      setSelectedImage(e.target.files[0]);
      setImgChanged(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML = "";
    }
  };

  const handleDeleteImage = () => {
    if (!imageUrl) {
      MySwal.fire({
        title: "INVALID_IMAGE",
        type: "error",
        text: "Sorry there is no image to delete",
      }).then(() => {
        handleOpen();
      });
    } else {
      const requestOptions = {
        method: "DELETE",
        headers: miHeaders,
      };
      const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
      const personalIDs = data11.id;
      const mOrgID = "Mono";
      const imgKey = `PROF_PIC_EMP-${personalIDs}`;
      fetch(
        `${process.env.REACT_APP_EKOATLANTIC_URL}/media/delete/${mOrgID}/${imgKey}`,
        requestOptions
      )
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          const result = await res.text();
          if (result === null || result === undefined || result === "") {
            return {};
          }
          return JSON.parse(result);
        })
        .then((resx) => {
          console.log(resx);
          // if (resx.message === "Expired Access") {
          //   navigate("/authentication/sign-in");
          // }
          // if (resx.message === "Token Does Not Exist") {
          //   navigate("/authentication/sign-in");
          // }
          if (resx.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
          }
          // } else {
          //   navigate("/authentication/sign-in");
          // }
          MySwal.fire({
            title: resx.status,
            type: "success",
            text: resx.message,
          }).then(() => {
            console.log("SUCCESS");
            handleGetImage();
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
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <MDBox mt={3}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleOpen}>
              <ListItemIcon>
                <UploadFileIcon />
              </ListItemIcon>
              <ListItemText primary="Upload" />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleCOpen}>
              <ListItemIcon>
                <ChangeCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Change" />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleDeleteImage}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Remove" />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </MDBox>
    </Box>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
      {/* modal for file upload */}
      <div>
        <Modal
          open={openn}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MDBox sx={style}>
            <MDTypography id="modal-modal-title" variant="h6" component="h2">
              Upload Image
            </MDTypography>
            <MDInput type="file" files={files} onChange={previewImage} />
            <p id="imageVal" style={{ color: "red", fontSize: 13 }}>
              <i> </i>
            </p>

            {imgChanged ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                style={{ maxWidth: "25%", maxHeight: 80, borderRadius: 20 }}
                alt="Thumb"
              />
            ) : (
              <div />
            )}
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={checkUImage}
                color="info"
                width="50%"
                align="left"
              >
                Upload
              </MDButton>
            </MDBox>
          </MDBox>
        </Modal>
      </div>
      {/* modal for file upload */}
      <div>
        <Modal
          open={copenn}
          onClose={handleCClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MDBox sx={style}>
            <MDTypography id="modal-modal-title" variant="h6" component="h2">
              Change Image
            </MDTypography>
            <MDInput type="file" files={files} onChange={previewImage} />
            <p id="imageVal" style={{ color: "red", fontSize: 13 }}>
              <i> </i>
            </p>

            {imgChanged ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                style={{ maxWidth: "25%", maxHeight: 80, borderRadius: 20 }}
                alt="Thumb"
              />
            ) : (
              <div />
            )}
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={checkCImage}
                color="info"
                width="50%"
                align="left"
              >
                Change
              </MDButton>
            </MDBox>
          </MDBox>
        </Modal>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={4} md={4} lg={4}>
          <Card>
            <div align="center">
              <div>
                {["right"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                      <MDBox mt={-4} mx={2} p={0}>
                        <MDAvatar src={imageUrl || dummyUser} alt="name" size="xxl" />
                      </MDBox>
                    </Button>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))}
              </div>
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
            <MDBox pt={4} pb={3} px={0}>
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
                  <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                    BASIC INFO
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
                  mb={5}
                  textAlign="center"
                >
                  <MDTypography variant="gradient" fontSize="60%" color="white" id="first">
                    {" "}
                  </MDTypography>
                  <MDTypography variant="gradient" fontSize="60%" color="white" id="last">
                    {" "}
                  </MDTypography>
                  <MDTypography variant="gradient" fontSize="60%" color="white" id="other">
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
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="First Name"
                          value={fnamex || ""}
                          onKeyUp={handleOnFirstKeys}
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
                          onKeyUp={handleOnLastKeys}
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
                          onKeyUp={handleOnOtherKeys}
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
                          onKeyUp={handleOnPEmailKeys}
                          onChange={(e) => setEmail(e.target.value)}
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
                        <PhoneInput
                          value={phonex}
                          inputStyle={{ width: "100%" }}
                          buttonStyle={{}}
                          onChange={setPhone}
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <Container>
                  <div className="row">
                    <div className="col-sm-6">
                      <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                        Marital Status
                      </MDTypography>
                      <MDBox mb={2}>
                        <Form.Select
                          onChange={(e) => setMaritalStatus(e.target.value)}
                          value={maritalStatusx || ""}
                          aria-label="Default select example"
                        >
                          <option>---Marital Status---</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                        </Form.Select>
                      </MDBox>
                    </div>
                  </div>
                </Container>

                <Container>
                  <div className="row">
                    <div className="col-sm-6">
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
                      <div className="col-sm-6">
                        <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                          Nationality
                        </MDTypography>
                        <MDBox textAlign="right">
                          <Form.Select
                            value={nationalityx || ""}
                            aria-label="Default select example"
                            onChange={handleOnChangeNationality}
                          >
                            <option>--Select Country--</option>
                            {AlCountry.map((apic) => (
                              <option key={apic.code3} value={apic.name}>
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
                          label="Street"
                          value={residentialStreetx || ""}
                          onKeyUp={handleOnStreetKeys}
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
                          onKeyUp={handleOnCityKeys}
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
                      <div className="col-sm-8">
                        <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                          Country
                        </MDTypography>
                        <MDBox textAlign="right">
                          <Form.Select
                            value={residentialCountryx || ""}
                            aria-label="Default select example"
                            onChange={handleOnChangeRCCountry}
                          >
                            <option>--Select Country--</option>
                            {AlCountry.map((apic) => (
                              <option key={apic.code3} value={apic.name}>
                                {apic.name}
                              </option>
                            ))}
                          </Form.Select>
                        </MDBox>
                      </div>
                    </div>
                  </Container>
                  <Container>
                    <div className="row">
                      <div className="col-sm-8">
                        <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                          State
                        </MDTypography>
                        <MDBox textAlign="right">
                          <Form.Select
                            value={residentialStatex || ""}
                            aria-label="Default select example"
                            onChange={handleOnChangeRCState}
                          >
                            <option>--Select State--</option>
                            {allStates.map((apis) => (
                              <option key={apis.code} value={apis.name}>
                                {apis.name}
                              </option>
                            ))}
                          </Form.Select>
                        </MDBox>
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
        </Grid>
        <Grid item xs={8} md={8} lg={8}>
          <MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={printDocument}
                color="info"
                width="50%"
                align="left"
              >
                Download
              </MDButton>
            </MDBox>
            <Paper
              id="divToPrint"
              sx={{
                display: "flex",
                "& > :not(style)": {
                  width: 2480,
                  height: 3508,
                  maxWidth: 2480,
                  maxHeight: 3508,
                },
              }}
              variant="outlined"
              square
            >
              <Paper
                style={{
                  backgroundColor: "info",
                  width: 720,
                  height: 3508,
                  maxWidth: 720,
                  maxHeight: 3508,
                }}
                variant="outlined"
                square
              >
                {showUser ? (
                  <MDBox>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12} lg={12}>
                        <MDTypography
                          variant="h3"
                          fontWeight="medium"
                          color="text"
                          ml={2}
                          mt={3}
                          mb={-3}
                        >
                          {`${fnamex} ${lnamex} ${onamex}`}
                          <Divider />
                        </MDTypography>
                      </Grid>
                    </Grid>
                    <br />
                    <MDBox id="personalInfo">
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                          <Stack direction="row" spacing={1} ml={2} mb={-4}>
                            <Avatar sx={{ bgcolor: "primary", width: 32, height: 32 }}>
                              <Icon fontSize="medium">person</Icon>
                            </Avatar>
                            <MDTypography variant="h4" fontWeight="medium" color="text">
                              Personal Information
                              <Divider />
                            </MDTypography>
                          </Stack>
                        </Grid>
                      </Grid>
                      <br />
                      <MDBox>
                        <MDTypography variant="h5" fontWeight="medium" color="text" ml={2} mt={1}>
                          Email
                        </MDTypography>
                        <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                          {emailx}{" "}
                        </MDTypography>
                      </MDBox>
                      <MDBox>
                        <MDTypography variant="h5" fontWeight="medium" color="text" ml={2} mt={2}>
                          Phone
                        </MDTypography>
                        <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                          {phonex}{" "}
                        </MDTypography>
                      </MDBox>
                      <MDBox>
                        <MDTypography variant="h5" fontWeight="medium" color="text" ml={2} mt={2}>
                          Residental Area
                        </MDTypography>
                        <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                          {`${residentialCityx} ${residentialStatex}, ${residentialCountryx}`}{" "}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                    <br />
                  </MDBox>
                ) : (
                  <MDBox />
                )}
                {showSkills ? (
                  <MDBox>
                    <MDBox id="skills">
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                          <Stack direction="row" spacing={1} ml={2} mb={-2}>
                            <Avatar sx={{ bgcolor: "primary", width: 32, height: 32 }}>
                              <Icon fontSize="medium">accessibility</Icon>
                            </Avatar>
                            <MDTypography variant="h4" fontWeight="medium" color="text">
                              Skills
                              <Divider />
                            </MDTypography>
                          </Stack>
                        </Grid>
                      </Grid>
                      <MDBox ml={2}>
                        {skillsx.map((item) => (
                          <MDBox key={item.id}>
                            <MDTypography
                              variant="h5"
                              fontWeight="medium"
                              color="text"
                              ml={2}
                              mt={2}
                            >
                              {item.name}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                              {item.descrip}{" "}
                            </MDTypography>
                          </MDBox>
                        ))}
                      </MDBox>
                    </MDBox>
                    <br />
                  </MDBox>
                ) : (
                  <MDBox />
                )}
                <MDBox mb={5}> &nbsp;</MDBox>
              </Paper>
              <Paper
                style={{
                  color: "318CE7",
                  width: 1760,
                  height: 3508,
                  maxWidth: 1760,
                  maxHeight: 3508,
                }}
                variant="outlined"
                square
              >
                <MDBox ml={2} mb={-2} mt={8} />
                {showWorkHistory ? (
                  <MDBox>
                    <MDBox id="workHistory">
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                          <Stack direction="row" spacing={1} ml={2} mb={-2} mt={5}>
                            <Avatar sx={{ bgcolor: "primary", width: 32, height: 32 }}>
                              <Icon fontSize="medium">work_history</Icon>
                            </Avatar>
                            <MDTypography variant="h4" fontWeight="medium" color="text">
                              Work History
                              <Divider />
                            </MDTypography>
                          </Stack>
                        </Grid>
                      </Grid>
                      <MDBox ml={2}>
                        {workHistoryx.map((item) => (
                          <MDBox key={item.id}>
                            <MDTypography
                              variant="h5"
                              fontWeight="medium"
                              color="text"
                              ml={2}
                              mt={2}
                            >
                              {item.name}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="medium" color="text" ml={2}>
                              {item.position}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                              {item.descrip}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                              {changeDateandTime(item.startTime, item.endTime)}
                            </MDTypography>
                          </MDBox>
                        ))}
                      </MDBox>
                    </MDBox>
                  </MDBox>
                ) : (
                  <MDBox />
                )}
                {showEducation ? (
                  <MDBox>
                    <MDBox id="education">
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                          <Stack direction="row" spacing={1} ml={2} mb={-2} mt={5}>
                            <Avatar sx={{ bgcolor: "primary", width: 32, height: 32 }}>
                              <Icon fontSize="medium">school</Icon>
                            </Avatar>
                            <MDTypography variant="h4" fontWeight="medium" color="text">
                              Education
                              <Divider />
                            </MDTypography>
                          </Stack>
                        </Grid>
                      </Grid>
                      <MDBox ml={2}>
                        {educationx.map((item) => (
                          <MDBox key={item.id}>
                            <MDTypography
                              variant="h5"
                              fontWeight="medium"
                              color="text"
                              ml={2}
                              mt={2}
                            >
                              {item.specialization}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="medium" color="text" ml={2}>
                              {item.name}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                              {item.degree} {item.grade}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                              {changeDateandTime(item.startTime, item.endTime)}{" "}
                            </MDTypography>
                          </MDBox>
                        ))}
                      </MDBox>
                    </MDBox>
                  </MDBox>
                ) : (
                  <MDBox />
                )}
                {showPositionHeld ? (
                  <MDBox>
                    <MDBox id="positionHeld">
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                          <Stack direction="row" spacing={1} ml={2} mb={-2} mt={5}>
                            <Avatar sx={{ bgcolor: "primary", width: 32, height: 32 }}>
                              <Icon fontSize="medium">person_outline</Icon>
                            </Avatar>
                            <MDTypography variant="h4" fontWeight="medium" color="text">
                              Position Held
                              <Divider />
                            </MDTypography>
                          </Stack>
                        </Grid>
                      </Grid>
                      <br />
                      <MDBox ml={2}>
                        {positionHeldx.map((item) => (
                          <MDBox key={item.id}>
                            <MDTypography
                              variant="h5"
                              fontWeight="medium"
                              color="text"
                              ml={2}
                              mt={2}
                            >
                              {item.name}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="medium" color="text" ml={2}>
                              {item.place}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                              {item.descrip}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="light" color="text" ml={2}>
                              {changeDateandTime(item.startTime, item.endTime)}{" "}
                            </MDTypography>
                          </MDBox>
                        ))}
                      </MDBox>
                    </MDBox>
                  </MDBox>
                ) : (
                  <MDBox />
                )}
                <MDBox mb={5} />
              </Paper>
            </Paper>
          </MDBox>
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default UserProfile;
