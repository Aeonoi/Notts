import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Button,
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

import '../../input.css'

function Sidebar() {
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

  // const hours = new Date().getHours()
  // const [greeting, setGreeting] = useState("Good Evening " + user)
  // if (6 <= hours && hours < 11) {
  //   setGreeting("Good Morning " + user)
  // }
  // else if (11 < hours && hours <= 17) {
  //   setGreeting("Good Afternoon " + user)
  // }

  // TODO: Get folders
  const folders = ["folder1", "folder2", "folder3"]

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
            <List className="p-0">
              {folders.map(folder => (
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  {folder}
                </ListItem>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Add Note
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
