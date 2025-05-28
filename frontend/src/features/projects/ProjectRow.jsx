import React from "react";
import Table from "../../ui/Table";
import truncateText from "../../utils/truncateText";
import formatUSD from "../../utils/formatCurrency";
import formatDate from "../../utils/toLocalDateShort";
import Button from "@mui/material/Button";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function ProjectRow({ project, index }) {
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
          <Button

          color=""
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <EditOutlinedIcon />
        </Button>
        <Button

          color="error"
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <DeleteOutlineOutlinedIcon />
        </Button>
    </div>
      </td>
    </Table.Row>
  );
}
