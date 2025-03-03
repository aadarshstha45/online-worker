import { Avatar } from "@/components/ui/avatar";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { getRole, useLogout } from "@/services/service-auth";
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const { user } = useAuthStore();

  const navigate = useNavigate();
  const { mutateAsync } = useLogout();
  const { isAdmin, isCustomer, isWorker } = getRole();

  const handleSignOut = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <MenuRoot>
        <MenuTrigger outline="none">
          <Avatar alt="Avatar" src={user?.profile?.profilePhoto} />
        </MenuTrigger>
        <MenuContent>
          {(isCustomer || isWorker) && (
            <MenuItem
              value="profile"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </MenuItem>
          )}
          {isCustomer && (
            <>
              <MenuItem
                onClick={() => {
                  navigate("/my-jobs");
                }}
                value="my-jobs"
              >
                My Jobs
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/job-applications");
                }}
                value="job-applications"
              >
                Applications
              </MenuItem>
            </>
          )}
          {isWorker && (
            <MenuItem
              onClick={() => {
                navigate("/my-applications");
              }}
              value="my-applications"
            >
              My Applications
            </MenuItem>
          )}
          <MenuItem value="logout" onClick={() => handleSignOut()}>
            Logout
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </div>
  );
};

export default UserMenu;
