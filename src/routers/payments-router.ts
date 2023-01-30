import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { payments,postPayment} from "@/controllers";
import { paymentSchema } from "@/schemas";


const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", payments)
  .post("/process", validateBody(paymentSchema), postPayment);

export { paymentRouter };
