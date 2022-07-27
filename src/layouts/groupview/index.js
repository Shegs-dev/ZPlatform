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
import PHeaders from "postHeader";

function Checkbox() {
  const [namex, setName] = useState("");
  const [groupmembers, setGroupMember] = useState([]);
  const [users, setUsers] = useState([]);
  const [usermembers, setUserMember] = useState([]);

  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();

  const { allGHeaders: miHeaders } = GHeaders();

  const handleOnClick = (e, apix) => {
    e.preventDefault();
    setOpened(true);

    const checks = e.target.checked;
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const orgIDs = data11.orgID;
    if (checks) {
      const raw = JSON.stringify({
        orgID: orgIDs,
        groupID: apix.groupID,
        empID: apix.empID,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      // const headers = miHeaders;
      fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/addMember`, requestOptions)
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
        `${process.env.REACT_APP_SHASHA_URL}/groups/removeMember/${orgIDs}/${apix.groupID}/${apix.empID}`,
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
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
    const orgIDs = data11.orgID;

    const permissionsList = [];
    let isMounted = true;
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

        fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/getByIds/${id}`, {
          headers,
        })
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resultrs) => {
            setOpened(false);
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
              setName(resultrs[0].group.name);
              setGroupMember(resultrs[0].groupMembers);
            }

            // eslint-disable-next-line array-callback-return
            resultd.map((emp) => {
              let check = false;
              if (resultrs[0].groupMembers != null) {
                // eslint-disable-next-line array-callback-return
                resultrs[0].groupMembers.map((member) => {
                  if (member.empID === emp.personal.id) {
                    // if (rolPermi.isCheck === 1) {
                    check = true;
                    // }
                  }
                  // check = false;
                });
              }

              const pObj = {
                groupID: id,
                empID: emp.personal.id,
                fname: emp.personal.fname,
                lname: emp.personal.lname,
                isCheck: check,
              };

              permissionsList.push(pObj);
            });
            console.log(users);
            console.log(groupmembers);
            setUserMember(permissionsList);
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
            {namex}
          </MDTypography>
        </MDBox>
        <MDBox pt={0} px={4}>
          &nbsp;
          <Form>
            {usermembers.map((api) => (
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
export default Checkbox;
