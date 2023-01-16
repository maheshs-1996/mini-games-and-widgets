const API_BASE_URL = `http://localhost:5000/`;

export const fetchWrapper = async ({ url, method = "GET", payload = {} }) => {
  const options = {
    method,
    headers: {
      "Content-type": "application/json",
    },
  };
  if (method === "POST") {
    options["body"] = JSON.stringify(payload);
  }

  const fullURL = `${API_BASE_URL}${url}`;
  let response = await fetch(fullURL, options);
  try {
    response = await response.json();
  } catch (e) {
    response = {
      statusCode: 500,
      success: false,
      message: "Internal server error",
    };
  }
  return response;
};
