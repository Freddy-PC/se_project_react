const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};
// Slower engine if I import same constant from api.js???

// user registration
const userRegister = async (name, avatar, email, password) => {
  const res = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name,
      avatar,
      email,
      password,
    }),
  });
  return processServerResponse(res);
  // .catch() handled in app.js
};

// user authorization
const userAuthorize = async (email, password) => {
  const res = await fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return processServerResponse(res);
  // .catch() handled in app.js
};

// compare token validity with server
const checkToken = async (token) => {
  const res = await fetch(`${baseUrl}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return processServerResponse(res);
};

// Make use more apparent
const auth = { userRegister, userAuthorize, checkToken };
export default auth;
