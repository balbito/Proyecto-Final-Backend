import { ticketsService } from "../services/service.js";

export const getAllTicketsController = async (req, res) => {
  try {
    const tickets = await ticketsService.getAll();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTicketController = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const ticket = await ticketsService.getOne(ticketId);
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTicketController = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    await ticketsService.delete(ticketId);
    res.json({ message: "Ticket deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};