document.addEventListener("DOMContentLoaded", function () {
    const deleteUserButtons = document.querySelectorAll(".btn-delete-user");
  
    deleteUserButtons.forEach((button) => {
      button.addEventListener("click", async function () {
        const userId = button.dataset.userId;
  
        try {
          const response = await fetch(`/api/users/${userId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (!response.ok) {
            throw new Error("Failed to delete user");
          }
  
          const responseData = await response.json();
          console.log(responseData);
  
          button.closest("tr").remove();
        } catch (error) {
          console.error("Error deleting user:", error.message);
        }
      });
    });
  });