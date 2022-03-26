import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import passport from 'passport';

import DBConnector from './database/connector';
import { passportMiddleware } from './middleware/passport';
import errorMiddleware from './middleware/error-handler';
import { router as authRoutes } from './routes/auth';
import { router as boardsRoutes } from './routes/boards';
import { router as columnsRoutes } from './routes/columns';
import { router as cardsRoutes } from './routes/cards';
import { router as usersRoutes } from './routes/users';
import { router as errorRoutes } from './routes/error';

const app = express();

// A DB connection
DBConnector.establishConnection();

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api', boardsRoutes);
app.use('/api', columnsRoutes);
app.use('/api', cardsRoutes);
app.use('/api', usersRoutes);
app.use('/api', errorRoutes);

app.use(errorMiddleware);

export default app;
