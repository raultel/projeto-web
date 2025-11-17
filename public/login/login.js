const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (!res.ok) {
            document.getElementById("login-response").textContent = "usuário ou senha incorretos";
            return;
        }

        localStorage.setItem("jwtToken", result.token);
        window.location.replace("http://localhost:3000/");

    } catch (err) {
        console.error(err);
    }
});
