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

        const result = await res.json();  // ✅ read body once

        if (!res.ok) {
            // responseText.textContent = "Erro: " + (result.message || "Login failed");
            return;
        }

        // Save token for future requests
        localStorage.setItem("jwtToken", result.token);
        // responseText.textContent = "Login successful!";

        // Redirect to admin page
        window.location.href = "/admin/music/index.html";

    } catch (err) {
        console.error(err);
        // responseText.textContent = "Erro ao conectar ao servidor";
    }
});
