import http from "./httpService";

export function getOwnerProjectsApi() {
  return http
    .get("/project/owner-projects")
    .then((res) => res.data.data.projects);
}
export default function removeProjectApi(id) {
  return http.delete(`/project/${id}`).then((res) => res.data.data);
}
