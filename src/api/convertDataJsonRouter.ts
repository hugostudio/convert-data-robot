import { Request, Response, Router } from "express";
import { convertDataJsonService } from "../service";

const convertDataJsonRouter = Router();

convertDataJsonRouter.post("/by-now", async (req: Request, res: Response) => {
  const param = req.body;
  req.body = convertDataJsonService.execute(param);    
  res.set('Content-Type','application/json');
  res.send(req.body);
});

convertDataJsonRouter.get("/get-test", async (_req: Request, res: Response) => {
  let result = { ok: true};
  res.set('Content-Type','application/json');
  res.send(result);
});

export default convertDataJsonRouter;