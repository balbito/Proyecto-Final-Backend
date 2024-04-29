document.addEventListener("DOMContentLoaded", function () {
    const deleteTicketButtons = document.querySelectorAll(".btn-delete-ticket");
  
    deleteTicketButtons.forEach((button) => {
      button.addEventListener("click", async function () {
        const ticketId = button.dataset.ticketId;
  
        try {
          const response = await fetch(`/api/tickets/${ticketId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (!response.ok) {
            throw new Error("Failed to delete ticket");
          }
  
          const responseData = await response.json();
          console.log(responseData);
  
          button.closest("tr").remove();
        } catch (error) {
          console.error("Error deleting ticket:", error.message);
        }
      });
    });
  });