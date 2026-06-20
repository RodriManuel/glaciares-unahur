
// Validación de formularios

// Newsletter
const formNewsletter = document.getElementById("news-form");
const inputEmail = document.getElementById("news-email");
const inputNombre = document.getElementById("news-nombre");
const inputApellido = document.getElementById("news-apellido");
const msgNewsletter = document.getElementById("news-message");

formNewsletter.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que la página se recargue

    const email = inputEmail.value.trim();
    const nombre = inputNombre.value.trim();
    const mensaje = inputApellido.value.trim();

    if (email.length < 4 || !email.includes("@")) {
        msgNewsletter.textContent = "Por favor ingresá un email válido.";
        msgNewsletter.style.color = "#B71C1C";
        return;
    }

    if (nombre === "" || mensaje === "") {
        msgNewsletter.textContent = "Completá todos los campos antes de enviar.";
        msgNewsletter.className = "error";
        msgNewsletter.style.color = "#B71C1C";
        return;
    }

    msgNewsletter.textContent = `¡Gracias! Vas a recibir noticias en ${email}.`;
    msgNewsletter.style.color = "#1A6B2A";

    formNewsletter.reset();
});
