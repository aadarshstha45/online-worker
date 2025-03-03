import { useQuery } from "@tanstack/react-query";
import { api } from "./service-api";
import { HttpClient } from "./service-axios";

const useGetStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => {
      return HttpClient.get(api.admin.stats);
    },
    select: (data) => data.data,
  });
};

const useGetAllUsers = ({ page, size }) => {
  return useQuery({
    queryKey: ["users", { page, size }],
    queryFn: () => {
      return HttpClient.get(
        api.admin.users({
          page,
          size,
        })
      );
    },
    select: (data) => data.data,
  });
};

const useGetAllApplications = ({ page, size }) => {
  return useQuery({
    queryKey: ["applications", { page, size }],
    queryFn: () => {
      return HttpClient.get(
        api.admin.allApplications({
          page,
          size,
        })
      );
    },
    select: (data) => data.data,
  });
};

export { useGetAllApplications, useGetAllUsers, useGetStats };
