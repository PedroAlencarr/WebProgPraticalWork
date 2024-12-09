import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Typography, Box, Container, styled } from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import BoardCard from '../../components/BoardCard/BoardCard.jsx';
import AddBoardModal from '../../components/AddBoard/AddBoard.jsx';

const StyledCardsBox = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1rem',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  }));

export default function BoardsPage() {
  const [boards, setBoards] = useState([]);
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);

  const fetchBoards = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/boards/current`, {
          credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar boards');
      }
      const data = await response.json();
      setBoards(data);
    } catch (error) {
      console.error('Erro ao buscar boards:', error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleCreateBoard = async (values) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/boards/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
      });

      if (response.ok) {
        alert('Board adicionado com sucesso!');
        setOpenModal(false);
        fetchBoards()
      } else {
        alert('Erro ao adicionar o board');
      }
    } catch (error) {
      console.error('Erro ao adicionar o board:', error);
    }
  };
  return (
    <Container
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'left',
            gap: '2rem',
            padding: '2rem',
        }}>
        <Box 
            sx={{
                width: 'fit-content',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography
                variant="p"
                sx={{
                    fontSize: '11px',
                    lineHeight: '19px',
                    color: '#FED36A',
                }}>
                Welcome Back!
            </Typography>
            <Typography 
                variant="p"
                sx={{
                    fontSize: '22px',
                    lineHeight: '27.5px',
                    color: '#fff',
                }}>
                {user.first_name}!
            </Typography>
        </Box>
        <StyledCardsBox>
            {boards.map((board) => (
                <BoardCard
                    key={board._id}
                    id={board._id}
                    name={board.title}
                    progress={board.progress || 0}
                />
            ))}
        </StyledCardsBox>
        <Box sx={{alignSelf: 'center',}}>
            <CustomButton variantStyle="filled" text='Add new board' onClick={handleOpenModal} />

            <AddBoardModal
                open={openModal}
                onClose={handleCloseModal}
                onSubmit={handleCreateBoard}
            />
        </Box>
    </Container>
  );
};
