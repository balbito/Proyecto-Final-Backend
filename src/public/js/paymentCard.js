// document
//   .getElementById("paymentForm")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const formData = new FormData(form);
//     const ticketId = formData.get("ticketId");
//     try {
//       const response = await fetch(`/api/payments/${ticketId}/purchase/`, {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
//       window.location.replace("/successPurchase");
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   });