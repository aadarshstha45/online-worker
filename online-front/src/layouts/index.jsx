import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const LayoutWrapper = () => {
  return (
    <Box
      maxWidth={"100%"}
      overflow={"hidden"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default LayoutWrapper;
