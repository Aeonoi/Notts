const API_BASE_URL = "http://localhost:5000";

export const saveMarkdownFile = async (filename, content) => {
  const response = await fetch(`${API_BASE_URL}/markdown`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filename, content }),
  });
};

export const getMarkdownFile = (filename) => {
  fetch(`${API_BASE_URL}/markdown/${filename}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error");
    })
    .then((content) => {
      return content;
    })
    .catch((error) => console.error("Error: " + error));
};

export const deleteMarkdownFile = async (filename) => {
  const response = await fetch(`${API_BASE_URL}/markdown/${filename}`, {
    method: "DELETE",
  });
};
