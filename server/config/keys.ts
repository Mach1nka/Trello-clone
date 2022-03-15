import 'dotenv/config';

interface Keys {
  MONGO_URI: string;
  JWT_SECRET_KEY: string;
}

const KEYS: Keys = {
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || ''
};

export default KEYS;
