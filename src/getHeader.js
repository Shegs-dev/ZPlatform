function GHeaders() {
  const GeneToken = localStorage.getItem("rexxdex1");
  const apiToken = localStorage.getItem("rexxdex");
  console.log(apiToken);
  if (apiToken !== "null" && apiToken !== null) {
    localStorage.setItem("rexxdex1", apiToken);
  }
  return {
    allGHeaders: {
      "Content-Type": "application/json",
      "Token-1": GeneToken,
    },
  };
}

export default GHeaders;
