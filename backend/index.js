const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const User = require("./models/user.model.js");
const userRoute = require("./routes/user.route.js");
const boardRoute = require("./routes/board.routes.js");
const cardRoute = require("./routes/card.routes.js");
const taskRoute = require("./routes/task.routes.js");
const app = express();

// middlewares
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

// environment variables
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.PORT;
const project_name = "Node-API";

//routes
app.use("/api/users", userRoute);
app.use("/api/boards", boardRoute);
app.use("/api/cards", cardRoute);
app.use("/api/tasks", taskRoute);

app.get("/", function (req, res) {
  res.send("Nodemon test");
});

mongoose
  .connect(
    `mongodb+srv://${USER}:${PASSWORD}@backenddb.hldza.mongodb.net/${project_name}?retryWrites=true&w=majority&appName=BackendDB`
  )
  .then(() => {
    console.log("connected to the database");
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.log("connection failed");
  });
