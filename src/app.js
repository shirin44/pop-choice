import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// TMDB and AI configurations
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Search for movies by title using TMDB /search method
async function searchMoviesByTitle(title) {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movie by title:", error.message);
    return [];
  }
}

// Generate AI recommendation
async function generateMovieRecommendation(favoriteMovie, storyline, tone, releaseType) {
  try {
    const prompt = `
      The user has provided the following movie preferences:
      - Favorite Movie: "${favoriteMovie}"
      - Preferred Storyline: "${storyline}"
      - Desired Tone: "${tone}"
      - Release Type (e.g., new last 5 years, older): "${releaseType}"

      Based on these preferences, recommend one movie title that aligns most closely. Additionally, provide a brief explanation of why this movie is a good fit for the user's preferences. Format the response as:
      "Title: <movie title>\nReason: <why this movie matches the preferences>."
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const aiResult = await model.generateContent(prompt);
    const resultLines = aiResult.response.text().split("\n");
    const suggestedTitle = resultLines.find(line => line.startsWith("Title:"))?.replace("Title: ", "").trim() || null;
    const reason = resultLines.find(line => line.startsWith("Reason:"))?.replace("Reason: ", "").trim() || "Reason not provided.";

    console.log("AI Suggested Title:", suggestedTitle);
    console.log("Reason for Recommendation:", reason);

    return { suggestedTitle, reason };
  } catch (error) {
    console.error("Error generating AI recommendation:", error.message);
    return { suggestedTitle: null, reason: "Unable to generate a recommendation." };
  }
}

// Endpoint to handle movie recommendations
app.post("/api/recommendation", async (req, res) => {
  const { favoriteMovie, storyline, tone, releaseType } = req.body;

  if (!favoriteMovie || !storyline || !tone || !releaseType) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Generate a recommendation using AI
    const { suggestedTitle, reason } = await generateMovieRecommendation(
      favoriteMovie,
      storyline,
      tone,
      releaseType
    );

    if (!suggestedTitle) {
      return res.status(500).json({ error: "AI could not generate a recommendation." });
    }

    // Search for the movie in TMDB using the /search method
    const movies = await searchMoviesByTitle(suggestedTitle);

    if (movies.length === 0) {
      return res.status(404).json({ error: `No movie found for the suggested title: "${suggestedTitle}".` });
    }

    // Respond with the top result
    const movie = movies[0];
    res.json({
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      genre: movie.genre_ids,
      overview: movie.overview,
      explanation: reason,
    });
  } catch (error) {
    console.error("Error handling recommendation request:", error.message);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
