import { TextInput } from "@/components/Form/Inputs";
import FileInput from "@/components/Form/Inputs/FileInput";
import { Button } from "@/components/ui/button";
import { toFormData } from "@/services/service-axios";
import {
  useGetJobDetail,
  usePostJob,
  useUpdateJob,
} from "@/services/service-jobs";
import { Card, GridItem, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const PostJob = () => {
  const defaultValues = {
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    proposedFees: "",
    problemDesc: "",
    location: "",
    files: [],
    status: "open",
  };

  const { id } = useParams();
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });

  const navigate = useNavigate();
  const { mutateAsync, isPending } = usePostJob();
  const { mutateAsync: updateJob, isPending: isUpdating } = useUpdateJob(id);

  const { data, isLoading } = useGetJobDetail(id);

  useEffect(() => {
    if (data) {
      reset({
        ...data.data,
        date: data.data.date.split("T")[0],
      });
    }
  }, [data, reset]);

  if (id && isLoading) return <div>Loading...</div>;

  const onSubmit = async (data) => {
    try {
      const { files, ...rest } = data;
      const formData = toFormData(rest);
      if (Array.isArray(files)) {
        Array.from(files).forEach((file) => {
          formData.append("files", file);
        });
      }
      if (id) {
        await updateJob(formData);
      } else {
        await mutateAsync(formData);
      }
      navigate("/my-jobs");
      reset(defaultValues);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card.Root maxW={{ base: "full", md: "1440px" }} mx="auto" my={14}>
      <Card.Header py={4} borderBottom={"1px solid"} borderColor="gray.200">
        <Card.Title>{id ? "Edit Job" : "Post a Job"}</Card.Title>
      </Card.Header>

      <Card.Body>
        <SimpleGrid gap={4} columns={{ base: 1, sm: 2 }} asChild>
          <form id="job-form" onSubmit={handleSubmit(onSubmit)}>
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <TextInput
                control={control}
                name="title"
                label="Title"
                required
              />
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <TextInput
                control={control}
                name="location"
                label="Location"
                required
              />
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <TextInput
                control={control}
                name="date"
                label="Date"
                type="date"
                required
              />
            </GridItem>
            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <TextInput
                control={control}
                name="startTime"
                label="Start Time"
                type="time"
                required
              />
            </GridItem>

            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <TextInput
                control={control}
                name="endTime"
                label="End Time"
                type="time"
                required
              />
            </GridItem>

            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <TextInput
                control={control}
                name="proposedFees"
                label="Proposed Fees"
                type="number"
                min={0}
                required
              />
            </GridItem>

            <GridItem colSpan={{ base: 2, sm: 1 }}>
              <FileInput
                control={control}
                name="files"
                label="Image"
                required
                isMultiple
              />
            </GridItem>
            <GridItem colSpan={2}>
              <TextInput
                control={control}
                name="problemDesc"
                label="Problem Description"
                required
                rows={4}
                type={"textarea"}
              />
            </GridItem>
          </form>
        </SimpleGrid>
      </Card.Body>
      <Card.Footer>
        <Button
          w={"full"}
          form="job-form"
          loading={isPending || isUpdating}
          type="submit"
        >
          {id ? "Update Job" : "Post Job"}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default PostJob;
