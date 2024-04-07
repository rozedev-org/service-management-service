import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    databaseURL: process.env.DATABASE_URL,
    appPort: parseInt(process.env.APP_PORT),
    jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
    jwtSecret: process.env.JWT_SECRET
  };
});
