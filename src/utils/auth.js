const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://my-json-server.typicode.com/Freddy-PC/se_project_react"
    : "http://localhost:3001";

// If works,,test if header can be refactored bc only one has a difference

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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      avatar,
      email,
      password,
    }),
  }).then((data) => {
    return data;
  });
  return processServerResponse(res);
  // .catch() handled in app.js
};

// user authorization + set token
const userLogin = async (email, password) => {
  const res = await fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
