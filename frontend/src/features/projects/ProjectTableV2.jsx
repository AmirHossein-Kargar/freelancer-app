import useOwnerProjects from "./useOwnerProjects";
import Loading from "../../ui/Loading";
import Table from "../../ui/Table";
import ProjectRow from "./ProjectRow";
export default function ProjectTableV2() {
  const { isLoading, projects } = useOwnerProjects();

  if (isLoading) return <Loading />;
  if (!projects || projects.length === 0) {
    return <div className="text-center text-gray-500">No projects found.</div>;
  }

  return (
    <Table>
      <Table.Header>
        <th scope="col" className="px-6 py-3">#</th>
        <th scope="col" className="px-6 py-3">Project</th>
        <th scope="col" className="px-6 py-3">Category</th>
        <th scope="col" className="px-6 py-3">Budget</th>
        <th scope="col" className="px-6 py-3">DeadLine</th>
        <th scope="col" className="px-6 py-3">Tags</th>
        <th scope="col" className="px-6 py-3">Freelancer</th>
        <th scope="col" className="px-6 py-3">Status</th>
        <th scope="col" className="px-6 py-3">Operation</th>
      </Table.Header>
      <Table.Body>
        {projects.map((project, index) => (
          <ProjectRow key={project._id} project={project} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}
