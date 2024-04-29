document.addEventListener("DOMContentLoaded", function () {
  const deleteUserButtons = document.querySelectorAll(".btn-delete-user");
  const changeRoleButtons = document.querySelectorAll(".btn-change-user");


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

  changeRoleButtons.forEach((button) => {
    button.addEventListener("click", async function () {
      const uid = button.dataset.userId;

      try {
        const response = await fetch(`/api/users/changeRole/${uid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to change user role");
        }

        const responseData = await response.json();
        console.log(responseData.message);

        const roleCell = button.closest("tr").querySelector(".user-role");
        roleCell.textContent =
          roleCell.textContent === "user" ? "premium" : "user";
      } catch (error) {
        console.error("Error changing user role:", error.message);
      }
    });
  });

  expiredUsers = document.querySelector("#expiredUsers");
  expiredUsers.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('api/users/delete/inactiveUsers', {
      method: "delete"
    }).then((result) => {
      if (result.status === 200) {
        Swal.fire({
          icon: "success",
          text: `Usuarios expirados, eliminados exitosamente.`,
          width: 400,
        }).then(() => window.location.reload());
      }
      if (result.status === 204) {
        Swal.fire({
          icon: "info",
          text: `Todos los usuarios se encuentran acutalmente activos.`,
          width: 400,
        }).then(() => window.location.reload());
      }
      if (result.status === 404) {
        Swal.fire({
          icon: "error",
          text: `Hubo un error al eliminar los usuarios expirados.`,
          width: 400,
        }).then(() => window.location.reload());
      }
    })
  })
});