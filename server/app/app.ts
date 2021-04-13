import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import KEYS from '../config/keys';
import { router as authRouter } from './routes/auth';

const app = express();

mongoose
  .connect(KEYS.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', authRouter);

export default app;
