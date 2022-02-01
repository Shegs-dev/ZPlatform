import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function PhoneNO() {
  const [phone, setPhone] = useState("");
  return <PhoneInput value={phone} onChange={() => setPhone({ phone })} />;
}

export default PhoneNO;
