import { HStack, Icon, IconButton } from "@chakra-ui/react";
import { DeleteAlert } from "../Form/Modal";

const ActionColumn = ({
  handleEdit,
  handleDelete,
  handleView,
  deleteHeading,
  deleteMessage,
  deleteText,
  deleteCancelText,
  deleteTrigger,
  isDeleteLoading,
  ...rest
}) => {
  return (
    <HStack w={"max-content"} mx={"auto"}>
      {handleView && (
        <IconButton
          colorPalette={"teal"}
          variant={"subtle"}
          size={"sm"}
          aria-label="edit"
          onClick={handleView}
          {...rest}
        >
          <Icon asChild boxSize={6}>
            <Eye />
          </Icon>
        </IconButton>
      )}
      {handleEdit && (
        <IconButton
          colorPalette={"blue"}
          variant={"subtle"}
          size={"sm"}
          aria-label="edit"
          onClick={handleEdit}
          {...rest}
        >
          <Icon asChild boxSize={6}>
            <Pencil />
          </Icon>
        </IconButton>
      )}
      {handleDelete && (
        <DeleteAlert
          heading={deleteHeading}
          description={deleteMessage}
          deleteText={deleteText}
          onConfirm={handleDelete}
          isDeleteLoading={isDeleteLoading}
          cancelText={deleteCancelText}
          trigger={deleteTrigger}
        />
      )}
    </HStack>
  );
};

export default ActionColumn;
