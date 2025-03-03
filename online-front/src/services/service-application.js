import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "./service-api";
import { HttpClient } from "./service-axios";

const useGetMyApplications = ({ page = 1, size = 10 }) => {
  return useQuery({
    queryKey: ["my-applications", { page, size }],
    queryFn: () => {
      return HttpClient.get(
        api.applications.myApplications({
          page,
          size,
        })
      );
    },
    select: (response) => response.data,
  });
};

const useSendApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["send-application"],
    mutationFn: (data) => {
      return HttpClient.post(api.applications.sendApplication, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("my-applications");
      toast.success("Application sent successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};

const useUpdateApplication = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-application"],
    mutationFn: (data) => {
      return HttpClient.patch(
        api.applications.updateApplication.replace(":id", id),
        data
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries("my-applications");
      toast.success("Application updated successfully");
    },
  });
};

export { useGetMyApplications, useSendApplication, useUpdateApplication };
