function detailsPage() {
  const content = document.querySelector(".details_content");

  // Get type and id from URL
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const type = pathParts[1]; // "anime", "manga", "movie", "tv"
  const id = pathParts[2];

  console.log(`Loading ${type} with id: ${id}`);

  if (!type || !id) {
    content.innerHTML = '<div class="details_error">Invalid content URL</div>';
    return;
  }

  async function fetchDetails() {
    try {
      const response = await fetch(`/api/${type}/${id}`);

      if (!response.ok) {
        throw new Error("Failed to load content");
      }

      const data = await response.json();
      renderDetails(data, type);
    } catch (error) {
      console.error("Error fetching details:", error);
      content.innerHTML =
        '<div class="details_error">Error loading content details</div>';
    }
  }

  function renderDetails(data, type) {
    let html = "";

    if (type === "anime" || type === "manga") {
      html = renderJikanContent(data, type);
    } else if (type === "movie" || type === "tv") {
      html = renderTMDBContent(data, type);
    }

    content.innerHTML = html;
  }

  function renderJikanContent(data, type) {
    const poster =
      data.images?.jpg?.large_image_url || data.images?.jpg?.image_url;
    const title = data.title;
    const english =
      type === "anime" ? data.title_english : data.title_english || "";
    const status = data.status;
    const score = data.score || "N/A";
    const rank = data.rank || "N/A";
    const popularity = data.popularity || "N/A";
    const favorites = data.favorites?.toLocaleString() || "0";
    const genres =
      data.genres
        ?.map((g) => `<span class="genre_tag">${g.name}</span>`)
        .join("") || "";
    const synopsis = data.synopsis || "No synopsis available.";
    const background = data.background || "";

    let extraInfo = "";
    if (type === "anime") {
      extraInfo = `
        <div class="meta_item">Episodes: ${data.episodes || "Unknown"}</div>
        <div class="meta_item">Duration: ${data.duration || "Unknown"}</div>
        <div class="meta_item">Source: ${data.source || "Unknown"}</div>
        <div class="meta_item">Aired: ${data.aired?.string || "Unknown"}</div>
      `;
    } else {
      extraInfo = `
        <div class="meta_item">Chapters: ${data.chapters || "Unknown"}</div>
        <div class="meta_item">Volumes: ${data.volumes || "Unknown"}</div>
        <div class="meta_item">Published: ${data.published?.string || "Unknown"}</div>
      `;
    }

    return `
      <div class="details_hero">
        <div class="details_poster">
          <img src="${poster}" alt="${title}">
        </div>
        <div class="details_info">
          <h1 class="details_title">${title}</h1>
          ${english ? `<p style="color:var(--text-muted); margin-bottom:16px;">${english}</p>` : ""}

          <div class="details_meta">
            <div class="meta_item highlight">${status}</div>
            ${extraInfo}
          </div>

          <div class="details_stats">
            <div class="stat">
              <div class="stat_value">${score}</div>
              <div class="stat_label">Score</div>
            </div>
            <div class="stat">
              <div class="stat_value">#${rank}</div>
              <div class="stat_label">Rank</div>
            </div>
            <div class="stat">
              <div class="stat_value">#${popularity}</div>
              <div class="stat_label">Popularity</div>
            </div>
            <div class="stat">
              <div class="stat_value">${favorites}</div>
              <div class="stat-label">Favorites</div>
            </div>
          </div>

          <div class="details_genres">${genres}</div>
        </div>
      </div>

      <div class="details_description">
        <h3 class="description_title">Synopsis</h3>
        <p class="description_text">${synopsis}</p>
        ${background ? `<p class="description_text" style="margin-top:16px;"><strong>Background:</strong><br>${background}</p>` : ""}
      </div>
    `;
  }

  function renderTMDBContent(data, type) {
    const poster = `https://image.tmdb.org/t/p/original${data.poster_path}`;
    const title = data.title || data.name;
    const tagline = data.tagline || "";
    const overview = data.overview || "No overview available.";
    const rating = data.vote_average?.toFixed(1) || "N/A";
    const votes = data.vote_count?.toLocaleString() || "0";
    const releaseDate = data.release_date || data.first_air_date || "Unknown";
    const status = data.status || "Unknown";
    const genres =
      data.genres
        ?.map((g) => `<span class="genre_tag">${g.name}</span>`)
        .join("") || "";

    let extraInfo = "";
    if (type === "movie") {
      extraInfo = `
        <div class="meta_item">Runtime: ${data.runtime ? `${data.runtime} min` : "Unknown"}</div>
        <div class="meta_item">Lang: ${data.original_language?.toUpperCase()}</div>
        <div class="meta_item">Budget: $${data.budget?.toLocaleString() || "Unknown"}</div>
      `;
    } else {
      extraInfo = `
        <div class="meta_item">Episodes: ${data.number_of_episodes || "Unknown"}</div>
        <div class="meta_item">Seasons: ${data.number_of_seasons || "Unknown"}</div>
        <div class="meta_item">Lang: ${data.original_language?.toUpperCase()}</div>
      `;
    }

    return `
      <div class="details_hero">
        <div class="details_poster">
          <img src="${poster}" alt="${title}">
        </div>
        <div class="details_info">
          <h1 class="details_title">${title}</h1>
          ${tagline ? `<p style="color:var(--text-muted); font-style:italic; margin-bottom:16px;">${tagline}</p>` : ""}

          <div class="details_meta">
            <div class="meta_item highlight">${status}</div>
            <div class="meta_item">Released: ${releaseDate}</div>
            ${extraInfo}
          </div>

          <div class="details_stats">
            <div class="stat">
              <div class="stat_value">${rating}</div>
              <div class="stat_label">Rating</div>
            </div>
            <div class="stat">
              <div class="stat_value">${votes}</div>
              <div class="stat-label">Votes</div>
            </div>
          </div>

          <div class="details_genres">${genres}</div>
        </div>
      </div>

      <div class="details_description">
        <h3 class="description_title">Overview</h3>
        <p class="description_text">${overview}</p>
      </div>
    `;
  }

  // Initialize
  fetchDetails();
}
detailsPage();
