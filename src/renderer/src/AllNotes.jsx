// var: global, let: dynamic type (can switch), const: one type
import React, { useEffect, useState } from "react";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { FolderIcon, WrenchIcon, TrashIcon } from "@heroicons/react/24/solid";
const API_BASE_URL = "http://localhost:5000/api";
import "../../input.css";
import { deleteMarkdownFile } from "./backend/app";

function AllNotes({
	eventOnClick,
	currentFolderId,
	setCurrentNode: setCurrentNote,
}) {
	const [notes, setNotes] = useState([]);

	// TODO: Consider changing to function instead of useEffect as it may improve performance
	// TODO: When creating a new note, clicking on folder does not display that note (requires another fetch)
	useEffect(() => {
		// Show all notes when no folder is selected
		if (currentFolderId == "") {
			fetch(`${API_BASE_URL}/markdown`, {
				method: "GET",
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					}
					throw new Error("Error");
				})
				.then((content) => {
					setNotes(content);
				})
				.catch((error) => console.error("Error: " + error));
		} else {
			setNotes([]);
			fetch(`${API_BASE_URL}/folder/${currentFolderId}/notes`, {
				method: "GET",
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					}
					throw new Error("Error");
				})
				.then((content) => {
					const currentNotes = [];
					// fetech all "real" notes from the note's ids (gather the note's json)
					content.map((note, index) =>
						fetch(`${API_BASE_URL}/markdown/${note}`, { method: "GET" })
							.then((response) => {
								if (response.ok) {
									return response.json();
								}
								throw new Error("Error");
							})
							.then((noteContent) => {
								currentNotes.push(noteContent);
								if (index === content.length - 1) {
									setNotes(currentNotes);
								}
							})
							.catch((error) => console.error("Error: " + error)),
					);
				})
				.catch((error) => console.error("Error: " + error));
		}
	}, [currentFolderId]);

	// hide context menu when there is a left click detected
	useEffect(() => {
		if (eventOnClick && eventOnClick.type != "contextmenu") {
			hideContextMenu();
		}
	}, [eventOnClick]);

	const [openNoteContextMenu, setOpenNoteContextMenu] = useState(false);

	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [deleteNoteId, setDeleteNoteId] = useState("");

	const showContextMenu = (event, selectedNoteId) => {
		// Disable the default context menu
		event.preventDefault();

		setOpenNoteContextMenu(false);
		const newPosition = {
			x: event.pageX,
			y: event.pageY,
		};

		setDeleteNoteId(selectedNoteId);

		setPosition(newPosition);
		setOpenNoteContextMenu(true);
	};

	// Hide the custom context menu
	const hideContextMenu = () => {
		setOpenNoteContextMenu(false);
	};

	const deleteSelectedNote = () => {
		deleteMarkdownFile(deleteNoteId);
	};

	return (
		<ul className="hidden md:block max-w-[20rem] divide-y divide-gray-200 dark:divide-gray-700">
			{notes.map((note) => (
				<li
					key={note._id}
					className="pb-3 sm:pb-4 hover:bg-red-500"
					onClick={() => setCurrentNote(note._id)}
					onContextMenu={(event) => showContextMenu(event, note._id)}
				>
					<div className="flex items-center space-x-4 rtl:space-x-reverse">
						<div className="flex-1 min-w-0">
							<div className="text-sm font-medium flex text-gray-900">
								<div className="flex-1 text-center">{note.title}</div>
							</div>
							<div className="flex text-sm font-medium text-gray-500">
								<div className="flex-1 text-left" id="modifed">
									Created On: {note.createdAt}
								</div>
								<div className="flex-1 text-right" id="lastVisited">
									Last Updated: {note.updatedAt}
								</div>
							</div>
						</div>
					</div>
				</li>
			))}
			{openNoteContextMenu && (
				<Card
					style={{ top: position.y, left: position.x, position: "absolute" }}
				>
					<List>
						<ListItem>
							<ListItemPrefix>
								<FolderIcon className="h-5 w-5" />
							</ListItemPrefix>
							Reassign folders
						</ListItem>
						<ListItem>
							<ListItemPrefix>
								<WrenchIcon className="h-5 w-5" />
							</ListItemPrefix>
							Rename
						</ListItem>
						<ListItem onClick={deleteSelectedNote}>
							<ListItemPrefix>
								<TrashIcon className="h-5 w-5" />
							</ListItemPrefix>
							Delete
						</ListItem>
					</List>
				</Card>
			)}
		</ul>
	);
}

export default AllNotes;
