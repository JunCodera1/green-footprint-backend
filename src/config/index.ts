import dotenv from "dotenv";
dotenv.config();

import { appConfig } from "./app.config";
import { dbConfig } from "./db.config";
import { authConfig } from "./auth.config";
import { mailConfig } from "./mail.config";
import { winstonConfig } from "./winston.config";

export const config = {
  app: appConfig,
  db: dbConfig,
  auth: authConfig,
  sendgrid: mailConfig,
  winston: winstonConfig,
};
