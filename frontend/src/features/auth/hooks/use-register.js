import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

const register = async (userData) => {
  const response = await api.post("/auth/register", userData);

  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
