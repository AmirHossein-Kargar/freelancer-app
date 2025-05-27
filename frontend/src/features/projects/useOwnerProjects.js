import { useQuery } from "@tanstack/react-query";
import { getOwnerProjectsApi } from "../../services/projectServices";

export default function useOwnerProjects() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["owner-projects"],
    queryFn: getOwnerProjectsApi,
    retry: false,
  });

  return { projects, isLoading };
}
