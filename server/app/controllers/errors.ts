import { Request, Response } from 'express';
import fs from 'fs';

const saveClientError = async (req: Request, res: Response): Promise<void> => {
  const { error, errorInfo } = req.body;

  const isDirExists = fs.existsSync('./server/errors');

  if (!isDirExists) {
    fs.mkdirSync('./server/errors');
  }

  const json = JSON.stringify(error);

  fs.appendFileSync('./server/errors/logs.txt', `\n${json} \t${errorInfo}\n`);
  res.end();
};

export { saveClientError };
