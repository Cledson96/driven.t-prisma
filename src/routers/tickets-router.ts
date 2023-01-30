import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTypes,gettickets } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
    .all("/*", authenticateToken)
    .get("/", gettickets)
    .get("/types", getTypes)
  
export { ticketsRouter };
