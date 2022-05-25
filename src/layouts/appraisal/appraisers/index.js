import { Form } from "react-bootstrap";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useState, useEffect, React } from "react";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import PHeaders from "postHeader";

function Appraisers() {
  const MySwal = withReactContent(Swal);

  const [opened, setOpened] = useState(false);
  const [users, setUsers] = useState([]);
  const [appraisers, setAppraisers] = useState([]);
  const [appraisersUser, setAppraisersUsers] = useState([]);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();

  const { allGHeaders: miHeaders } = GHeaders();

  const handleOnClick = (e, apix) => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const checks = e.target.checked;
    if (checks) {
      const raw = JSON.stringify({
        orgID: orgIDs,
        appraisalID: id,
        empID: apix.empID,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/appraisers/add`, requestOptions)
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
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const requestOptions = {
        method: "DELETE",
        headers: miHeaders,
      };
      fetch(
        `${process.env.REACT_APP_SHASHA_URL}/appraisal/appraisers/remove/${apix.id}`,
        requestOptions
      )
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((resx) => {
          setOpened(false);
          if (resx.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (resx.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (resx.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
          }
          MySwal.fire({
            title: resx.status,
            type: "success",
            text: resx.message,
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

  // useEffect(() => {
  //   setOpened(true);
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const id = urlParams.get("id");
  //   const data11 = JSON.parse(localStorage.getItem("empID"));
  //   const orgIDs = data11.orgID;
  //   const headers = miHeaders;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/appraisers/get/${id}`, { headers })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((resultg) => {
  //       // setOpened(false);
  //       if (resultg.message === "Expired Access") {
  //         navigate("/authentication/sign-in");
  //       }
  //       if (resultg.message === "Token Does Not Exist") {
  //         navigate("/authentication/sign-in");
  //       }
  //       if (resultg.message === "Unauthorized Access") {
  //         navigate("/authentication/forbiddenPage");
  //       }
  //       if (isMounted) {
  //         setRolName(resultg[0].name);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // });

  useEffect(() => {
    // setOpened(true);
    const usersList = [];
    let isMounted = true;

    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
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
          setUsers(resultd);
        }

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get("id");
        fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/appraisers/gets/${orgIDs}/${id}`, {
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
              setAppraisers(resultrs);
            }

            // eslint-disable-next-line array-callback-return
            resultd.map((usr) => {
              let check = false;
              let idx = null;
              if (resultrs != null) {
                // eslint-disable-next-line array-callback-return
                resultrs.map((rolPermi) => {
                  if (rolPermi.empID === usr.personal.id) {
                    check = true;
                    idx = rolPermi.id;
                  }
                  // check = false;
                });
              }

              const pObj = {
                id: idx,
                empID: usr.personal.id,
                fname: usr.personal.fname,
                lname: usr.personal.lname,
                isCheck: check,
              };

              usersList.push(pObj);
            });
            console.log(users);
            console.log(appraisers);
            setAppraisersUsers(usersList);
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
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={30}
          mt={2}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" textAlign="center" mt={1}>
            Set Appraisers
          </MDTypography>
        </MDBox>
        <MDBox pt={0} px={4}>
          &nbsp;
          <Form>
            {appraisersUser.map((api) => (
              <div key={api.empID} className="mb-3">
                <Form.Check type="checkbox">
                  <Form.Check.Input
                    type="checkbox"
                    defaultChecked={api.isCheck}
                    onClick={(e) => handleOnClick(e, api)}
                  />
                  <Form.Check.Label>
                    {api.fname} {api.lname}
                  </Form.Check.Label>
                </Form.Check>
              </div>
            ))}
          </Form>
        </MDBox>
      </Card>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
export default Appraisers;
