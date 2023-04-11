const baseUrl =
  "https://my-json-server.typicode.com/Freddy-PC/se_project_react";
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

export { userRegister, userAuthorize };
