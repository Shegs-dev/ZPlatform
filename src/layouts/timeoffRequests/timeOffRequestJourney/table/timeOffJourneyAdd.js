import { useEffect, useState } from "react";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function TimeOffRequestJourney() {
  const [items, setItems] = useState([]);

  // const [newEvent, setNewEvent] = useState({ title: "", time: "" });

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
          console.log(result);
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const changeTime = (timestamp) => {
    const time = new Date(timestamp);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const retTime = time.toDateString(); // .getTime
    // eslint-disable-next-line prefer-template
    const retHMS = hours + ":" + minutes + ":" + seconds;
    // eslint-disable-next-line prefer-template
    return retTime + " " + retHMS;
  };

  return {
    columns: [
      { Header: "Current Holder Name", accessor: "currentHolderName", align: "left" },
      // { Header: "Created Time", accessor: "createdTime", align: "left" },
      {
        Header: "Created Time",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeTime(value),
        align: "left",
      },
    ],

    rows: items,
  };
}
