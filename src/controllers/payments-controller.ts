import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function payments(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketId } = req.query;
  
    try {
      const payments = await paymentsService.payments(+ticketId, userId);
  
      return res.status(200).send(payments);
    } catch (error) {
      if (error.name === "UnauthorizedError") {
        return res.status(httpStatus.UNAUTHORIZED).send(error.message);
      }
      if (error.name === "NotFoundError") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      }
      return res.sendStatus(httpStatus.BAD_REQUEST).send(error.message);
    }
  }

  export async function postPayment(req: AuthenticatedRequest, res: Response) {
    try {
      const payment = await paymentsService.createPayments({
        ...req.body,
        userId: req.userId,
      });
  
      return res.status(200).send(payment);
    } catch (error) {
      if (error.name === "UnauthorizedError") {
        return res.status(httpStatus.UNAUTHORIZED).send(error.message);
      }
      if (error.name === "NotFoundError" || error.name === "Error") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      }
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
  
  