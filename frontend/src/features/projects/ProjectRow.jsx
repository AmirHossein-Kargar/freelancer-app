import React, { useState } from "react";
import Table from "../../ui/Table";
import truncateText from "../../utils/truncateText";
import formatUSD from "../../utils/formatCurrency";
import formatDate from "../../utils/toLocalDateShort";
import Button from "@mui/material/Button";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useRemoveProject from "./useRemoveProject";

export default function ProjectRow({ project, index }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { isDeleting, removeProject } = useRemoveProject();

  return (
    <Table.Row>
      <td className="px-6 py-4">{index + 1}</td>
      <td className="px-6 py-4">{truncateText(project.title, 30)}</td>
      <td className="px-6 py-4">{project.category.title}</td>
      <td className="px-6 py-4">{formatUSD(project.budget)}</td>
      <td className="px-6 py-4">{formatDate(project.deadline)}</td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span className="bg-primary/10 px-3 py-1 rounded-full" key={tag}>
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs">+{project.tags.length - 3} more</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">{project.freelancerName || "---"}</td>
      <td className="px-6 py-4">
        <StatusBadge status={project.status} />
      </td>
      <td className="text-center">
        <div className="flex justify-center">
          <>
            <Button onClick={() => setIsEditOpen(true)}>
              <EditOutlinedIcon />
            </Button>
            <Modal
              title={`Edit Project: ${project.title}`}
              open={isEditOpen}
              onClose={() => setIsEditOpen(false)}
            >
              this is modal...
            </Modal>
          </>

          <>
            <Button onClick={() => setIsDeleteOpen(true)} color="error">
              <DeleteOutlineOutlinedIcon />
            </Button>

            <Modal
              title={`Delete Project: ${project.title}`}
              open={isDeleteOpen}
              onClose={() => setIsDeleteOpen(false)}
            >
              <ConfirmDelete
                resource={project.title}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={() =>
                  removeProject(project._id, {
                    onSuccess: () => setIsDeleteOpen(false),
                  })
                }
                disabled={isDeleting}
              />
            </Modal>
          </>
        </div>
      </td>
    </Table.Row>
  );
}

function StatusBadge({ status }) {
  const base = "px-3 py-1 rounded-full text-xs";
  const statusClasses = {
    OPEN: "bg-green-300 text-green-900",
    CLOSED: "bg-red-300 text-red-900",
  };

  return <span className={`${base} ${statusClasses[status]}`}>{status}</span>;
}
