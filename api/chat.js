export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: "Message requis" });

    const provider = process.env.AI_PROVIDER || "openai";

    if (provider === "openai") {
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Tu es l'assistant officiel de NucleoMind. Réponds en français, clair et concis."
            },
            { role: "user", content: message }
          ],
          temperature: 0.4
        })
      });
      const data = await r.json();
      const reply = data?.choices?.[0]?.message?.content || "Aucune réponse.";
      return res.status(200).json({ reply });
    }

    if (provider === "gemini") {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Tu es l'assistant de NucleoMind. Réponds en français: ${message}` }] }]
        })
      });
      const data = await r.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Aucune réponse.";
      return res.status(200).json({ reply });
    }

    return res.status(400).json({ error: "Provider inconnu" });
  } catch (err) {
    return res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
}