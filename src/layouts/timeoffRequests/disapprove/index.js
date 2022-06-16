import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import { Form } from "react-bootstrap";
import MDButton from "components/MDButton";
import { useEffect, useState } from "react";
import GHeaders from "getHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";

function Disapprove() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [idx, setIdx] = useState("");
  const [empSetupIdx, setEmpSetupIdx] = useState("");
  const [daysx, setDaysx] = useState("");
  // const [daysapprovex, setDaysapprovex] = useState("");
  const [startx, setStartx] = useState("");
  const [endx, setEndx] = useState("");
  const [resumex, setResumex] = useState("");
  const [dutyrelieverx, setDutyrelieverx] = useState("");
  const [createdx, setCreatedx] = useState("");
  const [purposex, setPurposex] = useState("");
  const [deletex, setDeletex] = useState("");
  const [approvex, setApprovex] = useState("");
  const [adminx, setAdminx] = useState("");
  const [reasonx, setReasonx] = useState("");
  const [dbreasonx, setDBReasonx] = useState("");

  // const [disapprove, setDisapprove] = useState("");

  const handleDisApprove = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    // const ids = data11.id;
    const personalIds = data11.personalID;
    const orgIDs = data11.orgID;

    if (approvex !== personalIds) {
      MySwal.fire({
        title: "PROCESS_DENIED",
        type: "success",
        text: "You Are Not Permitted To Approve This Request",
      }).then(() => {
        navigate("/Time-Off-Type");
      });
    } else if (dbreasonx !== null && dbreasonx !== "") {
      MySwal.fire({
        title: "PROCESS_DENIED",
        type: "success",
        text: "Decision Already Made For This Request",
      }).then(() => {
        navigate("/Time-Off-Type");
      });
    } else {
      const raw = JSON.stringify({
        id: idx,
        orgID: orgIDs,
        empID: personalIds,
        empSetupID: empSetupIdx,
        noOfDaysRequested: daysx,
        noOfDaysApproved: 0,
        startDate: startx,
        endDate: endx,
        resumptionDate: resumex,
        dutyRelieverID: dutyrelieverx,
        createdDate: createdx,
        purpose: purposex,
        deleteFlag: deletex,
        approverID: approvex,
        adminID: adminx,
        reasonForDisapproval: reasonx,
        status: 2,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/update`,
        requestOptions
      )
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          // setOpened(false);
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
            navigate("/Time-Off-Type");
          });
        })
        .catch((error) => {
          // setOpened(false);
          MySwal.fire({
            title: error.status,
            type: "error",
            text: error.message,
          });
        });
    }
  };

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/getByIds/${ids}`, {
      headers,
    })
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
          // eslint-disable-next-line eqeqeq
          if (result.length != 0) {
            setIdx(result[0].id);
            setEmpSetupIdx(result[0].empSetupID);
            setDaysx(result[0].noOfDaysRequested);
            // setDaysapprovex(result[0].noOfDaysApproved);
            setStartx(result[0].startDate);
            setEndx(result[0].endDate);
            setResumex(result[0].resumptionDate);
            setDutyrelieverx(result[0].dutyRelieverID);
            setCreatedx(result[0].createdDate);
            setPurposex(result[0].purpose);
            setDeletex(result[0].deleteFlag);
            setApprovex(result[0].approverID);
            setAdminx(result[0].adminID);
            setDBReasonx(result[0].reasonForDisapproval);
          } else {
            setIdx(null);
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
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="setPurposex"
                placeholder="Description"
                value={reasonx || ""}
                onChange={(e) => setReasonx(e.target.value)}
              >
                <Form.Label>Reason For Disapproval</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
            {/* <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="disapprove"
                id="disapprove"
                //  onChange={handleOnChange}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control }
              <label className="form-check-label" htmlFor="disapprove">
                Disapprove
              </label>
            </div> */}
            <div className="col-sm-6">
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  onClick={handleDisApprove}
                  color="info"
                  width="50%"
                  align="right"
                >
                  Disapprove
                </MDButton>
              </MDBox>
            </div>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default Disapprove;
