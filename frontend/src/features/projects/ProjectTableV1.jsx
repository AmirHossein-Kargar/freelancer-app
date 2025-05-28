import useOwnerProjects from "./useOwnerProjects";
import Loading from "../../ui/Loading";
import truncateText from "../../utils/truncateText";
import formatDate from "../../utils/toLocalDateShort";
import formatUSD from "../../utils/formatCurrency";
export default function ProjectTable() {
  const { isLoading, projects } = useOwnerProjects();

  // if (isLoading) return <Loading />;
  // if (!projects || projects.length === 0) {
  //   return <div classNameName="text-center text-gray-500">No projects found.</div>;
  // }
  return (
    <div className="relative overflow-x-auto">
      <table className="min-w-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Project
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Budget
            </th>
            <th scope="col" className="px-6 py-3">
              DeadLine
            </th>
            <th scope="col" className="px-6 py-3">
              Tags
            </th>
            <th scope="col" className="px-6 py-3">
              Freelancer
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
      <tbody>
  {projects.map((project, index) => {
    return (
      <tr
        key={project._id}
        className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
      >
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">{truncateText(project.title, 30)}</td>
        <td className="px-6 py-4">{project.category.title}</td>
        <td className="px-6 py-4">{formatUSD(project.budget)}</td>
        <td className="px-6 py-4">{formatDate(project.deadline)}</td>
        <td className="px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => <span className="border px-2 py-1 rounded-full" key={tag}>{tag}</span>)}
          </div>
        </td>
        <td className="px-6 py-4">{project.freelancerName || '---'}</td>
        <td className="px-6 py-4">{project.status == "OPEN" ? <span className="text-green-500">Open</span> : <span className="text-red-500">Closed</span>}</td>
      </tr>
    );
  })}
</tbody>

      </table>
    </div>
  );
}


