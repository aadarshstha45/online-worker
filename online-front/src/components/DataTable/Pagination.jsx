import { HStack } from "@chakra-ui/react";
import {
  PaginationItem,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@components/ui/pagination";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Pagination = ({ pageIndex, count, pageSize = 10, ...rest }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, [pageIndex]);
  return (
    <PaginationRoot
      count={count}
      pageSize={pageSize}
      page={pageIndex}
      onPageChange={(e) => {
        navigate(`?page=${e.page}`);
      }}
      variant="solid"
      w={"full"}
      {...rest}
    >
      <HStack w={"full"} justify={"space-between"} gap={4} flexWrap={"wrap"}>
        <PaginationPageText format="long" />
        <HStack>
          <PaginationPrevTrigger />
          <HStack hideBelow={"1000px"}>
            <PaginationItems />
          </HStack>
          <HStack hideFrom={"1000px"}>
            <PaginationItem type="page" value={pageIndex} />
          </HStack>
          <PaginationNextTrigger />
        </HStack>
      </HStack>
    </PaginationRoot>
  );
};

export default Pagination;
