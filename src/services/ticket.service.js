import ticketModel from "../models/ticket.model.js";

export default class TicketService {
  async getAllTickets() {
    try {
      const tickets = await ticketModel.find();
      return tickets;
    } catch (error) {
      console.error("Error consulting tickets");
    }
  }

  async getTicket(tid) {
    try {
      const ticket = await ticketModel.findById(tid);
      if (!ticket) {
        return { message: "Ticket not found with ID: " + tid };
      }
      return ticket;
    } catch (error) {
      console.error("Error consulting ticket with ID: " + tid);
    }
  }

  async deleteTicket(tid) {
    try {
      const ticket = await ticketModel.findByIdAndDelete(tid);
      if (!ticket) {
        return { message: "Ticket not found with ID: " + tid };
      }
      return { message: "Ticket deleted" };
    } catch (error) {
      console.error("Error deleting ticket with ID: " + tid);
    }
  }
}