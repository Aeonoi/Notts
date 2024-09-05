import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  FolderIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { createNoteFolder, updateMarkdownFileFolders, updateNoteFolder } from "./backend/app";
const API_BASE_URL = "http://localhost:5000/api";

function Sidebar({ setCurrentFolder }) {
  const user = "User"

  const handleOpenAccordian = (value) => {
    setOpenAccordian(openAccordian === value ? 0 : value)
  }
  const [openAccordian, setOpenAccordian] = useState(0);

  const [openAddNote, setOpenAddNote] = useState(false)

  const [name, setName] = useState('')

  // Handle the multi select drop down menu
  const [selectedFolders, setSelectedFolders] = useState([]);
  const [isSelectedFoldersOpen, setIsSelectedFoldersOpen] = useState(false);
  const toggleDropdown = () => setIsSelectedFoldersOpen(!isSelectedFoldersOpen);

  const handleSelect = (folder) => {
    if (selectedFolders.includes(folder)) {
      setSelectedFolders(selectedFolders.filter((item) => item !== folder));
    } else {
      setSelectedFolders([...selectedFolders, folder]);
    }
  };

  // display the selected folders
  const displayFolders = () => {
    let str = "";
    if (selectedFolders.length === 0) {
      str = "Select a folder to add note into"
    }
    else {
      selectedFolders.map((folder, index) => {
        if (index != selectedFolders.length - 1) {
          str += `${folder.name}, `
        }
        else {
          str += folder.name
        }
      })
    }
    return str;
  }

  const handleOpenNoteDialog = async (newNoteName, type) => {
    setOpenAddNote(!openAddNote)
    setName('')
    //  POST create new note 
    if (type === "confirm") {
      let id = ""
      await fetch(`${API_BASE_URL}/markdown`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newNoteName.name,
          content: "",
          createdAt: new Date(),
          updatedAt: new Date(),
          folderIds: [],
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error");
        })
        .then((content) => {
          id = content._id;
        })

      if (selectedFolders.length > 0) {
        {
          const currentlySelectedFoldersIds = []
          selectedFolders.map((folder, index) => {
            currentlySelectedFoldersIds.push(folder._id)
            // at last folder, add all the selected folders' ids 
            if (index == selectedFolders.length - 1) {
              updateMarkdownFileFolders(id, currentlySelectedFoldersIds)
            }

            // GET folder's notes ids
            fetch(`${API_BASE_URL}/folder/${folder._id}/notes`, { method: "GET" })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error("Error");
              })
              .then((content) => {
                const currentNoteIds = content
                currentNoteIds.push(id)

                // PATCH append the new note id to current folder
                updateNoteFolder(folder._id, currentNoteIds)
              })
              .catch((error) => console.error("Error: " + error))
          })
        }
      }
      // TODO: Refetch after deleting note
    }
    setSelectedFolders([])
  }

  const [openAddFolder, setOpenAddFolder] = useState(false)

  const handleOpenFolderDialog = (newFolderName, type) => {
    setOpenAddFolder(!openAddFolder)
    setName('')
    // send POST request to create new folder
    if (type === "confirm") {
      createNoteFolder(newFolderName.name)
      fetchFolders()
    }
  }

  const handleNameConfirmation = event => {
    setName(event.target.value)
  }


  const [allFolders, setAllFolders] = useState([])

  const fetchFolders = async () => {
    // fetch the data
    await fetch(`${API_BASE_URL}/folder`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error");
      })
      .then((content) => {
        setAllFolders(content)
      })
      .catch((error) => console.error("Error: " + error));
  }



  useEffect(() => {
    fetchFolders()
  }, []);

  // TODO: Right click on folder should allow for delete of folder
  // TODO: Style the multi select drop down
  return (
    <Card className="hidden lg:block h-[calc(100vh-2rem)] max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 flex items-center gap-4 p-4">
        <Typography variant="h5" color="blue-gray">
          Hello {user}
        </Typography>
      </div>

      <List>
        <Accordion
          open={openAccordian === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${openAccordian === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={openAccordian === 1}>
            <AccordionHeader onClick={() => handleOpenAccordian(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <FolderIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Folders
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0" >
              {allFolders.map(folder => (
                <ListItem key={folder._id} onClick={() => setCurrentFolder(folder._id)}>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  {folder.name}
                </ListItem>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem onClick={() => setCurrentFolder('')}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          All notes
        </ListItem>
        <ListItem onClick={() => handleOpenNoteDialog(1)}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Add Note
        </ListItem>
        <ListItem onClick={() => handleOpenFolderDialog(1)}>
          <ListItemPrefix>
            <FolderIcon className="h-5 w-5" />
          </ListItemPrefix>
          Add folder
        </ListItem>
        <ListItem >
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
      <Dialog open={openAddNote} handler={setOpenAddNote}>
        <DialogHeader>Name of note</DialogHeader>
        <DialogBody>
          <textarea className="resize-none text-md border border-gray-300 rounded-lg block p-2.5" value={name} onChange={handleNameConfirmation} />
          <div className="relative w-64 my-5">
            <div
              className="border border-gray-300 bg-white p-2 rounded cursor-pointer"
              onClick={toggleDropdown}
            >
              {displayFolders()}
            </div>

            {isSelectedFoldersOpen && (
              <div className="absolute top-full mt-2 w-full border border-gray-300 bg-white rounded shadow-lg">
                {allFolders.map((folder) => (
                  <label
                    key={folder.id}
                    className="block p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedFolders.includes(folder)}
                      onChange={() => handleSelect(folder)}
                    />
                    {folder.name}
                  </label>
                ))}
              </div>
            )}
          </div>
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenNoteDialog}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" disabled={!name} onClick={() => handleOpenNoteDialog({ name }, "confirm")}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={openAddFolder} handler={setOpenAddFolder}>
        <DialogHeader>Name of folder</DialogHeader>
        <DialogBody>
          <textarea className="resize-none text-md border border-gray-300 rounded-lg block p-2.5" value={name} onChange={handleNameConfirmation} />
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenFolderDialog}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button id="addFolderConfirm" variant="gradient" color="green" disabled={!name} onClick={() => handleOpenFolderDialog({ name }, "confirm")}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  )
}

export default Sidebar
