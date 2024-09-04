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
  Select,
  Option,
  Textarea,
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
const API_BASE_URL = "http://localhost:5000/api";
// import '../../input.css'

function Sidebar({ setCurrentFolder }) {
  const user = "User"

  const handleOpenAccordian = (value) => {
    setOpenAccordian(openAccordian === value ? 0 : value)
  }
  const [openAccordian, setOpenAccordian] = useState(0);

  const [openAddNote, setOpenAddNote] = useState(false)
  const [noteName, setNoteName] = useState('')
  const [noteSelectedFolder, setNoteSelectedFolder] = useState('')

  const handleOpenNoteDialog = (newNoteName) => {
    setOpenAddNote(!openAddNote)
    setNoteName(newNoteName)
  }

  const [openAddFolder, setOpenAddFolder] = useState(false)
  const [folderName, setFolderName] = useState('')

  const handleOpenFolderDialog = (newFolderName) => {
    setOpenAddFolder(!openAddFolder)
    setFolderName(newFolderName)
  }


  const [allFolders, setAllFolders] = useState([])
  const [selectedFolder, setSelectedFolder] = useState('--Select Folder--')

  useEffect(() => {
    // fetch the data
    fetch(`${API_BASE_URL}/folder`)
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
  }, []);

  // TODO: Right click on folder should allow for delete of folder
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
                <ListItem onClick={() => setCurrentFolder(folder._id)}>
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
        <ListItem>
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
          <Textarea id="textAreaNoteName" />
          <div className="flex w-72 flex-col gap-6">
            <Select variant="static" label="Select Version" value={noteSelectedFolder} onChange={(val) => setNoteSelectedFolder}>
              {allFolders.map(folder => (
                <Option>{folder.name}</Option>
              ))}
            </Select>
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
          <Button variant="gradient" color="green" onClick={() => handleOpenNoteDialog(document.getElementById('textAreaNoteName').value)}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  )
}

export default Sidebar
