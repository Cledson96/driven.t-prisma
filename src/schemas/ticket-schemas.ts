import Joi from "joi";

type Ticketid = {
    ticketTypeId: number;
};

export const TicketSchema = Joi.object<Ticketid>({
    ticketTypeId: Joi.number().required(),
});
