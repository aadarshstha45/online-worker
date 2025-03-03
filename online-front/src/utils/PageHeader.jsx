import { useStoreHeaderData } from "@/store/headerStore";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageHeader = ({ heading, description }) => {
  const location = useLocation();
  const { setHeaderData } = useStoreHeaderData();

  useEffect(() => {
    setHeaderData({
      heading,
      description,
    });
  }, [location, setHeaderData, heading, description]);

  return null;
};

export default PageHeader;
