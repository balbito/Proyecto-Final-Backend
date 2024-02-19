const socket = io();

const chatbox = document.querySelector("#chatbox");
let user;

Swal.fire({
    title: "Bienvenido",
    text: "Ingrese su nombre para continuar",
    input: "text", // Indicamos que el cliente necesita escribir un texto para poder avanzar de esa alerta 
    inputValidator: (value) => {
        return !value && "Necesitas identificarte"
    },
    allowOutsideClick: false
}).then((value) => {
    user = value.value;
    socket.emit("inicio", user);
});

chatbox.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        // cliente envia un mensaje
        socket.emit("message", {
            user,
            message: e.target.value,
        });
        chatbox.value = "";
    }
});

socket.on("connected", (data) => {
    if (user !== undefined) {
        Swal.fire({
            text: `Nuevo ususario conectado: ${data}`,
            toast: true,
            position: "top-right",
        });
    }
});

socket.on("messages", (data) => {
    const log = document.querySelector('#messages');
    let messages = "";

    data.forEach((message) => {
        messages += `<strong>${message.user}</strong>: ${message.message} <br />`
    });

    log.innerHTML = messages;

    // console.log(data)  // cuando nos conectamos el cliente va a recibir todos los mensajes
});