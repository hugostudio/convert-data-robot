import { Request, Response, Router } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import convertDataJsonRouter from "./convertDataJsonRouter";

dotenv.config();

const apiRouter = Router();
apiRouter.use(bodyParser.json({ limit: process.env.PARSER_JSON_LIMIT }));
apiRouter.use("/api/convert-data-json", convertDataJsonRouter);

apiRouter.get("/api/get-test", async (req: Request, res: Response) => {
  let result = { ok: true};
  res.set('Content-Type','application/json');
  res.send(result);
});

export default apiRouter;
