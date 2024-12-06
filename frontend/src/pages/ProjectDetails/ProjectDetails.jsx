import React from "react";
import { styled } from "@mui/system";
import { Box, Typography, Button } from "@mui/material";

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
  width: "90vw",
  margin: "30px 0",
  "@media (max-width: 540px)": {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px"
  }
});

const Board = styled(Box)({
  backgroundColor: "#455A64",
  width: "240px",
  height: "360px",
  marginLeft: "24px",
  "@media (max-width: 540px)": {
    marginLeft: "0px",
    marginBottom: "32px",
    width: "300px"
  }
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

const AddTaskButton = styled(Button)({
  backgroundColor: "#FED36A",
  color: "#212832",
  width: "200px",
  height: "50px",
  margin: "30px auto 20px auto",
  fontWeight: "500",
  "@media (max-width: 540px)": {
    marginBottom: "64px",
    marginTop: "0px"
  },
  "&:hover": {
    backgroundColor: "#fac746",
  },
});

export default function ProjectDetails() {
  return (
    <Section>
      <TextBox>
        <Typography variant="h1" sx={{ fontSize: "32px", fontWeight: 600 }}>
          Placeholder Project Title
        </Typography>
        <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: 500, mt: 2, mb: 2 }}>
          Project Details
        </Typography>
        <Typography sx={{ color: "#BCCFD8" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
          has been the industry's standard dummy text ever since the 1500s, when an unknown printer
          took a galley of type and scrambled
        </Typography>
        <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: 500, mt: 2, mb: 2 }}>
          Project Progress
        </Typography>
      </TextBox>

      <ProgressBox>
        <Board>
          <BoardHeader>Backlog</BoardHeader>
        </Board>
        <Board>
          <BoardHeader>To Do</BoardHeader>
        </Board>
        <Board>
          <BoardHeader>Doing</BoardHeader>
        </Board>
        <Board>
          <BoardHeader>Done</BoardHeader>
        </Board>
      </ProgressBox>
      <Box className="button__div" sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <AddTaskButton>Add Task</AddTaskButton>
      </Box>
    </Section>
  );
}