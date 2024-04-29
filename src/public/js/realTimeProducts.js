document.addEventListener("DOMContentLoaded", () => {
    const setupEventListeners = () => {
      const createProductBtn = document.getElementById("create-product");
      createProductBtn.addEventListener("click", () => {
        showCreateForm();
      });
  
      const updateProductBtn = document.getElementById("update-product");
      updateProductBtn.addEventListener("click", () => {
        showUpdateForm();
      });
  
      const createForm = document.querySelector(".create-form");
      createForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        await createProduct();
      });
  
      const updateForm = document.querySelector(".update-form");
      updateForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const productId = document.getElementById("productId").value;
        await updateProduct(productId);
      });
  
      const deleteButtons = document.querySelectorAll(".btn-delete-product");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const productId = button.dataset.productId;
          if (confirm("Are you sure you want to delete this product?")) {
            deleteProduct(productId);
          }
        });
      });
    };
  
    const showCreateForm = () => {
      document.querySelector(".create-form").style.display = "block";
      document.querySelector(".update-form").style.display = "none";
    };
  
    const showUpdateForm = () => {
      document.querySelector(".update-form").style.display = "block";
      document.querySelector(".create-form").style.display = "none";
    };
  
    const createProduct = async () => {
      const formData = new FormData(document.querySelector(".create-form"));
      const obj = {};
      formData.forEach((value, key) => (obj[key] = value));
      try {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        if (response.ok) {
          window.location.reload();
        } else {
          console.error("Error creating product:", response.statusText);
        }
      } catch (error) {
        console.error("Error creating product:", error.message);
      }
    };
  
    const updateProduct = async (pid) => {
      const formData = new FormData(document.querySelector(".update-form"));
      const obj = {};
      formData.forEach((value, key) => (obj[key] = value));
      try {
        const response = await fetch(`/api/products/${pid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        if (response.ok) {
          window.location.reload();
        } else {
          console.error("Error updating product:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating product:", error.message);
      }
    };
  
    const deleteProduct = async (pid) => {
      try {
        const response = await fetch(`/api/products/${pid}`, {
          method: "DELETE",
        });
        if (response.ok) {
          window.location.reload();
        } else {
          console.error("Error deleting product:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting product:", error.message);
      }
    };
  
    setupEventListeners();
  });