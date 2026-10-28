const gamesGrid = document.querySelector("#gamesGrid");

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
      // Tarjeta
      const card = document.createElement("article");
      card.classList.add("gameCard");

      // Imagen
      const image = document.createElement("img");
      image.classList.add("gameImage");
      image.src = game.image_url;
      image.alt = `Portada de ${game.name}`;
      image.loading = "lazy";

      // Contenido de la tarjeta
      const content = document.createElement("div");
      content.classList.add("gameCardContent");

      // Nombre
      const title = document.createElement("h2");
      title.classList.add("gameTitle");
      title.textContent = game.name;

      // Precio
      const price = document.createElement("p");
      price.classList.add("gamePrice");
      price.textContent = Number(game.price).toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR",
      });

      // Plataformas disponibles
      const platforms = document.createElement("div");
      platforms.classList.add("gamePlatforms");

      if (game.is_ps4 === 1) {
        const ps4 = document.createElement("span");
        ps4.classList.add("platformBadge");
        ps4.textContent = "PS4";
        platforms.appendChild(ps4);
      }

      if (game.is_ps5 === 1) {
        const ps5 = document.createElement("span");
        ps5.classList.add("platformBadge");
        ps5.textContent = "PS5";
        platforms.appendChild(ps5);
      }

      // Montar la tarjeta
      content.append(title, price, platforms);
      card.append(image, content);
      gamesGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar los juegos:", error);
    gamesGrid.textContent = "No se han podido cargar los juegos.";
  }
}

if (gamesGrid) {
  loadGames();
}
