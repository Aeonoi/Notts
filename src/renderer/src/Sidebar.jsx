import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
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
import '../../input.css'

function Sidebar({ setCurrentFolder }) {
  const [open, setOpen] = useState(0);
  const [openSetting, openSettingDialog] = useState(false)
  const user = "User"

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value)
  }

  const handleOpenSetting = () => {
    console.log("here");
    openSettingDialog(!openSetting);
  }

  const folders = ["folder1", "folder2", "folder3"]
  const [allFolders, setAllFolders] = useState([])

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

  return (
    <Card className="hidden lg:block h-[calc(100vh-2rem)] max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 flex items-center gap-4 p-4">
        <Typography variant="h5" color="blue-gray">
          Hello {user}
        </Typography>
      </div>

      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />

          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
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
        <ListItem>
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
    </Card>
  )
}

export default Sidebar
