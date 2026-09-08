// Fecha Dinámica
const elYear = document.getElementById("year");
if (elYear) {
    elYear.textContent = new Date().getFullYear();
}

// Modo Oscuro
const btnModo = document.getElementById("btn-modo");

if(btnModo){
    // Sincronizamos el emoji inicial basándonos en lo que ya aplicó el <head>
    const esOscuroActual = document.documentElement.classList.contains("dark-mode");
    btnModo.textContent = esOscuroActual ? "☀️" : "🌒";

    btnModo.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark-mode");

        // Verifica si el modo oscuro quedó activo
        const modoActivo = document.documentElement.classList.contains("dark-mode");

        // Guarda la elección actual en localStorage
        if (modoActivo) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }

        // Cambia el texto del botón según el estado actual
        btnModo.textContent = modoActivo ? "☀️" : "🌒";
    });
}



// Validación de formularios
// Newsletter

const formNewsletter = document.getElementById("news-form");

if(formNewsletter) {
    
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
}

const formContacto = document.getElementById("form-mensaje");

if(formContacto) {
    
    const inputContactoNombre = document.getElementById("nombre");
    const inputContactoEmail = document.getElementById("email");
    const msgContacto = document.getElementById("contacto-message");

    formContacto.addEventListener("submit",(e) =>{
        e.preventDefault();

        const nombre = inputContactoNombre.value.trim();
        const email = inputContactoEmail.value.trim();

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
    });
}

//Unirse 
const formUnirse = document.getElementById("form-unirse");

if(formUnirse) {
    
    const inputJoinNombre = document.getElementById("join-nombre");
    const inputJoinEmail = document.getElementById("join-email");
    const selectInteres = document.getElementById("join-interes");
    const msgUnirse = document.getElementById("unirse-message");

    formUnirse.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = inputJoinNombre.value.trim();
        const email = inputJoinEmail.value.trim();
        const interes = selectInteres.value;

        if(nombre === ""){
            msgUnirse.textContent = "Por favor, ingresá tu nombre.";
            msgUnirse.style.color = "#B71C1C";
            return;
        }
        if(email.length < 4 || !email.includes("@")){
            msgUnirse.textContent = "Por favor, ingresá un correo electrónico válido.";
            msgUnirse.style.color = "#B71C1C";
            return;
        }
        if (interes === "") {
            msgUnirse.textContent = "Por favor, seleccioná un área en la que te gustaría ayudar.";
            msgUnirse.style.color = "#B71C1C";
            return;
        }

        msgUnirse.textContent = `¡Gracias ${nombre}! Tus datos fueron validados. Nos contactaremos a: ${email}.`;
        msgUnirse.style.color = "#1A6B2A"; 

        formUnirse.reset()
    });
}


document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector("#carouselExampleControls");
  const carouselInner = carousel.querySelector(".carousel-inner");
  const isDesktop = window.matchMedia("(min-width: 576px)");

  if (isDesktop.matches) {
    // Desactiva la transición nativa de Bootstrap para desktop
    const bsCarousel = new bootstrap.Carousel(carousel, {
      interval: false,
      touch: false
    });

    let scrollPosition = 0;

    carousel.querySelector(".carousel-control-next").addEventListener("click", function () {
      const cardWidth = carousel.querySelector(".carousel-item").offsetWidth;
      const maxScroll = carouselInner.scrollWidth - carouselInner.clientWidth;

      if (scrollPosition < maxScroll) {
        scrollPosition += cardWidth;
        carouselInner.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    });

    carousel.querySelector(".carousel-control-prev").addEventListener("click", function () {
      const cardWidth = carousel.querySelector(".carousel-item").offsetWidth;

      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        carouselInner.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    });
  }
});

const carrusel = document.querySelector('.carousel');
const puntoDeQuiebre = window.matchMedia('(max-width: 576px)');

function toggleSlideClass(e) {
    if (e.matches) {
        carrusel.classList.add('slide');
    } else {
        carrusel.classList.remove('slide');
    }
}

puntoDeQuiebre.addEventListener('change', toggleSlideClass);

toggleSlideClass(puntoDeQuiebre);

// 1. Variables de Estado Globales
let todosLosDiputados = [];
let swiperInstance = null;

// Guardan el estado actual de los filtros para combinarlos
let filtroBloqueActual = "todos";
let terminoBusquedaActual = "";

