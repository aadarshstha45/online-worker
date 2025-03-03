import { Avatar } from "@/components/ui/avatar";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { useLogout } from "@/services/service-auth";
import useAuthStore from "@/store/authStore";
import { Icon } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";

const UserMenu = () => {
  const { user } = useAuthStore();
  const { mutateAsync: logout } = useLogout();
  return (
    <MenuRoot
      lazyMount
      positioning={{
        placement: "bottom-end",
      }}
    >
      <MenuTrigger
        outline={"none"}
        cursor={"pointer"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={2}
      >
        <Avatar name={user?.first_name} src={user?.profile.profilePhoto} />
      </MenuTrigger>
      <MenuContent spaceY={1} minW={"150px"}>
        <MenuItem value="profile" cursor={"pointer"}>
          {user?.fullName}
        </MenuItem>
        <MenuItem
          cursor={"pointer"}
          color="fg.error"
          borderRadius={5}
          _hover={{ bg: "bg.error", color: "fg.error" }}
          onClick={async () => await logout()}
          value="signout"
        >
          <Icon asChild boxSize={5} mr={2}>
            <LuLogOut />
          </Icon>
          Sign Out
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default UserMenu;
