import React, { useEffect, useState, useContext } from 'react';
import BoardCard from '../../components/BoardCard/BoardCard.jsx';
import Slider from 'react-slick';
import { Typography, Box, Container } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AuthContext } from '../../context/AuthContext';

export default function BoardsPage() {
  const [boards, setBoards] = useState([]);
  const { user } = useContext(AuthContext);

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.first_name}!
        </Typography>
      </Box>
      <Slider {...sliderSettings}>
        {boards.map((board) => (
          <BoardCard
            key={board._id}
            name={board.title}
            progress={board.progress || 0}
          />
        ))}
      </Slider>
    </Container>
  );
};
