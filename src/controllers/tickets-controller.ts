import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTypes(req: AuthenticatedRequest, res: Response) {

  try {
    const getTypes = await ticketsService.getTypes();
    if (!getTypes) 

    {return res.send([]).status(200)}
   return res.send(getTypes).status(200)
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function gettickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const tickets = await ticketsService.gettickets(userId);

    return res.status(200).send(getTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response){
  const body = req.body
  const user = req.userId
  try {
    const ticket = await ticketsService.createTicket({
      ...body,
      userId: user,
    });

    return res.status(201).send(ticket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
