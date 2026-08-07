import { queryKeys } from "@/lib/queryKeys";
import authServices from "@/services/api/auth.service";
import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.currentUser(),
    queryFn: async () => {
      const { data } = await authServices.getMe();

      return data;
    },
  });
};

export default useCurrentUser;
