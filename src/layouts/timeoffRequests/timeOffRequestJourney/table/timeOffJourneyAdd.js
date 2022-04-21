import { useEffect, useState } from "react";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function TimeOffRequestJourney() {
  const [items, setItems] = useState([]);

  // const { columns: pColumns, rows: pRows } = ForwardTimeOffRequests();

  const navigate = useNavigate();

  // const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const eTOTId = urlParams.get("id");

  useEffect(() => {
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeoffjourney/getByTimeOff/${eTOTId}`, { headers })
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
        if (isMounted) {
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    columns: [
      { Header: "ID", accessor: "personal.id", align: "left" },
      { Header: "Name", accessor: "personal.fname", align: "left" },
      { Header: "Phone Number", accessor: "personal.pno", align: "left" },
      { Header: "Country", accessor: "personal.residentialCountry", align: "left" },
      { Header: "Marital status", accessor: "personal.maritalStatus", align: "left" },
    ],

    rows: items,
  };
}
