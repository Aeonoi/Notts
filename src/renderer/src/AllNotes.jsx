// var: global, let: dynamic type (can switch), const: one type
import React, { useEffect, useState } from "react";
import {
	Button,
	Card,
	Dialog,
	DialogBody,
	DialogHeader,
	DialogFooter,
	List,
	ListItem,
	ListItemPrefix,
} from "@material-tailwind/react";
import { FolderIcon, WrenchIcon, TrashIcon } from "@heroicons/react/24/solid";
const API_BASE_URL = "http://localhost:5000/api";
import "../../input.css";
import { deleteMarkdownFile, updateMarkdownFile } from "./backend/app";

function AllNotes({
	eventOnClick,
	currentFolderId,
	setCurrentNode: setCurrentNote,
}) {
	const [notes, setNotes] = useState([]);

	// TODO: Consider changing to function instead of useEffect as it may improve performance
	// TODO: When creating a new note, clicking on folder does not display that note (requires another fetch)
	useEffect(() => {
		fetchNotes();
	}, [currentFolderId]);

	const fetchNotes = async () => {
		// Show all notes when no folder is selected
		if (currentFolderId == "") {
			await fetch(`${API_BASE_URL}/markdown`, {
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
			await fetch(`${API_BASE_URL}/folder/${currentFolderId}/notes`, {
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
					content.map(
						async (note, index) =>
							await fetch(`${API_BASE_URL}/markdown/${note}`, { method: "GET" })
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
	};

	// hide context menu when there is a left click detected
	useEffect(() => {
		if (eventOnClick && eventOnClick.type != "contextmenu") {
			hideContextMenu();
		}
	}, [eventOnClick]);

	const [openNoteContextMenu, setOpenNoteContextMenu] = useState(false);

	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [selectedNoteId, setSelectedNoteId] = useState("");
	const [currentName, setCurrentName] = useState("");

	const showContextMenu = (event, selectedNoteId, selectedNoteName) => {
		// Disable the default context menu
		event.preventDefault();

		setOpenNoteContextMenu(false);
		const newPosition = {
			x: event.pageX,
			y: event.pageY,
		};

		setSelectedNoteId(selectedNoteId);
		setCurrentName(selectedNoteName);

		setPosition(newPosition);
		setOpenNoteContextMenu(true);
	};

	// Hide the custom context menu
	const hideContextMenu = () => {
		setOpenNoteContextMenu(false);
	};

	const deleteSelectedNote = () => {
		deleteMarkdownFile(selectedNoteId);
	};

	const [openRenameDialog, setOpenRenameDialog] = useState(false);

	const handleNameConfirmation = (event) => {
		setCurrentName(event.target.value);
	};

	const handleRenameDialog = async (type) => {
		setOpenRenameDialog(!openRenameDialog);
		// send POST request to create new folder
		if (type === "confirm") {
			updateMarkdownFile(
				selectedNoteId,
				JSON.stringify({ title: currentName }),
			);
		}
		await fetchNotes();
	};

	return (
		<ul className="hidden md:block max-w-[20rem] divide-y divide-gray-200 dark:divide-gray-700">
			{notes.map((note) => (
				<li
					key={note._id}
					className="pb-3 sm:pb-4 hover:bg-red-500"
					onClick={() => setCurrentNote(note._id)}
					onContextMenu={(event) =>
						showContextMenu(event, note._id, note.title)
					}
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
						<ListItem
							onClick={() => {
								setOpenRenameDialog(true);
							}}
						>
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
			<Dialog open={openRenameDialog} handler={setOpenRenameDialog}>
				<DialogHeader>Rename current note</DialogHeader>
				<DialogBody>
					<textarea
						className="resize-none text-md border border-gray-300 rounded-lg block p-2.5"
						value={currentName}
						onChange={handleNameConfirmation}
					/>
				</DialogBody>
				<DialogFooter>
					<Button
						variant="text"
						color="red"
						onClick={handleRenameDialog}
						className="mr-1"
					>
						<span>Cancel</span>
					</Button>
					<Button
						id="addFolderConfirm"
						variant="gradient"
						color="green"
						disabled={!currentName}
						onClick={() => handleRenameDialog("confirm")}
					>
						<span>Confirm</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</ul>
	);
}

export default AllNotes;
