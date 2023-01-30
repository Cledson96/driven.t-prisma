import { prisma } from "@/config";


async function payments(ticketId: number) {
    return prisma.payment.findFirst({
      where: {
        Ticket: {
          id: ticketId,
        },
      },
    });
  }

  async function paymentsUserId(ticketId: number, userId: number) {
    return prisma.payment.count({
      where: {
        Ticket: {
          AND: [{ id: ticketId }, { Enrollment: { User: { id: userId } } }],
        },
      },
    });
  }

  async function userID(id: number, userId: number) {
    return prisma.ticket.findFirst({
      where: {
        Enrollment: {
          userId,
        },
        id,
      },
      include: {
        TicketType: true,
      },
    });
  }

async function ticket(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
    include: {
      TicketType: true,
    },
  });
}
enum TicketStatus {
  RESERVED = "RESERVED",
  PAID = "PAID",
}

async function create({ ticketId, value, cardData: { issuer, number } }: PaymentSchema) {
  return prisma.payment.create({
    data: {
      ticketId,
      cardIssuer: issuer,
      cardLastDigits: number.toString().slice(-4),
      value,
    },
  });
}

  const payment = {
    payments,
    paymentsUserId,
    userID,
    ticket,
    create
  };
  type PaymentSchema = {
    value: number;
    ticketId: number;
    cardData: {
      issuer: string;
      number: number;
    };
  };
  export default payment;