import { useMutation, useQueryClient } from "@tanstack/react-query";
import removeProjectApi from "../../services/projectServices";
import toast from "react-hot-toast";

export default function useRemoveProject() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: removeProjectApi,
    onSuccess: ({message}) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["owner-projects"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete project");
    },
  });
  return { removeProject: mutate, isDeleting: isPending };
}
