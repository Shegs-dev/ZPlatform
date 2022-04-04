import { Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";

export default function AddDetailsData() {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const { allGHeaders: miHeaders } = GHeaders();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  const values = JSON.parse([id]);

  const handleShow = (value) => {
    console.log(value);
  };

  const handleDisable = (value) => {
    console.log(value);
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
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);

    const headers = miHeaders;
    let isMounted = true;

    fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeofftype/getByIds/${values}`, {
      headers,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.length);
        console.log(result[0]);
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
      { Header: "name", accessor: "name", align: "left" },
      {
        Header: "type",
        accessor: "type",
        Cell: ({ cell: { value } }) => changeCol(value),
        align: "left",
      },
      { Header: "value", accessor: "value", align: "left" },
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
