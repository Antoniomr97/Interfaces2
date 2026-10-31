// Obtenemos los elementos

// Para la página principal de juegos

const gamesGrid = document.querySelector("#gamesGrid");

// Para el toogle de cambio entre luz y oscuridad

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeIconS = document.getElementById("themeIconS");

// Investigando como se hace el cambio de tema, he encontrado que se puede comprobar el que está usando el cliente por su localStorage

const usedTheme = localStorage.getItem("theme");

// Le añadimos al html la clase theme-light por si tenemos que cambiar de modo

if (usedTheme === "light") {
  document.documentElement.classList.add("theme-light");
}

// Actualizamos la imagen según el tema actual

if (themeIcon) {
  if (document.documentElement.classList.contains("theme-light")) {
    themeIcon.src = "assets/images/icons/moon.svg";
  } else {
    themeIcon.src = "assets/images/icons/sun.svg";
  }
}

if (themeIconS) {
  if (document.documentElement.classList.contains("theme-light")) {
    themeIconS.src = "../assets/images/icons/moon.svg";
  } else {
    themeIconS.src = "../assets/images/icons/sun.svg";
  }
}

async function loadGames() {
  try {
    const response = await fetch("../data/games.json");

    console.log("URL solicitada:", response.url);
    console.log("Estado HTTP:", response.status);

    if (!response.ok) {
      throw new Error("No se ha podido cargar el archivo JSON.");
    }

    const games = await response.json();
    console.log("Juegos recibidos:", games);

    if (!Array.isArray(games)) {
      throw new Error("El JSON debe contener una lista de juegos.");
    }

    gamesGrid.replaceChildren();

    games.forEach((game) => {
      // Creamos un articulo que será cada tarjeta

      const card = document.createElement("article");
      card.classList.add("gameCard");

      // Por el problema que ya descubrimos con la imagen en diferentes situaciones he decidido trabajar con un contenedor previo

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("gameImageContainer");

      // Añadimos la imagen con la url que obtenemos

      const image = document.createElement("img");
      image.classList.add("gameImage");
      image.src = game.image_url;
      image.alt = `Portada de ${game.name}`;
      image.loading = "lazy";

      // Ahora si añadimos la imagen al div que creamos para ella

      imageContainer.appendChild(image);

      // Creamos otro div para su contenido (disculpa tanto comentario es para poder guiarme ya que se está haciendo muy extenso el desarrollo)

      const content = document.createElement("div");
      content.classList.add("gameCardContent");

      // Aquí ponemos sus diferentes valores como Nombre y Precio

      const title = document.createElement("h2");
      title.classList.add("gameTitle");
      title.textContent = game.name;

      const price = document.createElement("p");
      price.classList.add("gamePrice");
      price.textContent = Number(game.price).toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR",
      });

      // Aquí obtenemos las plataformas y como puede tener varias vamos añadiendo las que tenga y le generamos un span para que se pongan en la misma línea.

      const platforms = document.createElement("div");
      platforms.classList.add("gamePlatforms");

      if (game.is_ps4 === 1) {
        const ps4 = document.createElement("span");
        ps4.classList.add("platformSpan");
        ps4.textContent = "PS4";
        platforms.appendChild(ps4);
      }

      if (game.is_ps5 === 1) {
        const ps5 = document.createElement("span");
        ps5.classList.add("platformSpan");
        ps5.textContent = "PS5";
        platforms.appendChild(ps5);
      }

      // Aquí ya añadimos todo al contenedor de la tarjeta.
      //Esto lo hago para ir preparandome para la lógica del proyecto final.

      content.append(title, price, platforms);
      card.append(imageContainer, content);
      gamesGrid.appendChild(card);
    });
  } catch (error) {
    /* Aquí nos cubrimos de los errores, lo cual me viene bien ya que al principio no conseguía que cargaran y solo era por el navegador, que para que funcionara tenía que ponerlo en live server*/
    console.error("Error al cargar los juegos:", error);
    gamesGrid.textContent = "No se han podido cargar los juegos.";
  }
}

if (gamesGrid) {
  loadGames();
}

// Creamos función para añadir el cambio a modo claro

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    // Cuando se le clicke se cambia de luz a oscuridad añadiendo y quitando la clase

    document.documentElement.classList.toggle("theme-light");

    // Comprobamos el tema que tiene

    const isLight = document.documentElement.classList.contains("theme-light");

    // Guardamos el tema seleccionado en localStorage

    if (isLight) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }

    // Cambiamos la imagen del botón según el tema

    if (themeIcon) {
      if (isLight) {
        themeIcon.src = "assets/images/icons/moon.svg";
      } else {
        themeIcon.src = "assets/images/icons/sun.svg";
      }
    }

    // Actualizamos la descripción accesible del botón
    if (isLight) {
      themeToggle.setAttribute("aria-label", "Cambiar a modo oscuro");
    } else {
      themeToggle.setAttribute("aria-label", "Cambiar a modo claro");
    }

    if (themeIconS) {
      if (isLight) {
        themeIconS.src = "../assets/images/icons/moon.svg";
      } else {
        themeIconS.src = "../assets/images/icons/sun.svg";
      }
    }
  });
}
