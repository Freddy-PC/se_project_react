// Mock server (baseUrl for code reviewers)
// access clothing from server
const baseUrl =
  "https://my-json-server.typicode.com/Freddy-PC/se_project_react";
const headers = { "Content-Type": "application/json" };

const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};
// Application state to get clothing items
const getItems = async () => {
  const res = await fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: headers,
  });
  return processServerResponse(res);
  // .catch() handled in app.js
};

// Add new clothing item
const addItems = async (name, imageUrl, weather) => {
  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
  return processServerResponse(res);
  // .catch() handled in app.js
};

// Handler for removing an item (Using ID)
const deleteItems = async (id) => {
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: headers,
  });
  return processServerResponse(res);
  // .catch() handled in app.js
};

export { getItems, addItems, deleteItems };
