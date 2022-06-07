import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import announcementtype from "layouts/announcementtype/data/announcementtype";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";

// announcement images
import AnnounceIcon from "assets/annoucement-images/AnnounceIcon.png";
import ArrivalIcon from "assets/annoucement-images/ArrivalIcon.png";
import CelebrateIcon from "assets/annoucement-images/CelebrateIcon.png";
import DeathIcon from "assets/annoucement-images/DeathIcon.png";
import DepartureIcon from "assets/annoucement-images/DepartureIcon.png";
import ListIcon from "assets/annoucement-images/ListIcon.png";
import MeetingIcon from "assets/annoucement-images/MeetingIcon.png";

function Announcementtype() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = announcementtype();

  const allImages = [
    {
      id: "1",
      image: AnnounceIcon,
      name: "AnnounceIcon",
    },
    {
      id: "2",
      image: ArrivalIcon,
      name: "ArrivalIcon",
    },
    {
      id: "3",
      image: CelebrateIcon,
      name: "CelebrateIcon",
    },
    {
      id: "4",
      image: DeathIcon,
      name: "DeathIcon",
    },
    {
      id: "5",
      image: DepartureIcon,
      name: "DepartureIcon",
    },
    {
      id: "6",
      image: ListIcon,
      name: "ListIcon",
    },
    {
      id: "7",
      image: MeetingIcon,
      name: "MeetingIcon",
    },
  ];

  const [namex, setName] = useState("");
  const [descripx, setDescrip] = useState("");
  const [curImage, setCurImage] = useState("/static/media/AnnounceIcon.0b47feac.png");
  const [iconx, setIcon] = useState("AnnounceIcon");

  const [showIcons, setShowIcons] = useState(false);

  const [checkedName, setCheckedName] = useState("");
  const [enabled, setEnabled] = useState("");

  const [color, setColor] = useState("");
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();

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
    setEnabled(checkedName === true);
  };

  const handleClick = (e) => {
    handleOnNameKeys();
    if (enabled) {
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const raw = JSON.stringify({
        orgID: orgIDs,
        name: namex,
        colorCode: color,
        descrip: descripx,
        icon: curImage,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_SHASHA_URL}/announcementtype/add`, requestOptions)
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
    }
  };

  const handleShowIcons = () => {
    setShowIcons(true);
  };

  const handleCloseCard = () => {
    setShowIcons(false);
  };

  const handleIcons = (image, imageCode) => {
    setCurImage(imageCode);
    setIcon(image);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
              Add Annoucement Type
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
          <MDBox component="form" role="form" name="form1">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="Name*"
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
                      value={descripx || ""}
                      onChange={(e) => setDescrip(e.target.value)}
                      label="Description"
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
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Color Code
                    </MDTypography>
                    <MDBox mt={0}>
                      <input
                        type="color"
                        className="form-control"
                        style={{ width: "70%" }}
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </MDBox>
                  </MDBox>
                </div>
                <div>
                  {showIcons ? (
                    <Card variant="gradient" color="info" sx={{ width: 760 }}>
                      <Container>
                        <div className="row">
                          {allImages.map((apic) => (
                            <div className="col-sm-3" key={apic.id}>
                              <MDBox>
                                <MDButton
                                  onClick={() => handleIcons(apic.name, apic.image)}
                                  variant={(apic.name === iconx && "gradient") || "text"}
                                  width="80%"
                                  color="info"
                                >
                                  <img src={apic.image} alt="Icon" width="96" height="96" />
                                </MDButton>
                              </MDBox>
                            </div>
                          ))}
                        </div>
                      </Container>
                      <MDButton
                        variant="gradient"
                        onClick={handleCloseCard}
                        color="error"
                        width="50%"
                      >
                        Close
                      </MDButton>
                    </Card>
                  ) : (
                    <MDBox mt={2}>
                      <Container>
                        <div className="row">
                          <div className="col-sm-2">
                            <MDButton
                              variant="gradient"
                              onClick={handleShowIcons}
                              color="info"
                              width="50%"
                            >
                              Choose Icon
                            </MDButton>
                          </div>
                          <div className="col-sm-6">
                            <MDButton variant="outlined" color="info" width="50%">
                              <img src={curImage} alt="Icon" width="78" height="78" />
                            </MDButton>
                          </div>
                        </div>
                      </Container>
                    </MDBox>
                  )}
                </div>
              </div>
            </Container>
            <MDBox mt={2} mb={2}>
              <MDButton variant="gradient" onClick={handleClick} color="info" width="50%">
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: pRows }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Announcementtype;
