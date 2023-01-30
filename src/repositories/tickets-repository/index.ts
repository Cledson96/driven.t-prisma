import { prisma } from "@/config";

async function type() {
    return prisma.ticketType.findMany()
}

async function ticketID(id: number) {
    return prisma.ticket.findFirst({
        where: {
          Enrollment: {
            userId: id,
          },
        },
        include: {
          TicketType: true,
        },
      })
}

async function check(userId: number) {
  return prisma.enrollment.findUnique({
    where: {
      userId,
    },
  });
}
async function ticketcreate(TypeId: number, userId: number) {
  return prisma.ticket.create({
    data: {
      status: TicketStatus.RESERVED,
      TicketType: {
        connect: {
          id: TypeId,
        },
      },
      Enrollment: {
        connect: {
          userId,
        },
      },
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
const getTickets = {
    type,
    ticketID,
    check,
    ticketcreate
};

export default getTickets;
