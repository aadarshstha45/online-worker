import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "./service-api";
import { HttpClient } from "./service-axios";

const usePostJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["post-job"],
    mutationFn: (data) => {
      return HttpClient.post(api.jobs.postJob, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get-customer-jobs");
      toast.success("Job posted successfully");
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

const useGetCustomerJobs = ({ page, size }) => {
  return useQuery({
    queryKey: ["get-customer-jobs", page, size],
    queryFn: () => {
      return HttpClient.get(
        api.jobs.customerJobs({
          page,
          size,
        })
      );
    },
    select: (response) => response.data,
    onError: (error) => {
      console.error(error);
    },
  });
};

const useUpdateJob = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-job", id],
    mutationFn: (data) => {
      return HttpClient.put(api.jobs.byId.replace(":id", id), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get-customer-jobs", "get-job-detail");
      toast.success("Job updated successfully");
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

const useGetJobDetail = (id) => {
  return useQuery({
    queryKey: ["get-job-detail", id],
    queryFn: () => {
      return HttpClient.get(api.jobs.byId.replace(":id", id));
    },
    select: (response) => response.data,
    onError: (error) => {
      console.error(error);
    },
    enabled: !!id,
  });
};

const useGetAllJobs = ({ page = 1, size = 12 } = {}) => {
  return useQuery({
    queryKey: ["get-all-jobs", page, size],
    queryFn: () => {
      return HttpClient.get(
        api.jobs.all({
          page,
          size,
        })
      );
    },
    select: (response) => response.data,
    onError: (error) => {
      console.error(error);
    },
  });
};

const useDeleteJob = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-job", id],
    mutationFn: () => {
      return HttpClient.patch(api.jobs.byId.replace(":id", id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get-customer-jobs");
      toast.success("Job deleted successfully");
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export {
  useDeleteJob,
  useGetAllJobs,
  useGetCustomerJobs,
  useGetJobDetail,
  usePostJob,
  useUpdateJob,
};
