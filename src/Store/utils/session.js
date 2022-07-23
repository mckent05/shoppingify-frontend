const getToken = () => {
  const token = JSON.parse(localStorage.getItem("user-token"));
  return token;
};

const clearSession = () => {
  localStorage.setItem("session-status", false);
  localStorage.removeItem("user-token");
};

export { getToken, clearSession };
