const formPassword = document.getElementById("passwordform");
formPassword.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(formPassword);
    const password = form.get("password")
    const token = window.location.search.split("=")[1]
    const confirmPassword = form.get("confirmpassword")
    console.log(password, confirmPassword, token, "soy frontend")
    fetch(`/api/users/changePassword`, {
        method: "POST",
        body: JSON.stringify({password, confirmPassword, token}),
        headers: {
           "Content-Type": "application/json",
        }
    }).then((result) => {
        if(result.status == 200 ) {
            alert("se reestablecio la contraseña")
            window.location.replace("/login")
        }
    })
})