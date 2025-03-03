import useAuthStore from "@/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "./service-api";
import { HttpClient } from "./service-axios";
import TokenService from "./service-token";

const authTokenKey = "authToken";
const authTokenDetails = "authTokenDetails";

export const Authorities = {
  Admin: "admin",
  Customer: "customer",
  Worker: "worker",
};

const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["registerUser"],
    mutationFn: (data) => {
      return HttpClient.post(api.auth.register, data);
    },
  });
};

const useLogin = () => {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data) => {
      return HttpClient.post(api.auth.login, data);
    },
    onSuccess: (response) => {
      queryClient.setQueryData([authTokenKey], true);
      const { token, user } = response.data;
      setUser(user);
      TokenService.setToken(token);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

const checkAuthentication = async () => {
  if (TokenService.isAuthenticated()) {
    const tokenInfo = TokenService.getToken();
    if (tokenInfo && tokenInfo.expiresIn > Date.now()) {
      return Promise.resolve(true);
    } else {
      TokenService.clearToken();
      return Promise.resolve(false);
    }
  } else {
    return Promise.resolve(false);
  }
};

/**
 * Check if user is authenticated
 * @returns boolean
 */

const useAuthentication = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [authTokenKey],
    queryFn: async () => {
      const authStatus = await checkAuthentication();
      const tokenDetails = TokenService.getToken();
      if (tokenDetails) {
        queryClient.setQueryData([authTokenDetails], {
          ...tokenDetails,
        });
      }
      return authStatus;
    },
  });
};

const initLogout = () => {
  try {
    TokenService.clearToken();
    return Promise.resolve(true);
  } catch (error) {
    return Promise.resolve(false);
  }
};

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { clearUser } = useAuthStore();
  return useMutation({
    mutationFn: initLogout,
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData([authTokenKey], () => false);
      setTimeout(() => {
        clearUser();
        navigate("/", { replace: true });
      }, 500);
    },
    onError: () => {
      toast.error("Logout Failed");
    },
  });
};

const getRole = () => {
  const { user } = useAuthStore();
  if (!user) {
    return {
      isAdmin: false,
      isCustomer: false,
      isWorker: false,
    };
  }

  return {
    isAdmin: user.role.includes(Authorities.Admin),
    isCustomer: user.role.includes(Authorities.Customer),
    isWorker: user.role.includes(Authorities.Worker),
  };
};

export {
  checkAuthentication,
  getRole,
  useAuthentication,
  useLogin,
  useLogout,
  useRegisterUser,
};
