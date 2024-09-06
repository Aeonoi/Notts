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
		body: JSON.stringify({ content: newContent }),
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
	// fetch the note ids of the folder and remove the folder id from those notes
	await fetch(`${API_BASE_URL}/folder/${folderId}/notes`, { method: "GET" })
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			throw new Error("Error");
		})
		.then((content) => {
			{
				content.map((id) => {
					fetch(`${API_BASE_URL}/markdown/${id}`, { method: "GET" })
						.then((response) => {
							if (response.ok) {
								return response.json();
							}
							throw new Error("Error");
						})
						.then((noteInfo) => {
							const currentNoteFolderIds = noteInfo.folderIds;
							const index = currentNoteFolderIds.indexOf(folderId);
							console.log("BEFORE");
							console.log(currentNoteFolderIds);
							// ensure folderId exists in the notes ids array
							if (index > -1) {
								currentNoteFolderIds.splice(index, 1);
								console.log("AFTER");
								console.log(currentNoteFolderIds);
								// patch up the new notes ids list
								fetch(`${API_BASE_URL}/markdown/${id}`, {
									method: "PATCH",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({ notesIds: currentNoteFolderIds }),
								});
							}
						});
				});
			}
		});

	// delete the folder
	const response = await fetch(`${API_BASE_URL}/folder/${folderId}`, {
		method: "DELETE",
	});
};

export const updateNoteFolder = async (folderId, newContent) => {
	const response = await fetch(`${API_BASE_URL}/folder/${folderId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: newContent,
	});
};
