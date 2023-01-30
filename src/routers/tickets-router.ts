import { Router } from "express";
import { authenticateToken,validateBody } from "@/middlewares";
import { getTypes,gettickets,createTicket } from "@/controllers";
import { TicketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
    .all("/*", authenticateToken)
    .get("/", gettickets)
    .get("/types", getTypes)
    .post("/", validateBody(TicketSchema), createTicket);
  
export { ticketsRouter };
