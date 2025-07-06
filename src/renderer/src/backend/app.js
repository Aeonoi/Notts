const API_BASE_URL = "http://localhost:5000/api";

export const createMarkdownFile = async (filename) => {
  const response = await fetch(`${API_BASE_URL}/markdown`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: filename,
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      folderIds: [],
    }),
  });
};

export const deleteMarkdownFile = async (fileId) => {
  // delete the note
  await fetch(`${API_BASE_URL}/markdown/${fileId}`, {
    method: "DELETE",
  });
};

export const updateMarkdownFile = async (noteId, newContent) => {
  const response = await fetch(`${API_BASE_URL}/markdown/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: newContent,
  });
};

//////////////////////////////////////
// Folder                           //
//////////////////////////////////////

export const updateFolder = async (folderId, newContent) => {
  const response = await fetch(`${API_BASE_URL}/folder/${folderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: newContent,
  });
};

export const createNoteFolder = async (folderName) => {
  const response = await fetch(`${API_BASE_URL}/folder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: folderName,
    }),
  });
};

export const deleteNoteFolder = async (folderId) => {
  const response = await fetch(`${API_BASE_URL}/folder/${folderId}`, {
    method: "DELETE",
  });
};
