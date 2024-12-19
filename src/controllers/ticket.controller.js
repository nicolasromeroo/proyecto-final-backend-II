
import { ticketModel } from './models/ticket.model.js';

export const createTicket = async (amount, purchaser) => {
  try {
    const newTicket = new ticketModel({
      amount: amount,
      purchaser: purchaser,
    });
    
    await newTicket.save();
    console.log('Ticket creado:', newTicket);
  } catch (error) {
    console.error('Error al crear ticket:', error);
  }
};

