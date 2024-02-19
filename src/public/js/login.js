const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  fetch("/api/jwt/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    if (result.status === 200) {
      result.json();
      console.log("Generated cookies:");
      console.log(document.cookie);
      alert("Success login");
      window.location.replace("/products");
    } else if (result.status === 401) {
      console.log(result);
      alert("Login error check credentials");
    }
  });
});