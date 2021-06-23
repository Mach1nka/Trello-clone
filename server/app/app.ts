import 'express-async-errors';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import bodyParser from 'body-parser';

import passportMiddleware from './middleware/passport';
import KEYS from '../config/keys';
import errorMiddleware from './middleware/errorHandler';
import { router as authRoutes } from './routes/auth';
import { router as boardsRoutes } from './routes/boards';
import { router as columnsRoutes } from './routes/columns';
import { router as cardsRoutes } from './routes/cards';
import { router as usersRoutes } from './routes/users';

const app = express();

mongoose
  .connect(KEYS.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,HEAD,PATCH,DELETE,PUT',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: 'Authorization'
  })
);
app.use(passport.initialize());
passportMiddleware();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', boardsRoutes);
app.use('/api', columnsRoutes);
app.use('/api', cardsRoutes);
app.use('/api', usersRoutes);

app.use(errorMiddleware);

export default app;
