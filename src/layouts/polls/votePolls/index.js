import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";

function VotePolls() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const { allGHeaders: miHeaders } = GHeaders();
  const { allPHeaders: myHeaders } = PHeaders();

  const [responsex, setResponsex] = useState("");
  const [items, setItems] = useState("");

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const ids = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/poll/getByIds/${ids}`, { headers })
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
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const groupids = urlParams.get("id");

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const personalIds = data11.id;
    const raw = JSON.stringify({
      orgID: orgIDs,
      groupID: groupids,
      empID: personalIds,
      response: responsex,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_KUBU_URL}/poll/add`, requestOptions)
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

  return (
    <Card>
      <MDBox>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Options</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={items}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value={responsex || ""}
              control={<Radio />}
              // label={responsex || ""}
              onChange={(e) => setResponsex(e.target.value)}
            />
            {/* <FormControlLabel value={responsex || ""} control={<Radio />} label="Male" />
            <FormControlLabel value={responsex || ""} control={<Radio />} label="Other" /> */}
          </RadioGroup>
        </FormControl>
        <MDBox mt={4} mb={1}>
          <MDButton
            variant="gradient"
            onClick={(e) => handleClick(e)}
            // disabled={!enabled}
            color="info"
            width="50%"
            align="center"
          >
            Update
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default VotePolls;
