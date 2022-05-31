function IHeaders() {
  const GenToken = localStorage.getItem("rexxdex1");
  const apiiToken = localStorage.getItem("rexxdex");

  if (apiiToken !== "null" && apiiToken !== null) {
    localStorage.setItem("rexxdex1", apiiToken);
  }
  return {
    allIHeaders: { "Content-Type": "application/json", "Token-1": GenToken },
  };
}

export default IHeaders;
