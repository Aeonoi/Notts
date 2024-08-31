const API_BASE_URL = "http://localhost:5000/api";

export const saveMarkdownFile = async (filename, content) => {
  const response = await fetch(`${API_BASE_URL}/markdown`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filename, content }),
  });
};

export const deleteMarkdownFile = async (filename) => {
  const response = await fetch(`${API_BASE_URL}/markdown/${filename}`, {
    method: "DELETE",
  });
};

export const updateMarkdownFile = async (noteId, newContent) => {
  const response = await fetch(`${API_BASE_URL}/markdown/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
};
