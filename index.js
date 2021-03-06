const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const booksRoute = require('./routes/books');
const usersRoute = require('./routes/user');
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use(booksRoute);
app.use(usersRoute);

//create a logger
const logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console({
          format:winston.format.combine(
              winston.format.colorize({all:true})
          )
      }),
      new winston.transports.File({ filename: 'error.log', level: 'error' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' })
      ]
  });

//connect to mongodb atlas
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true})
.then(() => {
    logger.info("Connected to mongodb atlas");
}).catch(error => {
    logger.error(error.message);
});

app.listen(PORT, () => {
    logger.info(`Server started at PORT ${PORT}`);
});