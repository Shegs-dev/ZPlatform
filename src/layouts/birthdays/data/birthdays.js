// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { Dropdown } from "react-bootstrap";
// import Icon from "@mui/material/Icon";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { Container, Form } from "react-bootstrap";
// import MDInput from "components/MDInput";
import DataTable from "examples/Tables/DataTable";
import Card from "@mui/material/Card";
import Swal from "sweetalert2";
import MDButton from "components/MDButton";
import withReactContent from "sweetalert2-react-content";

function Birthdays() {
  const MySwal = withReactContent(Swal);
  const [dayx, setDayx] = useState("");
  const [monthx, setMonthx] = useState("");
  // const [enabled, setEnabled] = useState("");
  // const [checkedNumbers, setCheckedNumbers] = useState("");

  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  // const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handleClick = (e) => {
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;

    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getBirthdaysToday/${orgIDs}/${dayx}/${monthx}`, {
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
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (result.length === 0) {
          document.getElementById("number").innerHTML = "No Birthdays for this Day<br>";
        }
        setItems(result);
      })
      .catch((error) => {
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };
  console.log();

  const bcolumns = [
    { Header: "ID", accessor: "personal.id", align: "left" },
    { Header: "Name", accessor: "personal.fname", align: "left" },
    { Header: "Phone Number", accessor: "personal.pno", align: "left" },
    { Header: "Country", accessor: "personal.residentialCountry", align: "left" },
    { Header: "Marital status", accessor: "personal.maritalStatus", align: "left" },
    //   {
    //     Header: "actions",
    //     accessor: "id",
    //     // eslint-disable-next-line react/prop-types
    //     Cell: ({ cell: { value } }) => (
    //       <div
    //         style={{
    //           width: "100%",
    //           backgroundColor: "#dadada",
    //           borderRadius: "2px",
    //         }}
    //       >
    //         <Dropdown>
    //           <Dropdown.Toggle variant="secondary" id="dropdown-basic">
    //             <Icon sx={{ fontWeight: "light" }}>settings</Icon>
    //           </Dropdown.Toggle>

    //           <Dropdown.Menu>
    //             <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item>
    //             {/* <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item> */}
    //           </Dropdown.Menu>
    //         </Dropdown>
    //       </div>
    //     ),
    //     align: "left",
    //   },
  ];

  //   const handleOnNumberKeys = () => {
  //     const numbers = /^[0-9 ]+$/;
  //     if (!dayx.match(numbers)) {
  //       setCheckedNumbers(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("number").innerHTML = "input only Numbers<br>";
  //     }
  //     if (dayx.match(numbers)) {
  //       setCheckedNumbers(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("number").innerHTML = "";
  //     }
  //     if (dayx.length === 0) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("number").innerHTML = "A date and month is required<br>";
  //     }
  //     setEnabled(checkedNumbers === true);
  //   };

  //   const handleOnMonthKeys = () => {
  //     const numbers = /^[0-9 ]+$/;
  //     if (!monthx.match(numbers)) {
  //       setCheckedMonth(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("number").innerHTML = "Input only numbers<br>";
  //     }
  //     if (monthx.match(numbers)) {
  //       setCheckedMonth(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("numbers").innerHTML = "";
  //     }
  //     if (monthx.length === 0) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("numbers").innerHTML = "A Month is required<br>";
  //     }
  //     setEnabled(checkedMonth === true);
  //   };

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
            <MDTypography variant="h4" fontWeight="medium" color="white" textAlign="center" mt={1}>
              Birthdays
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
            <MDTypography variant="gradient" fontSize="60%" color="white" id="number">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form" name="form1">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  {/* <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="Day Of Birth *"
                      value={dayx || ""}
                      onKeyUp={handleOnNumberKeys}
                      onChange={(e) => setDayx(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div> */}
                  <div className="col-sm-6">
                    <MDBox mb={2}>
                      <MDTypography variant="button" fontWeight="regular" color="text">
                        Date Of Birth
                      </MDTypography>
                      <Form.Select
                        // onChange={handleonChangeTimeOffTime}
                        aria-label="Default select example"
                        value={dayx || ""}
                        onChange={(e) => setDayx(e.target.value)}
                      >
                        <option>---Day---</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                      </Form.Select>
                    </MDBox>
                  </div>
                </div>

                {/* <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={monthx || ""}
                      onKeyUp={handleOnNumberKeys}
                      onChange={(e) => setMonthx(e.target.value)}
                      label="Month"
                      variant="standard"
                      fullWidth
                    />
                  </div> */}
                <div className="col-sm-6">
                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Month
                    </MDTypography>
                    <Form.Select
                      // onChange={handleonChangeTimeOffTime}
                      aria-label="Default select example"
                      value={monthx || ""}
                      onChange={(e) => setMonthx(e.target.value)}
                    >
                      <option>---Month---</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </Form.Select>
                  </MDBox>
                </div>
              </Container>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  onClick={handleClick}
                  // disabled={!enabled}
                  color="info"
                  width="50%"
                  align="center"
                >
                  Fetch
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox>
        <DataTable
          table={{ columns: bcolumns, rows: items }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>
    </DashboardLayout>
  );
}

export default Birthdays;
