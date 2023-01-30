import { Payment } from "@prisma/client";
import payment from "@/repositories/payments-repository";
import { notFoundError, unauthorizedError } from "@/errors";

async function payments(ticketId: number, userId: number): Promise<Payment> {
    if (!ticketId) throw new Error("Ticket is required!!");
  
    const getpayment = await payment.payments(ticketId);
    if (!getpayment) throw notFoundError();
  
    const gettUser = await payment.paymentsUserId(ticketId, userId);
    if (!gettUser) throw unauthorizedError();
  
    return getpayment;
  }
  
  async function createPayments(paymentProcess: CreatePaymentProcessSchema & { userId: number }): Promise<Payment> {
    const User = await payment.userID(paymentProcess.ticketId, paymentProcess.userId);
  
    const ticket = await payment.ticket(paymentProcess.ticketId);
  
    const payments = await payment.create({
      ...paymentProcess,
      value: ticket.TicketType.price,
    });
  
    if (!ticket) throw notFoundError();
    if (!User) throw unauthorizedError();
    if (!payments) throw notFoundError();
  
    return payments;
  }

const paymentsService = {
    payments,
    createPayments
  };

  type CreatePaymentProcessSchema = {
    ticketId: number;
    cardData: {
      issuer: string;
      number: number;
      name: string;
      expirationDate: Date;
      cvv: number;
    };
  };

  export default paymentsService;