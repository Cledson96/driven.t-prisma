import Joi from "joi";

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
export const paymentSchema = Joi.object<CreatePaymentProcessSchema>({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.string().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.string().required(),
  }).required(),
});
