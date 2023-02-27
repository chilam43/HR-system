import { config } from 'dotenv';
import populateENV from 'populate-env';

config();

// eslint-disable-next-line prefer-const
export let env = {
  NODE_ENV: '',
  DB_NAME: '',
  DB_USER: '',
  DB_PASSWORD: '',
  DB_HOST: '',
  POSTGRES_HOST: '',
  POSTGRES_DB: '',
  POSTGRES_USER: '',
  POSTGRES_PASSWORD: '',
};

populateENV(env, { mode: 'halt' });
