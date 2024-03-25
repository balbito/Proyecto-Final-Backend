const formEmail = document.getElementById("emailform");

formEmail.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(formEmail);
    const email = form.get("email")
    fetch(`/api/users/resetPassword`, {
        method: "POST",
        body: JSON.stringify({email}),
        headers: {
           "Content-Type": "application/json",
        }
    }).then((result) => {
        if(result.status == 200 ) {
            alert("se envio un correo para reestablecer la contraseña")
            window.location.replace("/login")
        }
    })
})


