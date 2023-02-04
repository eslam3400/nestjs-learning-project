import * as dotenv from 'dotenv';
import { env } from 'process';

dotenv.config({ path: `.env.${env.NODE_ENV || 'development'}` });

const appConfig = {
  app: {
    port: Number(env.PORT),
    validationWhiteList: Boolean(env.VALIDATION_PIPE_WHITELIST),
  },
  jwt: {
    ignoreExpiration: Boolean(env.JWT_IGNORE_EXPIRATION),
    secret: env.JWT_SECRET as string,
    expiresIn: env.JWT_EXPIRES_IN as string,
  },
  database: {
    type: env.DB_TYPE as any,
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: Boolean(env.DB_SYNCHRONIZE),
  },
};

export { appConfig };
