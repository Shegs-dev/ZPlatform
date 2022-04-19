import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";

export default function SeeTodayBirthdays() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    // const CurTime = new Date().getTime();
    const Month = new Date().getMonth() + 1;
    const Dates = new Date().getDate();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getBirthdaysToday/${orgIDs}/${Dates}/${Month}`, {
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
