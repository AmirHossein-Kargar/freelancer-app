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
          {project.tags.map((tag) => (
            <span className="border px-2 py-1 rounded-full" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4">{project.freelancerName || "---"}</td>
      <td className="px-6 py-4">
        {project.status == "OPEN" ? (
          <span className="text-green-500">Open</span>
        ) : (
          <span className="text-red-500">Closed</span>
        )}
      </td>
      <td className="text-center">
        <div className="flex justify-center">
          <>
            <Button
              onClick={() => setIsEditOpen(true)}
              color=""
              
            >
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
            <Button
              onClick={() => setIsDeleteOpen(true)}
              color="error"
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
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
                onConfirm={() => removeProject(project._id, {
                  onSuccess: () => setIsDeleteOpen(false)
                })}
                disabled={isDeleting}
              />
            </Modal>
          </>
        </div>
      </td>
    </Table.Row>
  );
}
