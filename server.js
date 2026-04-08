require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (index.html, styles.css, app.js, img/, etc.)
app.use(express.static(path.join(__dirname)));

// ===== AI CHAT ENDPOINT =====
const SYSTEM_PROMPT = `Tu es l'assistant IA officiel de NucleoMind, le hackathon scientifique IA organisé par le Project Initiative Club à l'USTHB (Alger).

INFORMATIONS CLÉS :
- Dates : 23-25 Avril 2026 (3 jours)
- Lieu : USTHB, Alger
- Inscriptions : 9-16 Avril 2026 (toute personne qui s'inscrit est automatiquement acceptée — pas de sélection)
- Thématiques : Santé & Biomédical, Environnement & Durabilité, Industrie & Procédés, Data & Systèmes
- Profils recherchés dans les équipes : Marketeurs/euses, Développeurs/euses web/app, Designers/euses
- Contact : projectinitiativeclub@gmail.com
- Chef de projet : ALLOUCHE Mohamed Djawed (0771 59 65 90)
- Sous-chef : TAIEB Yacine (0551 66 09 54)
- Responsable relations externes : DJAMAA Manel (0542075832)

PROGRAMME :
Jour 1 (23 avril) - L'Étincelle / The Spark : Accueil (08h30), cérémonie d'ouverture (09h30), formation des équipes (11h), brainstorming intensif (14h), début dev (18h)
Jour 2 (24 avril) - L'Accélération / The Acceleration : Recap (08h), mentorat (09h), team building (12h), sprint dev (14h), nuit blanche (22h)
Jour 3 (25 avril) - Le Verdict / The Verdict : Ajustements (08h), soumission (10h), Pitch Day (11h), délibération (15h), cérémonie de clôture et remise des prix (16h30)

RÈGLES :
- Détecte la langue du message et réponds TOUJOURS dans la même langue (français ou anglais).
- Utilise des emojis occasionnellement pour rendre les réponses vivantes.
- Si on te pose une question hors sujet du hackathon, redirige poliment vers NucleoMind.
- Encourage les gens à s'inscrire via le formulaire sur le site.
- Si on demande le lieu, dis USTHB, Alger (ne mentionne PAS Cyber Espace).
- Si on demande s'il y a une sélection : non, tout le monde est automatiquement accepté.`;

// Store conversation history per session (simple in-memory, resets on server restart)
const conversations = new Map();

app.post("/api/chat", async (req, res) => {
  try {
    const { message, sessionId } = req.body || {};
    if (!message) return res.status(400).json({ error: "Message requis" });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "PASTE_YOUR_GEMINI_API_KEY_HERE") {
      return res.status(500).json({ 
        reply: "⚠️ L'assistant IA n'est pas encore configuré. Clé API Gemini manquante." 
      });
    }

    // Build conversation history
    const sid = sessionId || "default";
    if (!conversations.has(sid)) {
      conversations.set(sid, []);
    }
    const history = conversations.get(sid);
    
    // Add user message to history
    history.push({ role: "user", parts: [{ text: message }] });

    // Keep last 20 messages to avoid token overflow
    const recentHistory = history.slice(-20);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: recentHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
          topP: 0.9
        }
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API error:", data.error);
      return res.status(500).json({ 
        reply: "❌ Erreur de l'API Gemini : " + (data.error.message || "Erreur inconnue") 
      });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Je n'ai pas pu générer de réponse.";
    
    // Add bot reply to history
    history.push({ role: "model", parts: [{ text: reply }] });

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat error:", err.message);
    return res.status(500).json({ 
      reply: "❌ Erreur serveur. Veuillez réessayer." 
    });
  }
});

// Fallback: serve index.html for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  const hasKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "PASTE_YOUR_GEMINI_API_KEY_HERE";
  console.log(`
╔══════════════════════════════════════════════╗
║         🧬  NucleoMind Server  🧬           ║
╠══════════════════════════════════════════════╣
║  URL:    http://localhost:${PORT}              ║
║  AI:     Gemini 2.0 Flash                    ║
║  API Key: ${hasKey ? "✅ Configured" : "❌ MISSING — edit .env file"}          ║
╚══════════════════════════════════════════════╝
  `);
});