// 2. Función Principal de Carga de Datos
async function cargarDatosDiputados() {
    try {
        const [respuestaLocal, respuestaApi] = await Promise.all([
            fetch('./assets/data/diputados.json'),
            fetch('https://api.argentinadatos.com/v1/diputados/diputados')
        ]);

        if (!respuestaLocal.ok || !respuestaApi.ok) {
            throw new Error("Error al obtener los datos de una o ambas fuentes.");
        }

        const diputadosLocales = await respuestaLocal.json();
        const diputadosApi = await respuestaApi.json();

        // Guardamos los datos fusionados en la variable global
        todosLosDiputados = fusionarDiputados(diputadosLocales, diputadosApi);

        // Primer renderizado
        renderizarDiputados(todosLosDiputados);

        // Inicializamos Swiper después de que existen los slides en el DOM
        swiperInstance = new Swiper('.swiper-diputados', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        // Inicializar listeners
        inicializarFiltros();
        inicializarBuscador();

    } catch (error) {
        console.error("Error cargando los diputados:", error);
    }
}

// Iniciar carga
cargarDatosDiputados();


// 3. Normalizador de Texto
function normalizarTexto(texto = "") {
    if (!texto) return "";
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}


// 4. Lógica para Aplicar Filtros Combinados (Bloque + Buscador)
function aplicarFiltros() {
    const resultados = todosLosDiputados.filter((diputado) => {
        // A) Validar Filtro de Bloque
        const partidoDiputado = diputado.partido_slug || diputado.bloque;
        const coincideBloque = (filtroBloqueActual === "todos") || (partidoDiputado === filtroBloqueActual);

        // B) Validar Filtro del Buscador (Nombre o Provincia)
        const nombre = normalizarTexto(diputado.nombre);
        const provincia = normalizarTexto(diputado.provincia);
        const coincideTexto = nombre.includes(terminoBusquedaActual) || provincia.includes(terminoBusquedaActual);

        // Deben cumplirse ambas condiciones
        return coincideBloque && coincideTexto;
    });

    // Renderizar HTML filtrado
    renderizarDiputados(resultados);

    // Actualizar Swiper y volver al primer slide
    if (swiperInstance) {
        swiperInstance.update();
        swiperInstance.slideTo(0);
    }
}


// 5. Escuchador para los Botones de Filtro por Bloque
function inicializarFiltros() {
    const botonesFiltro = document.querySelectorAll(".filtro-bloques__btn");
    if (botonesFiltro.length === 0) return;

    botonesFiltro.forEach((boton) => {
        boton.addEventListener("click", () => {
            botonesFiltro.forEach((b) => b.classList.remove("filtro-bloques__btn--activo"));
            boton.classList.add("filtro-bloques__btn--activo");

            // Actualizar estado del bloque seleccionado y aplicar filtros
            filtroBloqueActual = boton.getAttribute("data-partido");
            aplicarFiltros();
        });
    });
}


// 6. Escuchador para el Input Buscador
function inicializarBuscador() {
    const inputBuscador = document.getElementById("buscador");
    if (!inputBuscador) return;

    inputBuscador.addEventListener("input", (e) => {
        // Actualizar estado de la búsqueda y aplicar filtros
        terminoBusquedaActual = normalizarTexto(e.target.value);
        aplicarFiltros();
    });
}


// 7. Combinar JSON Local + API
function fusionarDiputados(locales, api) {
    return locales.map(local => {
        const coincidenciaApi = api.find(itemApi => {
            const nombreCompletoApi = normalizarTexto(`${itemApi.nombre} ${itemApi.apellido}`);
            const nombreLocal = normalizarTexto(local.nombre);
            
            return itemApi.id === local.id || nombreCompletoApi === nombreLocal;
        });

        if (!coincidenciaApi) return local;

        const fotoFinal = coincidenciaApi.foto && coincidenciaApi.foto.startsWith("http")
            ? coincidenciaApi.foto
            : `assets/img/diputados/${local.foto}`;

        return {
            ...local,
            ...coincidenciaApi,
            nombre: local.nombre,
            bloque: coincidenciaApi.bloque || local.partido,
            foto: fotoFinal,
            provincia: local.provincia || coincidenciaApi.provincia
        };
    });
}


// 8. Renderizado del DOM
function renderizarDiputados(diputados) {
    const container = document.querySelector(".diputados"); 
    container.innerHTML = "";

    if (diputados.length === 0) {
        container.innerHTML = `
            <div class="swiper-slide sin-resultados" style="text-align: center; width: 100%; padding: 20px;">
                <p>No se encontraron diputados que coincidan con la búsqueda.</p>
            </div>
        `;
        return;
    }

    diputados.forEach((diputado, index) => {
        const card = document.createElement("article");
        
        card.classList.add("diputado", "swiper-slide");
        card.setAttribute("data-partido", diputado.partido_slug || diputado.bloque);

        const imgSrc = diputado.foto.startsWith("http") 
            ? diputado.foto 
            : `assets/img/diputados/${diputado.foto}`;

        card.innerHTML = `
        <div class="diputado__header">
            <figure class="diputado__figure">
                <img class="diputado__img" src="${imgSrc}" alt="Fotografía de ${diputado.nombre}">
            </figure>
            <div class="diputado__info">
                <h3 class="diputado__nombre">${diputado.nombre}</h3>
                ${diputado.bloque ? `<small class="diputado__bloque">${diputado.bloque}</small>` : ''}
                <span class="diputado__voto diputado__voto--${diputado.voto_tipo}">${diputado.voto}</span>
            </div>
        </div>

        <div class="diputado__details">
            <h5 class="diputado__subtitle">Provincia</h5>
            <span class="diputado__provincia">${diputado.provincia}</span>
        </div>

        <div class="diputado__footer">
            ${diputado.perfil_url ? `<a class="diputado__link" href="${diputado.perfil_url}" target="_blank">Ver perfil completo</a>` : ''}
        </div>
        `;

        container.appendChild(card);
    });
}