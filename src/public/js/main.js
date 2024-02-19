const socket = io();

const sendButton = document.querySelector("#send-button");
const user = document.querySelector("#user");
const message = document.querySelector("#message");

sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  let newMessage = {
    user: user.value,
    message: message.value,
  };
  if (user.value == "") return alert("User email required");
  if (message.value.trim() == "")
    return alert("Message empty, please introduce content");
  socket.emit("message", newMessage);

  user.value = "";
  message.value = "";
});