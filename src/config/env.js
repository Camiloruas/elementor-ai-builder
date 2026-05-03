import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 3333),
  openAiApiKey: process.env.OPENAI_API_KEY,
};
