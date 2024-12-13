import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv"

dotenv.config();


export const ENDPOINT = process.env.MAILTRAP_ENDPOINT

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Test",
};

