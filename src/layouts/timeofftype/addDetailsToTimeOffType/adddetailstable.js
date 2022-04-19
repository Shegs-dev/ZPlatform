import { Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";

export default function AddDetailsData() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  const ids = JSON.parse([id]);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handleUpdate = (idx, namex, valuex, typex, deleteFlagx) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      timeOffTypeID: ids,
      type: typex,
      name: namex,
      value: valuex,
      deletedFlag: deleteFlagx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeofftype/details/update`, requestOptions)
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

  const handleShow = (filteredData, value) => {
    let namex = "";
    let typex = "";
    let valuex = "";
    let deleteFlagx = 0;
    // Avoid filter for empty string
    if (!value) {
      namex = "";
      typex = "";
      valuex = "";
      deleteFlagx = 0;
    } else {
      const filteredItems = filteredData.filter((item) => item.id === value);

      namex = filteredItems[0].name;
      typex = filteredItems[0].type;
      valuex = filteredItems[0].value;
      deleteFlagx = filteredItems[0].deleteFlag;
    }

    MySwal.fire({
      title: "Update Details",
      html: `<table><tr><td>
      <label for="name">Category</label></td>
      <td><input type="text" id="name" value="${namex}" class="swal2-input" placeholder="Name" disabled></td></tr><br>
      <tr><td><label for="value">Number Of Days</label></td>
      <td><input type="text" class="swal2-input" id="value" value="${valuex}" placeholder="Value"></td></tr></table>`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value;
        const valuev = Swal.getPopup().querySelector("#value").value;
        const idDet = value;
        const letters = /^[a-zA-Z]+$/;
        const numbers = /^[0-9]+$/;
        if (
          (name.length > 0 && !name.match(letters)) ||
          (valuev.length > 0 && !valuev.match(numbers))
        ) {
          Swal.showValidationMessage(
            `Name - Please write a name and use only letters<br> Value - Please write a type and only use letters<br> Value - Please write a value and only use numbers`
          );
        } else {
          handleUpdate(idDet, name, valuev, typex, deleteFlagx);
        }
      },
    });
  };

  const handleDisable = (values) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(
          `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/delete/${values}`,
          requestOptions
        )
          .then((res) => res.json())
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

  const changeCol = (status) => {
    if (status === 1) {
      return "Gender";
      // eslint-disable-next-line no-else-return
    } else if (status === 2) {
      return "Position";
    } else if (status === 3) {
      return "Branch";
    } else if (status === 4) {
      return "Status";
    } else if (status === 5) {
      return "Department";
    } else {
      return "Company Role";
    }
  };

  useEffect(() => {
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const id = urlParams.get("id");
    const values = JSON.parse([id]);

    const headers = miHeaders;
    let isMounted = true;

    fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeofftype/getByIds/${values}`, {
      headers,
    })
      .then((res) => res.json())
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
        if (isMounted) {
          if (result.length > 0) {
            setItems(result[0].conditions);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    columns: [
      { Header: "category", accessor: "name", align: "left" },
      {
        Header: "type",
        accessor: "type",
        Cell: ({ cell: { value } }) => changeCol(value),
        align: "left",
      },
      { Header: "Number Of Days", accessor: "value", align: "left" },
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
                <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item>
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
