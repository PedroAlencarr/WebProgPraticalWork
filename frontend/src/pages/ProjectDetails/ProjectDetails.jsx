import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { styled } from "@mui/system";
import { Box, Typography, Button, CircularProgress, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCollaboratorModal from "../../components/AddCollaboratorModal/AddCollaboratorModal";
import TaskCreation from "../TaskCreation/TaskCreation";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import CardTask from "../../components/TaskCard/TaskCard.jsx";
import { calculateProgress } from "../../utils/CalculateProgress.jsx";
import CustomButton from "../../components/CustomButton/CustomButton.jsx";
import { useNavigate } from "react-router-dom";

const Section = styled(Box)({
  display: "flex",
  flexDirection: "column",
  margin: "30px 20px",
  color: "white",
});

const TextBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  marginBottom: "16px",
});

const ProgressBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: '1rem',
  width: "100%",
  margin: "30px 0",
  "@media (max-width: 540px)": {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px"
  }
});

const Board = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: '1rem',
});

const BoardHeader = styled(Typography)({
  backgroundColor: "#FED36A",
  height: "30px",
  color: "#263238",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "600",
});

const CollaboratorsBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  marginTop: "20px",
  gap: "8px",
});

const CollaboratorItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "#607D8B",
  padding: "8px",
  borderRadius: "4px",
  color: "white",
});

const AddTaskButton = styled(Button)({
  backgroundColor: "#FED36A",
  color: "#212832",
  width: "200px",
  height: "50px",
  fontWeight: "500",
  "&:hover": {
    backgroundColor: "#fac746",
  },
});

