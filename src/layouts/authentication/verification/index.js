import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";

function Verification() {
  const MySwal = withReactContent(Swal);

  const [typex, setType] = useState("");
  const [numberx, setNumber] = useState("");
  //   const [selectedImage, setSelectedImage] = useState();
  //   const [imgChanged, setImgChanged] = useState(false);
  const [checkedType, setCheckedType] = useState("");
  const [checkedNumber, setCheckedNumber] = useState("");
  const [files, setFiles] = useState();

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();

  const handleOnTypeKeys = (valuee) => {
    const value = valuee.toString();
    if (value.length <= 0) {
      setCheckedType(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("type").innerHTML = "Type is required<br>";
    }
    if (value.length > 0) {
      setCheckedType(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("type").innerHTML = "";
    }
  };

  const handleOnNumberKeys = (valuee) => {
    const value = valuee.toString();
    if (value.length <= 0) {
      setCheckedNumber(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("number").innerHTML = "Number is required<br>";
    }
    if (value.length > 0) {
      setCheckedNumber(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("number").innerHTML = "";
    }
  };

  const handleClick = (e, imgUrl) => {
    // setOpened(true);
    e.preventDefault();
    const lastResult = JSON.parse(localStorage.getItem("id"));
    const id = lastResult;

    const raw = JSON.stringify({
      userId: id,
      type: typex,
      number: numberx,
      document: {
        id: imgUrl.id,
        name: imgUrl.name,
        displayName: imgUrl.displayName,
        key: imgUrl.key,
        type: imgUrl.type,
        createdTime: imgUrl.createdTime,
        deleteFlag: imgUrl.deleteFlag,
      },
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      `${process.env.REACT_APP_ZPLATFORM_URL}/users/upload-verification-document`,
      requestOptions
    )
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
        return res.json();
      })
      .then((result) => {
        localStorage.setItem("lastResult", result);
        setOpened(false);
        MySwal.fire({
          title: "SUCCESS",
          type: "success",
          text: "Upload Successful",
        }).then(() => {
          navigate("/dashboard");
        });
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: "ERROR",
          type: "error",
          text: error.message,
        });
      });
  };

  const handleValidate = (e) => {
    handleOnTypeKeys(typex);
    handleOnNumberKeys(numberx);
    if (checkedNumber && checkedType === true) {
      console.log("Nozzzzw");
      console.log("XXxxccbaaaXY");
      if (files !== "" && files !== 0) {
        console.log("XXXYmmmmm");
        if (files === undefined) {
          MySwal.fire({
            title: "INVALID_INPUT",
            type: "error",
            text: "Please input a file",
          });
        } else {
          console.log("XXXY");
          setOpened(true);
          e.preventDefault();
          // Headers for upload image
          const iiHeaders = new Headers();

          const dateQ = new Date().getTime();
          const imgKey = `USR-VER-${dateQ}`;

          const formData = new FormData();
          formData.append("file", files[0]);
          formData.append("key", imgKey);
          formData.append("type", files[0].type);

          const raw = formData;

          const requestOptions = {
            method: "POST",
            headers: iiHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(`${process.env.REACT_APP_ZPLATFORM_URL}/media/uploadFile`, requestOptions)
            .then((res) => {
              if (!res.ok) {
                return res.text().then((text) => {
                  throw new Error(text);
                });
              }
              return res.json();
            })
            .then((result) => {
              console.log(result);
              if (result.length === 0) {
                setOpened(false);
                MySwal.fire({
                  title: "INVALID_DOCUMENT",
                  type: "error",
                  text: "There is no document present",
                });
              } else {
                handleClick(e, result.data);
              }
            });
        }
      } else {
        MySwal.fire({
          title: "INVALID_DOCUMENT",
          type: "error",
          text: "There is no document present",
        });
      }
    }
  };

  const previewImage = (e) => {
    setFiles(e.target.files);
    console.log("here");
    if (e.target.files[0].size > 522240) {
      // setImgChanged(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML = "File should not exceed 500kb<br>";
      console.log("herexxx");
    } else {
      //   setSelectedImage(e.target.files[0]);
      //   setImgChanged(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML = "";
      console.log("hereaaaa");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={20}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            // style={{ backgroundColor: "#f96d02" }}
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Upload Verification Document
            </MDTypography>
          </MDBox>
          <MDBox
            variant="gradient"
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            borderRadius="lg"
            coloredShadow="success"
            mx={3}
            mt={1}
            p={1}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="gradient" fontSize="60%" color="error" id="type">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="number">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={0}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDBox>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
                        color="text"
                      >
                        Verification Type *
                      </MDTypography>
                      <Form.Select
                        onChange={(e) => setType(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">--Select Verification Type--</option>
                        <option value="National Identification Number">
                          National Identification Number
                        </option>
                        <option value="Passport Number">Passport Number</option>
                      </Form.Select>
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            &nbsp;
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDInput
                      type="text"
                      label="Number"
                      value={numberx || ""}
                      onChange={(e) => setNumber(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            &nbsp;
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <div>
                      <MDTypography
                        fontSize="70%"
                        // variant="h6"
                        // style={{
                        //   color: "#318CE7",
                        //   borderColor: "#318CE7",
                        //   borderWidth: "5",
                        //   borderStyle: "solid",
                        //   borderRadius: "5",
                        // }}
                        // fontWeight="medium"
                        // color="white"
                      >
                        Add Profile Image
                      </MDTypography>
                      <MDInput type="file" files={files} onChange={previewImage} />
                      <p id="imageVal" style={{ color: "red", fontSize: 13 }}>
                        <i> </i>
                      </p>

                      {/* {imgChanged ? (
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          style={{ maxWidth: "50%", maxHeight: "50%", borderRadius: 5 }}
                          alt="Thumb"
                        />
                      ) : (
                        <div />
                      )} */}
                    </div>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleValidate}
                color="info"
                width="50%"
                align="left"
              >
                Save
              </MDButton>
            </MDBox>
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

export default Verification;
