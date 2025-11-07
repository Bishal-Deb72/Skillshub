export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST requests allowed" });
    }

    const { type, question, context } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const prompt = `
You are an AI learning tutor.
Type: ${type || "general"}
Context: ${context || "none"}
Question: ${question}
Please reply clearly and briefly.
`;

    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    const reply = data[0]?.generated_text || "Sorry, no response generated.";
    res.status(200).json({ reply });
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
