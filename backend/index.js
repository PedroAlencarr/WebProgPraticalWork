const express = require('express')
const session = require('express-session')
const listEndpoints = require('express-list-endpoints');
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');

dotenv.config()
const User = require('./models/user.model.js')
const userRoute = require('./routes/user.route.js')
const boardRoute = require('./routes/board.routes.js')
const cardRoute = require('./routes/card.routes.js')

const app = express()

// environment variables
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const PORT = process.env.PORT
const FRONT_URL = process.env.FRONT_URL
const project_name = 'Node-API'

// middlewares
app.set("trust proxy",1);
app.use(express.json())
app.use(cors({
  origin: FRONT_URL,
  credentials: true
}));
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Coloque uma string secreta em .env
    resave: false, // Não salvar se a sessão não foi modificada
    saveUninitialized: false, // Não salvar sessões vazias
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${USER}:${PASSWORD}@backenddb.hldza.mongodb.net/${project_name}?retryWrites=true&w=majority&appName=BackendDB`, // Persistência no MongoDB
    }),
    cookie: {
      httpOnly: true, // Protege contra XSS
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
      secure: true,
      sameSite: 'none',
    },
  })
);


//routes
app.use('/api/users', userRoute)
app.use('/api/boards', boardRoute)
app.use('/api/cards', cardRoute)


app.get('/', function (req, res) {
    res.send('Home')
})

//uncomment to see all routes
//console.log(listEndpoints(app));

mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@backenddb.hldza.mongodb.net/${project_name}?retryWrites=true&w=majority&appName=BackendDB`)
.then(() => {
  console.log('connected to the database')
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
  })
})
.catch(() => {
  console.log('connection failed')
})