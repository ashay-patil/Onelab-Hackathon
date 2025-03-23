const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const newsRoute = require('./routes/fake-news');
const deepFakeImageRoute = require('./routes/deepFake');
const connectDB = require('./config/dbConnect');
const authenticateRoutes = require('./routes/authenticate');

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user/',authenticateRoutes);
app.use('/newsAPI/v1/',newsRoute);
app.use('/imageAPI/v1/',deepFakeImageRoute);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const PORT = process.env.PORT;

const start = async ()=>{
    try {
        connectDB(process.env.MONGO_URI);
        console.log('db connected ...');
        app.listen(PORT, ()=>console.log(`Server Listening on PORT:${PORT}...`));
    } catch (error) {
        console.log('error in connecting db...');
        console.log(error);
    }
    
}

start();