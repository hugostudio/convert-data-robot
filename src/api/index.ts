import { Router } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const apiRouter = Router();
apiRouter.use(bodyParser.json({ limit: process.env.PARSER_JSON_LIMIT }));

export default apiRouter;
