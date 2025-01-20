
<img width="200" alt="PopChoice Icon" src="https://github.com/user-attachments/assets/23cf0617-ef24-4423-a682-9cc122da6ce1" />

# **PopChoice: AI-Powered Movie Recommendation App**

PopChoice is an AI-driven movie recommendation web application that helps users find the perfect movie based on their preferences. Whether you're in the mood for a light-hearted comedy or a suspenseful thriller, PopChoice has you covered!

---

## **Features**
- **Personalized Recommendations**: AI-powered suggestions tailored to user preferences.
- **Close-Ended Questions**: User-friendly selection of moods, tones, genres, and more to refine movie searches.
- **AI Integration**: Powered by **Google Gemini AI** for intelligent movie suggestions.
- **Dynamic UI**: An interactive, responsive interface built with **HTML**, **CSS (Tailwind)**, and **JavaScript**.
- **TMDB Integration**: Fetches movie details (title, poster, genre, overview, and release date) directly from **The Movie Database (TMDB)**.
- **Fallback Options**: Suggests alternative movies if AI-suggested titles are unavailable.

---

## **Getting Started**

### **Prerequisites**
1. **Node.js** (v16+)
2. **NPM** (Node Package Manager)
3. API Keys:
   - [TMDB API Key](https://www.themoviedb.org/settings/api)
   - [Google Gemini AI API Key](https://developers.generativeai.google.com)

---

### **Installation**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/popchoice.git
   cd popchoice
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Environment Variables**:
   Create a `.env` file in the root directory:
   ```bash
   TMDB_API_KEY=your_tmdb_api_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the Server**:
   ```bash
   npm start
   ```
   The server will run on [http://localhost:3000](http://localhost:3000).

---

### **Usage**

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Fill in your favorite movie and select your preferences:
   - **Storyline** (e.g., Inspirational, Light-Hearted, etc.)
   - **Tone** (e.g., Fun & Adventurous, Serious & Dark)
   - **Release Type** (e.g., New, Classic)
   - **Genre** (e.g., Action, Comedy, etc.)
3. Click **Let's Go** to get a personalized recommendation.
4. Review the suggested movie and its details (poster, release date, overview).
5. Click **Go Again** to refine your preferences or get a new recommendation.

---

### **API Reference**

#### **1. TMDB `/search` Endpoint**
- **URL**: `https://api.themoviedb.org/3/search/movie`
- **Parameters**:
  - `api_key`: Your TMDB API Key
  - `query`: The movie title to search for
- **Purpose**: Fetches movie details by title.

#### **2. AI Recommendation**
- **Platform**: Google Gemini AI
- **Model**: `gemini-1.5-flash`
- **Purpose**: Generates movie title suggestions based on user preferences.

---

### **Tech Stack**
- **Frontend**:
  - HTML, JavaScript, Tailwind CSS
- **Backend**:
  - Node.js, Express.js
- **APIs**:
  - Google Gemini AI
  - TMDB (The Movie Database)

---

### **Contributing**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

---

### **Acknowledgements**
- **TMDB**: For providing an extensive movie database.
- **Google Gemini AI**: For enabling intelligent movie recommendations.
- **Tailwind CSS**: For creating a sleek, responsive design.

