function GHeaders() {
  const GeneToken = localStorage.getItem("rexxdex1");
  const apiToken = localStorage.getItem("rexxdex");
  if (apiToken !== "null") {
    localStorage.setItem("rexxdex1", apiToken);
  }
  return {
    allGHeaders: {
      Authorization: "Bearer my-token",
      "Token-1": GeneToken,
    },
  };
}

export default GHeaders;
