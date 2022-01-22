import React, { useForm, useState } from "react";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function ValPassword() {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  const [newpassword, setNewPassword] = useState("");

  const [confirmpassword, setConfirmPassword] = useState("");

  const { touched } = formState;

  const MySwal = withReactContent(Swal);

  const OnVerifyNewPassword = () => {
    if (touched.newpassword === true && touched.confirmpassword === true) {
      if (newpassword !== confirmpassword) {
        MySwal.fire({
          title: "Error",
          type: "error",
          icon: "error",
          text: "Password does not match",
        });
      } else {
        MySwal.fire({
          title: "Success",
          type: "success",
          icon: "success",
          text: "Password Correct",
        });
      }
    }
  };

  <MDBox component="form" role="form" onClick={handleSubmit()}>
    <MDInput
      label="New Password"
      type="password"
      ref={register({ required: true })}
      name="newpassword"
      onChange={(e) => setNewPassword(e.target.value)}
      onBlur={OnVerifyNewPassword}
    />

    <MDInput
      label="New Password"
      type="password"
      ref={register({ required: true })}
      name="confirmpassword"
      onChange={(e) => setConfirmPassword(e.target.value)}
      onBlur={OnVerifyNewPassword}
    />
  </MDBox>;
}
export default ValPassword;
