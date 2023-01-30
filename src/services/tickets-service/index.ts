
import getTickets from "@/repositories/tickets-repository";


async function getTypes(){
  const result = await getTickets.type();


  
  return result;
}

async function gettickets(){
  const result = await getTickets.ticket();

  
  
  return result;
}



const ticketsService = {
 
    getTypes,
    gettickets
};

export default ticketsService;
