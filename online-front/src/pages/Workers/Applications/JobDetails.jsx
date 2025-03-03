import { Button } from "@/components/ui/button";
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge, HStack, Image, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";

const JobDetails = ({ trigger, job }) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      scrollBehavior={"inside"}
    >
      <DialogTrigger asChild>{trigger ?? <Button>Apply</Button>}</DialogTrigger>
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader
          py={4}
          borderBottom={"1px solid"}
          borderColor={"gray.200"}
        >
          <DialogTitle>Job Details</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <Stack gap={2}>
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
            <HStack fontSize={"md"}>
              <Text fontWeight={"medium"}>Location:</Text>
              <Text>{job.location}</Text>
            </HStack>
            <HStack fontSize={"md"}>
              <Text fontWeight={"medium"}>Status:</Text>
              <Badge
                size={"lg"}
                colorPalette={job.status === "open" ? "green" : "red"}
                textTransform={"capitalize"}
              >
                {job.status}
              </Badge>
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
      </DialogContent>
    </DialogRoot>
  );
};

export default JobDetails;
