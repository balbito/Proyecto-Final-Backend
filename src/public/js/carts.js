document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll(".btn-delete-product");
    const confirmQuantityButtons = document.querySelectorAll(
      ".btn-confirm-quantity"
    );
  
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async function (event) {
        const cartId = button.dataset.cartId;
        const productId = button.dataset.productId;
  
        try {
          const response = await fetch(
            `/api/actions/${cartId}/products/${productId}`,
            {
              method: "DELETE",
            }
          );
  
          if (response.ok) {
            button.closest(".card").remove();
          } else {
            console.error("Failed to delete product from cart");
          }
        } catch (error) {
          console.error("Error deleting product from cart:", error);
        }
      });
    });
  
    confirmQuantityButtons.forEach((button) => {
      button.addEventListener("click", async function (event) {
        const cartId = button.dataset.cartId;
        const productId = button.dataset.productId;
  
        const quantityInput = document.querySelector(
          `.product-quantity[data-product-id="${productId}"]`
        );
        const quantity = quantityInput.value;
  
        try {
          const response = await modifyProductQuantity(
            cartId,
            productId,
            "update",
            quantity
          );
  
          if (response.ok) {
            console.log("Product quantity updated successfully");
          } else {
            console.error("Failed to update product quantity");
          }
        } catch (error) {
          console.error("Error updating product quantity:", error);
        }
      });
    });
  
    async function modifyProductQuantity(cartId, productId, action, quantity) {
      try {
        const requestBody = { action: action, quantity: quantity };
        console.log("Request body:", requestBody);
        return await fetch(`/api/actions/${cartId}/products/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
      } catch (error) {
        console.error("Error modifying product quantity:", error);
      }
    }
  });