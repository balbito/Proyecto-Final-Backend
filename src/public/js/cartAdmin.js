document.addEventListener("DOMContentLoaded", function () {
    const deleteCartButtons = document.querySelectorAll(".btn-delete-cart");
  
    deleteCartButtons.forEach((button) => {
      button.addEventListener("click", async function () {
        const cartId = button.dataset.cartId;
  
        try {
          const response = await fetch(`/api/carts/${cartId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (!response.ok) {
            throw new Error("Failed to delete cart");
          }
  
          const responseData = await response.json();
          console.log(responseData);
  
          button.closest("tr").remove();
        } catch (error) {
          console.error("Error deleting cart:", error.message);
        }
      });
    });
  });