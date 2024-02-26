export default class TicketsRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    getAll = () => {
      return this.dao.getAllTickets();
    };
  
    getOne = (tid) => {
      return this.dao.getTicket(tid);
    };
    create = (ticketData) => {
      return this.dao.createTicket(ticketData);
    };
    delete = (tid) => {
      return this.dao.deleteTicket(tid);
    };
  }