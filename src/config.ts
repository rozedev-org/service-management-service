import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    databaseURL: process.env.DATABASE_URL,
    appPort: parseInt(process.env.APP_PORT)
  };
});
