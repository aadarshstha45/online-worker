import {
  DrawerBackdrop,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Icon, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import Sidebar from "../Sidebar";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <DrawerRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size={"xs"}
      placement={"start"}
    >
      <DrawerTrigger hideFrom={"md"} asChild>
        <IconButton variant={"outline"}>
          <Icon boxSize={6} asChild>
            <LuMenu />
          </Icon>
        </IconButton>
      </DrawerTrigger>
      <DrawerBackdrop />
      <DrawerContent w={"full"} maxW={"250px"}>
        <Sidebar onClick={() => setOpen(false)} />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default MobileNav;
