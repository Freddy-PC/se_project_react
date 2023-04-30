// Mock server (baseUrl for code reviewers) to access clothing from server
// "https://my-json-server.typicode.com/Freddy-PC/se_project_react"
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://my-json-server.typicode.com/Freddy-PC/se_project_react"
    : "http://localhost:3001";

const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status} ${res.statusText}`);
};

// Application state to get clothing items
const getItems = async () => {
  const res = await fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return processServerResponse(res);
  // .catch() handled in app.js
};

// Add new clothing item
const addItems = async (name, imageUrl, weather) => {
  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
  return processServerResponse(res);
};

// Handler for removing an item (Using ID)
const deleteItems = async (id) => {
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return processServerResponse(res);
};

// PUT or patch???
const addCardLike = async (id) => {
  const res = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return processServerResponse(res);
};

const removeCardLike = async (id) => {
  const res = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return processServerResponse(res);
};

const api = { getItems, addItems, deleteItems, addCardLike, removeCardLike };
export default api;
export { processServerResponse, baseUrl };
