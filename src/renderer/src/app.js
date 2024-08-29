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

export const getMarkdownFile = async (filename) => {
  // TODO: Something wrong here
  const reponse = await fetch(`${API_BASE_URL}/markdown/${filename}`)
    .then((response) => {
      // 200 is Okay
      if (response.status != 200) {
        throw new Error("Error finding file");
      }
    })
    .then((content) => {
      console.log("CONTENT: " + content);
      return content;
    })
    .catch((error) => console.error(error));
  return reponse;
};

export const deleteMarkdownFile = async (filename) => {
  const response = await fetch(`${API_BASE_URL}/markdown/${filename}`, {
    method: "DELETE",
  });
};
