import express from 'express';
import { saveClientError } from '../controllers/errors';

const router = express.Router();

router.post('/error', saveClientError);

export { router };
