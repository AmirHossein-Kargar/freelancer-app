import { Button } from "@mui/material";
import ProjectTable from "../features/projects/ProjectTableV2";
import Modal from "../ui/Modal";
import { useState } from "react";
import CreateProjectForm from "../features/projects/CreateProjectForm";

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="dark:text-white">Projects</h2>
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ color: "#fff" }}
          onClick={handleOpenModal}
        >
          New Project
        </Button>
      </div>
      <ProjectTable />

      <Modal
        open={isModalOpen}
        // onClose={handleCloseModal}
        title="Create New Project"
      >
        {<CreateProjectForm />}
      </Modal>
    </div>
  );
}
