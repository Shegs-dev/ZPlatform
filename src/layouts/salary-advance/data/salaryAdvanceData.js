/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function SalaryAdvanceData() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();
  // Method to handle update
  const handleUpdate = (
    idx,
    orgIDx,
    empIDx,
    amountx,
    createdTimex,
    commentx,
    approverIDx,
    statusx,
    deleteFlagx
  ) => {
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDx,
      empID: empIDx,
      amount: amountx,
      createdTime: createdTimex,
      deleteFlag: deleteFlagx,
      comment: commentx,
      approverID: approverIDx,
      status: statusx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_TANTA_URL}/salaryAdvance/update`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resx) => {
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
  };

  // Method to filter departments
  const handleDisapprove = (value) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const filteredItems = items.filter((item) => item.id === value);
    // Avoid filter for empty string
    if (data11.personalID !== filteredItems[0].approverID) {
      MySwal.fire({
        title: "APPROVER_ERROR",
        type: "error",
        text: "You Are Not The Approver For This Request",
      }).then(() => {
        window.location.reload();
      });
    } else if (filteredItems[0].status !== 0) {
      MySwal.fire({
        title: "DECISION_MADE",
        type: "error",
        text: "You Cannot Change The Decision Already Made For This Request",
      }).then(() => {
        window.location.reload();
      });
    } else {
      MySwal.fire({
        title: "Add Comment",
        html: `<textarea rows="9" id="comment" class="form-control"></textarea>`,
        confirmButtonText: "Save",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        preConfirm: () => {
          const comment = Swal.getPopup().querySelector("#comment").value;
          if (comment.length === 0) {
            Swal.showValidationMessage(`Please enter a comment`);
          } else {
            Swal.resetValidationMessage();
            handleUpdate(
              filteredItems[0].id,
              filteredItems[0].orgID,
              filteredItems[0].empID,
              filteredItems[0].amount,
              filteredItems[0].createdTime,
              comment,
              filteredItems[0].approverID,
              2,
              filteredItems[0].deleteFlag
            );
          }
        },
      });
    }
  };

  // Method to handle diable
  const handleDisable = (value) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(`${process.env.REACT_APP_TANTA_URL}/salaryAdvance/delete/${value}`, requestOptions)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resx) => {
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
    });
  };

  // Method to handle approval
  const handleApprove = (value) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const filteredItems = items.filter((item) => item.id === value);
    if (data11.personalID !== filteredItems[0].approverID) {
      MySwal.fire({
        title: "APPROVER_ERROR",
        type: "error",
        text: "You Are Not The Approver For This Request",
      }).then(() => {
        window.location.reload();
      });
    } else if (filteredItems[0].status !== 0) {
      MySwal.fire({
        title: "DECISION_MADE",
        type: "error",
        text: "You Cannot Change The Decision Already Made For This Request",
      }).then(() => {
        window.location.reload();
      });
    } else {
      MySwal.fire({
        title: "Are you sure?",
        text: "Do you want to approve this?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Approve it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const headers = miHeaders;

          const personalIDs = data11.personalID;
          const orgIDx = data11.orgID;
          fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getUserInfo/${orgIDx}/${personalIDs}`, {
            headers,
          })
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resultx) => {
              if (resultx.message === "Expired Access") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resultx.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resultx.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
                window.location.reload();
              }

              const narrationx = `Salary Advance For ${resultx.personal.fname} ${resultx.personal.lname}`;
              // Check if Bank Code And Destination Code Are Set
              if (resultx.bankAccount === null) {
                MySwal.fire({
                  title: "DECISION_REFUSED",
                  type: "error",
                  text: "This Decision Cannot Happen Because There Is No Bank Account Set For Employee. Please See Your System Administrator Afterwards",
                });
              } else {
                const raw1 = JSON.stringify({
                  amount: filteredItems[0].amount,
                  narration: narrationx,
                  destinationBankCode: resultx.bankAccount.bankCode,
                  destinationAccountNumber: resultx.bankAccount.acctNo,
                });
                const requestOptions1 = {
                  method: "POST",
                  headers: myHeaders,
                  body: raw1,
                  redirect: "follow",
                };

                fetch(
                  `${process.env.REACT_APP_TANTA_URL}/salaryAdvance/pay/${orgIDx}`,
                  requestOptions1
                )
                  .then(async (res) => {
                    const aToken = res.headers.get("token-1");
                    localStorage.setItem("rexxdex", aToken);
                    return res.json();
                  })
                  .then((resultpay) => {
                    if (resultpay.message === "Expired Access") {
                      navigate("/authentication/sign-in");
                      window.location.reload();
                    }
                    if (resultpay.message === "Token Does Not Exist") {
                      navigate("/authentication/sign-in");
                      window.location.reload();
                    }
                    if (resultpay.message === "Unauthorized Access") {
                      navigate("/authentication/forbiddenPage");
                      window.location.reload();
                    }
                    if (resultpay.status === "SUCCESS") {
                      handleUpdate(
                        filteredItems[0].id,
                        filteredItems[0].orgID,
                        filteredItems[0].empID,
                        filteredItems[0].amount,
                        filteredItems[0].createdTime,
                        filteredItems[0].comment,
                        filteredItems[0].approverID,
                        1,
                        filteredItems[0].deleteFlag
                      );
                    } else {
                      MySwal.fire({
                        title: resultpay.status,
                        type: "success",
                        text: resultpay.message,
                      }).then(() => {
                        window.location.reload();
                      });
                    }
                  })
                  .catch((error) => {
                    MySwal.fire({
                      title: error.status,
                      type: "error",
                      text: error.message,
                    });
                  });
              }
            });
        }
      });
    }
  };

  // Method to setup update
  const handleShow = (value) => {
    navigate(`/Salary-Advance/Update?id=${value}`);
  };

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  // Method to change type
  const changeType = (status) => {
    const filteredItems = items.filter((item) => item.id === status);
    if (filteredItems[0].status === 1) {
      return "Approved";
    }
    if (filteredItems[0].status === 2) {
      return "Disapproved";
    }
    return "Created";
  };

  const changeCol = (status) => {
    const filteredItems = items.filter((item) => item.id === status);
    if (filteredItems[0].status === 1) {
      return "#00FF00";
    }
    if (filteredItems[0].status === 2) {
      return "#FF0000";
    }
    return "#0000FF";
  };

  // Method to fetch all departments
  // env.environments
  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;

    if (
      data11.roleID !== "0" &&
      data11.roleID !== "" &&
      data11.roleID !== "null" &&
      data11.roleID !== null
    ) {
      const personalIds = data11.personalID;
      fetch(`${process.env.REACT_APP_TANTA_URL}/salaryAdvance/getForEmp/${orgIDs}/${personalIds}`, {
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
            setItems(result);
          }
        });
    } else {
      fetch(`${process.env.REACT_APP_TANTA_URL}/salaryAdvance/gets/${orgIDs}`, { headers })
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
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Return table
  return {
    columns: [
      { Header: "employee name", accessor: "empName", align: "left" },
      { Header: "amount (ngn)", accessor: "amount", align: "left" },
      { Header: "comment", accessor: "comment", align: "left" },
      { Header: "approver", accessor: "approverName", align: "left" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell: { row } }) => (
          <span
            className="badge badge-pill"
            style={{ backgroundColor: changeCol(row.original.id) }}
          >
            {changeType(row.original.id)}
          </span>
        ),
        align: "left",
      },
      {
        Header: "Date Created",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeDate(value),
        align: "left",
      },
      {
        Header: "actions",
        accessor: "id",
        // eslint-disable-next-line react/prop-types
        Cell: ({ cell: { value } }) => (
          <div
            style={{
              width: "100%",
              backgroundColor: "#dadada",
              borderRadius: "2px",
            }}
          >
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <Icon sx={{ fontWeight: "light" }}>settings</Icon>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleShow(value)}>Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisapprove(value)}>Disapprove</Dropdown.Item>
                <Dropdown.Item onClick={() => handleApprove(value)}>Approve</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ),
        align: "left",
      },
    ],

    rows: items,
  };
}
