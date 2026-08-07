import authServices from "@/services/api/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await authServices.logout();
    },

    onSuccess: () => {
      toast.success("Logout successfully");
      queryClient.clear();
      router.push("/");
      router.refresh();
    },
  });
}
