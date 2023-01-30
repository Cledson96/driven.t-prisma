
import getTickets from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";
import { Ticket } from "@prisma/client";


async function getTypes(){
  const result = await getTickets.type();


  
  return result;
}

async function gettickets(id: number){
  const result = await getTickets.ticketID(id);
  if (!result) throw notFoundError();

  return result;
}

async function createTicket({ TypeId, userId }: Ticketcreate): Promise<Ticket> {
  const create = await getTickets.check(userId);

  if (!create) throw notFoundError();

  const ticket = await getTickets.ticketcreate(TypeId, userId);

  return ticket; 
}



const ticketsService = {
 
    getTypes,
    gettickets,
    createTicket
};

type Ticketcreate = {
  TypeId: number;
  userId: number;
};

export default ticketsService;

