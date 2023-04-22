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
const userRegister = async (email, password, name, avatar) => {
  const res = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email,
      password,
      name,
      avatar,
    }),
  });
  return processServerResponse(res);
  // .catch() handled in app.js
};

// user authorization + set token
const userLogin = async (email, password) => {
  const res = await fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((data) => {
    if (data) {
      localStorage.setItem("token", data.token);
      return data;
    }
  });
  return processServerResponse(res);
  // .catch() handled in app.js
};

// compare token validity with server (/users from express file)
const getUser = async () => {
  const res = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return processServerResponse(res);
};

// Make use more apparent
const auth = { userRegister, userLogin, getUser };
export default auth;
