const API_BASE_URL = "http://localhost:5000/";

export const saveMarkdownFile = async (filename, content) => {
  const response = await fetch(`${API_BASE_URL}/markdown`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filename, content }),
  });
  return response.json();
};

export const getMarkdownFile = async (filename) => {
  const response = await fetch(`${API_BASE_URL}/markdown/${filename}`);
  return response.json();
};

export const deleteMarkdownFile = async (filename) => {
  const response = await fetch(`${API_BASE_URL}/markdown/${filename}`, {
    method: "DELETE",
  });
  return response.json();
};
