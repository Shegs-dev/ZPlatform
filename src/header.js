function AHeaders() {
  const data11 = JSON.parse(localStorage.getItem("user1"));
  const GenToken = data11.token;
  return {
    allHeaders: [{ "Content-Type": "application/json" }, { "Token-1": GenToken }],
  };
}

export default AHeaders;
