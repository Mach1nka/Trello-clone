import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import bodyParser from 'body-parser';
import passportMiddleware from './middleware/passport';
import KEYS from '../config/keys';
import { router as authRoutes } from './routes/auth';
import { router as boardsRoutes } from './routes/boards';
import { router as columnsRoutes } from './routes/columns';
import { router as cardsRoutes } from './routes/cards';

const app = express();

mongoose
  .connect(KEYS.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(passport.initialize());
passportMiddleware();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', boardsRoutes);
app.use('/api', columnsRoutes);
app.use('/api', cardsRoutes);

export default app;
