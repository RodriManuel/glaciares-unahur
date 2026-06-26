// Fecha Dinámica
document.getElementById("year").textContent = new Date().getFullYear()

// Modo Oscuro
const btnModo = document.getElementById("btn-modo");
const configActual = localStorage.getItem('theme');

// Verifica si ya hay preferencia guardada o usa la del sistema.

// Determina si debe arrancar en modo oscuro (por localStorage o sistema)
const esOscuro = configActual === 'dark' || (!configActual && window.matchMedia('(prefers-color-scheme: dark)').matches);

if (esOscuro) {
    document.body.classList.add("dark-mode");
    btnModo.textContent = "☀️";
} else {
    document.body.classList.remove("dark-mode");
    btnModo.textContent = "🌒";
}

btnModo.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Verifica si el modo oscuro quedó activo
    const modoActivo = document.body.classList.contains("dark-mode");

    // Guarda la elección actual en localStorage,
    if (modoActivo) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }

    // Cambia el texto del botón según el estado actual
    btnModo.textContent = modoActivo ? "☀️" : "🌒";
});


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
    const apellido = inputApellido.value.trim();

    if (email.length < 4 || !email.includes("@")) {
        msgNewsletter.textContent = "Por favor ingresá un email válido.";
        msgNewsletter.style.color = "#B71C1C";
        return;
    }

    if (nombre === "" || apellido === "") {
        msgNewsletter.textContent = "Completá todos los campos antes de enviar.";
        msgNewsletter.className = "error";
        msgNewsletter.style.color = "#B71C1C";
        return;
    }

    msgNewsletter.textContent = `¡Gracias! Vas a recibir noticias en ${email}.`;
    msgNewsletter.style.color = "#1A6B2A";

    formNewsletter.reset();
});


const formContacto = document.getElementById("form-mensaje");
const inputContactoNombre = document.getElementById("nombre");
const inoputContactoEmail = document.getElementById("email");
const msgContacto = document.getElementById("contacto-message");

formContacto.addEventListener("submit",(e) =>{
    e.preventDefault();

    const nombre = inputContactoNombre.value.trim();
    const email = inoputContactoEmail.value.trim();

    if(nombre === ""){
        msgContacto.textContent = "Por favor, ingresá tu nombre.";
        msgContacto.style.color = "#B71C1C";
        return;
    }
    if(email.length < 4 || !email.includes("@")){
        msgContacto.textContent = "Por favor, ingresá un correo electrónico válido.";
        msgContacto.style.color = "#B71C1C";
        return;
    }
    msgContacto.textContent = `¡Mensaje enviado con éxito! Gracias por escribirnos, ${nombre}.`;
    msgContacto.style.color = "#1A6B2A"; 

    formContacto.reset()
})
