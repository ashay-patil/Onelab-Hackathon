const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors({
    origin: "http://localhost:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", ],
}));

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const newsRoute = require('./routes/fake-news');
const deepFakeImageRoute = require('./routes/deepFake');


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//     console.log(`Incoming request: ${req.method} ${req.url}`);
//     next();
// });
app.use(express.static('./public'));
app.use('/newsAPI/v1/',newsRoute);
app.use('/imageAPI/v1/',deepFakeImageRoute);

// app.get('/', (req,res)=>{
//     res.send('Home Page');
// })

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const PORT = process.env.PORT;

const start = ()=>{
    app.listen(PORT, ()=>console.log(`Server Listening on PORT:${PORT}...`));
}

start();