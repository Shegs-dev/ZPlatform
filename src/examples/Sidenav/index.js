/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, NavLink, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import SearchIcon from "@mui/icons-material/Search";
// import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

// Material Dashboard 2 React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import bgImage from "assets/images/plutospace-1.png";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";

import GHeaders from "getHeader";
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";
import defaulto from "./defaulto.png";

// Material Dashboard 2 PRO React context

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/authentication/sign-in", { replace: true });
    window.location.reload();
  };

  const userOData = JSON.parse(localStorage.getItem("MonoUserOtherDets"));

  let userFullName = "";
  if (userOData !== null) {
    // eslint-disable-next-line prefer-template
    userFullName = userOData.personal.fname + " " + userOData.personal.lname;
  }
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  const [newRenderRoutes, setNewRenderRoutes] = useState(routes);
  // const [newRenderRoutes2, setNewRenderRoutes2] = useState(routes);
  // const newRenderRoutes2 = routes;
  // // Render all the routes from the routes.js (All the visible items on the Sidenav)
  // const renderRoutes = newRenderRoutes.map(
  //   ({ type, name, icon, title, noCollapse, key, href, route }) => {
  //     let returnValue;

  //     if (type === "collapse") {
  //       returnValue = href ? (
  //         <Link
  //           href={href}
  //           key={key}
  //           target="_blank"
  //           rel="noreferrer"
  //           sx={{ textDecoration: "none" }}
  //         >
  //           <SidenavCollapse
  //             name={name}
  //             icon={icon}
  //             active={key === collapseName}
  //             noCollapse={noCollapse}
  //           />
  //         </Link>
  //       ) : (
  //         <NavLink key={key} to={route}>
  //           <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
  //         </NavLink>
  //       );
  //     } else if (type === "title") {
  //       returnValue = (
  //         <MDTypography
  //           key={key}
  //           color={textColor}
  //           display="block"
  //           variant="caption"
  //           fontWeight="bold"
  //           textTransform="uppercase"
  //           pl={3}
  //           mt={2}
  //           mb={1}
  //           ml={1}
  //         >
  //           {title}
  //         </MDTypography>
  //       );
  //     } else if (type === "divider") {
  //       returnValue = (
  //         <Divider
  //           key={key}
  //           light={
  //             (!darkMode && !whiteSidenav && !transparentSidenav) ||
  //             (darkMode && !transparentSidenav && whiteSidenav)
  //           }
  //         />
  //       );
  //     }

  //     return returnValue;
  //   }
  // );
  // Function to search table
  const searchFunc = (val) => {
    // const input = document.getElementById("search").value;
    // console.log(routes);
    const input = val;
    const filter = input.toUpperCase();
    const jsonData = [];
    const jsonData2 = [];
    // eslint-disable-next-line array-callback-return
    routes.map((item) => {
      if (item.name) {
        let docName = item.name;
        if (docName == null) {
          docName = "";
        }
        if (
          item.name.toUpperCase().indexOf(filter) > -1 ||
          docName.toUpperCase().indexOf(filter) > -1
        ) {
          jsonData.push(item);
        }
      }
      // } else if (item.title) {
      //   let docTitle = item.title;
      //   if (docTitle == null) {
      //     docTitle = "";
      //   }
      //   if (
      //     docTitle.toUpperCase().indexOf(filter) > -1
      //     item.title.toUpperCase().indexOf(filter) > -1 ||
      //   ) {
      //     jsonData.push(item);
      //   }
      // }
    });
    // eslint-disable-next-line array-callback-return
    routes.map((item) => {
      if (item.name) {
        jsonData2.push(item);
      }
    });
    if (jsonData2.length === jsonData.length) {
      setNewRenderRoutes(routes);
    } else {
      setNewRenderRoutes(jsonData);
    }
  };

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = newRenderRoutes.map(
    ({ type, name, icon, title, noCollapse, key, href, route }) => {
      let returnValue;

      if (type === "collapse") {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <NavLink key={key} to={route}>
            <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
          </NavLink>
        );
      } else if (type === "title") {
        returnValue = (
          <MDTypography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </MDTypography>
        );
      } else if (type === "divider") {
        returnValue = (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }

      return returnValue;
    }
  );

  // useEffect for company image
  const [link, setLink] = useState("");
  const [isImg, setIsImg] = useState(false);
  const { allGHeaders: miHeaders } = GHeaders();
  const styles = {
    image: { width: 150, height: 100, borderRadius: 20, marginBottom: 10, marginTop: 10 },
  };

  const handleGetImage = () => {
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    if (data11 !== null) {
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
              setLink(resultxx[0]);
              if (resultxx.length === 0) {
                setIsImg(false);
              } else {
                setIsImg(true);
              }
            });
        });
    }
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

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <MDBox component="img" src={bgImage} alt="Brand" width="10rem" />}
        </MDBox>
        <br />
        <MDBox
          variant="gradient"
          bgColor="secondary"
          borderRadius="lg"
          coloredShadow="light"
          onClick={() => navigate("/user-Profile")}
        >
          {isImg ? (
            <img src={link} style={styles.image} alt="Thumb" />
          ) : (
            <img src={defaulto} style={styles.image} alt="default" />
          )}
          <MDTypography
            color="white"
            display="block"
            variant="h6"
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="70%"
          >
            {userFullName}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox align="center" sx={{ align: "center" }}>
        <TextField
          id="outlined-search"
          placeholder="Search"
          type="search"
          // sx={{ input: { backgroundColor: "white" } }}
          onKeyUp={(e) => searchFunc(e.target.value)}
          InputProps={{
            style: { color: "red", backgroundColor: "white" },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
        />
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
      <MDBox p={2} mt="auto">
        <MDButton variant="gradient" color="info" onClick={handleLogOut} fullWidth>
          Sign Out
        </MDButton>
      </MDBox>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
