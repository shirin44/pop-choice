document.addEventListener("DOMContentLoaded", () => {
    const questionView = document.getElementById("question-view");
    const outputView = document.getElementById("output-view");
    const submitButton = document.getElementById("submit-button");
    const restartButton = document.getElementById("restart-button");
    const movieTitle = document.getElementById("movie-title");
    const moviePoster = document.getElementById("movie-poster");
    const movieExplanation = document.getElementById("movie-explanation");
    const movieDetails = document.getElementById("movie-details");
  
    let selectedStoryline = "";
    let selectedTone = "";
    let selectedReleaseType = "";
    let selectedGenre = "";
  
    const addHighlighting = (className, setVariable) => {
      const buttons = document.querySelectorAll(className);
  
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          buttons.forEach((btn) => btn.classList.remove("bg-red-500", "text-white"));
          button.classList.add("bg-red-500", "text-white");
          setVariable(button.textContent || button.dataset.genre);
        });
      });
    };
  
    addHighlighting(".storyline-option", (value) => (selectedStoryline = value));
    addHighlighting(".tone-option", (value) => (selectedTone = value));
    addHighlighting(".release-option", (value) => (selectedReleaseType = value));
    addHighlighting(".genre-option", (value) => (selectedGenre = value));
  
    submitButton.addEventListener("click", async () => {
      const favoriteMovie = document.getElementById("favorite-movie").value.trim();
  
      if (!favoriteMovie || !selectedStoryline || !selectedTone || !selectedReleaseType || !selectedGenre) {
        alert("Please complete all fields!");
        return;
      }
  
      try {
        const response = await fetch("/api/recommendation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            favoriteMovie,
            storyline: selectedStoryline,
            tone: selectedTone,
            releaseType: selectedReleaseType,
            language: "en",
            genre: selectedGenre,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          movieTitle.textContent = data.title;
          moviePoster.src = `https://image.tmdb.org/t/p/w500${data.posterPath}`;
          movieExplanation.textContent = data.explanation;
          movieDetails.innerHTML = `
            <p><strong>Release Date:</strong> ${data.releaseDate}</p>
            <p><strong>Genre:</strong> ${data.genre}</p>
            <p><strong>Overview:</strong> ${data.overview}</p>
          `;
          questionView.classList.add("hidden");
          outputView.classList.remove("hidden");
        } else {
          movieTitle.textContent = "Error!";
          movieExplanation.textContent = data.error || "Something went wrong.";
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  
    restartButton.addEventListener("click", () => {
      questionView.classList.remove("hidden");
      outputView.classList.add("hidden");
      document.querySelectorAll(".storyline-option, .tone-option, .release-option, .genre-option").forEach((btn) => {
        btn.classList.remove("bg-red-500", "text-white");
      });
      document.getElementById("favorite-movie").value = "";
      selectedStoryline = "";
      selectedTone = "";
      selectedReleaseType = "";
      selectedGenre = "";
    });
  });
  