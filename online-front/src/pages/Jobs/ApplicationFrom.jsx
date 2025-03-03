import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSendApplication } from "@/services/service-application";
import { HStack, Image, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";

const ApplicationFrom = ({ job }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useSendApplication();

  const handleApply = async () => {
    try {
      await mutateAsync({ job: job._id });

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      scrollBehavior={"inside"}
    >
      <DialogTrigger asChild>
        <Button>Apply</Button>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader
          py={4}
          borderBottom={"1px solid"}
          borderColor={"gray.200"}
        >
          <DialogTitle>Application Form</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <Stack gap={2}>
            <DialogTitle>Job Details</DialogTitle>
            <HStack fontSize={"md"}>
              <Text fontWeight={"medium"}>Title:</Text>
              <Text>{job.title}</Text>
            </HStack>
            <HStack fontSize={"md"}>
              <Text fontWeight={"medium"}>Date:</Text>
              <Text>
                {moment(job.createdAt).format("MMM DD, YYYY")}, {job.startTime}{" "}
                - {job.endTime}
              </Text>
            </HStack>
            <HStack fontSize={"md"}>
              <Text fontWeight={"medium"}>Description:</Text>
              <Text>{job.problemDesc}</Text>
            </HStack>
            <Stack fontSize={"md"}>
              <Text fontWeight={"medium"}>Images:</Text>
              <HStack
                gap={4}
                flexWrap={"wrap"}
                maxW={"max-content"}
                mx={"auto"}
              >
                {job.image.map((img, index) => (
                  <Image
                    boxSize={"150px"}
                    key={index}
                    src={img}
                    alt={job.title}
                  />
                ))}
              </HStack>
            </Stack>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <HStack>
            <DialogActionTrigger />
            <Button loading={isPending} onClick={handleApply}>
              Apply
            </Button>
          </HStack>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default ApplicationFrom;
