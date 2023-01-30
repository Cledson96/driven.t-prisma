import { prisma } from "@/config";

async function type() {
    return prisma.ticketType.findMany()
}

async function ticket() {
    return prisma.ticket.findFirst()
}

const getTickets = {
    type,
    ticket
};

export default getTickets;