export default function ProjectDetails() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(0);
  const [collaborators, setCollaborators] = useState([]);
  const [addCollaboratorModalOpen, setAddCollaboratorModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, showMessage } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleDeleteBoard = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/boards/${id}`, { 
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        showMessage('Board successful deleted!', 'success');
        navigate('/boards')
      }
    } catch (error) {
      const errorMessage = error?.message || 'Erro';
      showMessage(errorMessage, 'error');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/cards/${taskId}`, { 
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        fetchTasks(id)
        showMessage('Task successful deleted!', 'success');
      }
    } catch (error) {
      const errorMessage = error?.message || 'Erro';
      showMessage(errorMessage, 'error');
    }
  };
  
  const handleStatusChange = async (taskId, status) => {
    console.log(taskId, status)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/cards/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ['status']: status }),
        credentials: 'include',
      });
      if (response.ok) {
        fetchTasks(id)
        showMessage('Task successful updated!', 'success');
      }
    } catch (error) {
      const errorMessage = error?.message || 'Erro';
      showMessage(errorMessage, 'error');
    }
  };

  const fetchCollaborators = async (boardId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/boards/${boardId}/getUsers`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar colaboradores");
      }
      const collaborators = await response.json();
      setCollaborators(collaborators);
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
    }
  };

  const addCollaborator = async (values) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/boards/${id}/add_user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ addedUserEmail: values.email }),
      });
      if (!response.ok) {
        throw new Error("Erro ao adicionar colaborador");
      }
      const data = await response.json();
      showMessage('Collaborator successful added!', 'success');
      fetchCollaborators(id);
      setAddCollaboratorModalOpen(false);
    } catch (error) {
      const errorMessage = error?.message || 'Erro';
      showMessage(errorMessage, 'error');
    }
  };

  const removeCollaborator = async (collaboratorEmail) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/boards/${id}/remove_user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ removedUserEmail: collaboratorEmail }),
      });
      if (!response.ok) {
        throw new Error("Erro ao remover colaborador");
      }
      showMessage('Collaborator successful removed!', 'success');
      fetchCollaborators(id);
    } catch (error) {
      const errorMessage = error?.message || 'Erro';
      showMessage(errorMessage, 'error');
  };
};

  const fetchBoard = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/boards/${id}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar board');
      }
      const data = await response.json();
      setBoard(data);
    } catch (error) {
      console.error('Erro ao buscar board:', error);
    }
  };

  const fetchTasks = async (boardId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/api/cards/${boardId}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar tasks");
      }
      const data = await response.json();
      setTasks(data);
      const progressValue = calculateProgress(data);
      setProgress(progressValue);
    } catch (error) {
      console.error("Erro ao buscar tasks:", error);
    }
  };

  useEffect(() => {
    fetchBoard();
    fetchTasks(id);
    fetchCollaborators(id);
  }, []);

  const backlogTasks = tasks.filter((task) => task.status === "Rejected");
  const todoTasks = tasks.filter((task) => task.status === "To Do");
  const doingTasks = tasks.filter((task) => task.status === "Doing");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  return (
    <Section>
      <TextBox>
        <Typography variant="h1" sx={{ fontSize: "32px", fontWeight: 600 }}>
          {board && board.title}
        </Typography>
        <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: 500, mt: 2, mb: 2 }}>
          Description
        </Typography>
        <Typography sx={{ color: "#BCCFD8" }}>
          {board && board.description}
        </Typography>
        <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: 500, mt: 2, mb: 2 }}>
          Project Progress
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: 'fit-content', }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <CircularProgress sx={{ color: '#FED36A' }} variant="determinate" value={progress} />
            </Box>
            <Typography variant="p" color="#fff">{`${progress}%`}</Typography>
        </Box>
        <CollaboratorsBox>
          <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: 500 }}>
            Collaborators
          </Typography>
          {collaborators.map((collaborator) => (
            <CollaboratorItem key={collaborator._id}>
              {collaborator.email}
              {(board?.createdBy.toString() === user._id.toString()) && (
                <IconButton onClick={() => removeCollaborator(collaborator.email)}>
                  <CloseIcon sx={{ color: "white" }} />
                </IconButton>
              )}
            </CollaboratorItem>
          ))}
      </CollaboratorsBox>
      </TextBox>

      <ProgressBox>
        <Board>
          <BoardHeader>Rejected</BoardHeader>
          {backlogTasks.map((task) => (
            <CardTask
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              onDelete={handleDeleteTask}
              onChangeStatus={handleStatusChange}
            />
          ))}
        </Board>
        <Board>
          <BoardHeader>To Do</BoardHeader>
          {todoTasks.map((task) => (
            <CardTask
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              onDelete={handleDeleteTask}
              onChangeStatus={handleStatusChange}
          />
          ))}
        </Board>
        <Board>
          <BoardHeader>Doing</BoardHeader>
          {doingTasks.map((task) => (
            <CardTask
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              onDelete={handleDeleteTask}
              onChangeStatus={handleStatusChange}
          />
          ))}
        </Board>
        <Board>
          <BoardHeader>Done</BoardHeader>
          {doneTasks.map((task) => (
            <CardTask
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              onDelete={handleDeleteTask}
              onChangeStatus={handleStatusChange}
          />
          ))}
        </Board>
      </ProgressBox>

      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2rem',
          width: 'fit-content',
          marginTop: '2rem',
        }}>
        <Box className="button__div" >
          <CustomButton onClick={handleModalOpen} variantStyle="filled" text="Add Task" fullWidth sx={{padding: '.5rem 1rem'}}/>
        </Box>

        <TaskCreation open={open} onClose={handleModalClose} id={id} fetchTasks={fetchTasks}/>

        {(board?.createdBy.toString() === user._id.toString()) && (
          <Box>
            <CustomButton onClick={() => setAddCollaboratorModalOpen(true)} variantStyle="filled" text="Add Collaborator" fullWidth sx={{padding: '.5rem 1rem'}}/>
          </Box>
        )}

        <AddCollaboratorModal
          open={addCollaboratorModalOpen}
          onClose={() => setAddCollaboratorModalOpen(false)}
          onSubmit={addCollaborator}
        />

        {(board?.createdBy.toString() === user._id.toString()) && (
          <Box>
            <CustomButton onClick={handleDeleteBoard} variantStyle="filled" text="Delete Board" fullWidth sx={{backgroundColor: 'red', padding: '.5rem 1rem', color: 'white'}}/>
          </Box>
        )}
      </Box>
    </Section>
  );
}