import express from "express";
import * as dotenv from "dotenv";
import apiRouter from "./api";

dotenv.config();

const run = async () => {
  const app = express();
  app.use(apiRouter);

  app.listen(process.env.HTTP_PORT, () => {
    console.log("Api no Ar !");
  });
};

run().catch((e) => console.error(e));
