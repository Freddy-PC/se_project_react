import { processServerResponse, baseUrl } from "../utils/api";

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
  });
  return processServerResponse(res);
  // .catch() handled in app.js
};

// compare token validity with server (/users from express file)
const checkToken = async (token) => {
  const res = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return processServerResponse(res);
};

// Edits profile data on server promise
const editUserInfo = async (name, avatar) => {
  const res = await fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  });
  return processServerResponse(res);
};

// Make use more apparent
const auth = { userRegister, userLogin, checkToken, editUserInfo };
export default auth;
