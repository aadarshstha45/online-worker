import { Button } from "@/components/ui/button";
import {
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateApplication } from "@/services/service-application";
import { Icon, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { LuCheck, LuX } from "react-icons/lu";

const Update = ({ id, status }) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useUpdateApplication(id);

  const handleSubmit = async () => {
    try {
      await mutateAsync({ status });
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <IconButton
          size={"sm"}
          colorPalette={status === "accepted" ? "green" : "red"}
        >
          <Icon asChild>{status === "accepted" ? <LuCheck /> : <LuX />}</Icon>
        </IconButton>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>Are you sure?</DialogHeader>
        <DialogBody>
          <DialogDescription>
            You are about to update this application to {status}. Are you sure
            you want to proceed?
          </DialogDescription>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            colorPalette={status === "accepted" ? "green" : "red"}
            onClick={handleSubmit}
            loading={isPending}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default Update;
