function AHeaders() {
  const data11 = JSON.parse(localStorage.getItem("user1"));
  const GenToken = data11.token;
  return {
    allHeaders: { token: GenToken },
  };
}

export default AHeaders;
