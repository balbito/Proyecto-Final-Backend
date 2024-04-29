const socket = io();

const button = document.querySelector("#submitButton");

button.addEventListener("click", (e) => {
  e.preventDefault();
  const message = document.querySelector("#message");
  const email = document.querySelector("#email");
  const name = document.querySelector("#name");

  const chatMessage = {
    user: email.value,
    message: message.value,
    name: name.value,
  };
  socket.emit("message", chatMessage);
  message.value = "";
});

socket.on("newmessage", (data) => {
  if (Array.isArray(data)) {
    const messages = document.querySelector("#messages");
    let message = "";
    data.forEach((element) => {
      message += `<br><strong class="ms-3">${element.name}:</strong> ${element.message} <br>`;
    });
    messages.innerHTML = message;
  }
});
