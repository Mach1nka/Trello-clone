import 'dotenv/config';

export default {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'dev-secret-key',
  PORT: parseInt(String(process.env.PORT), 10) || 3003
};
