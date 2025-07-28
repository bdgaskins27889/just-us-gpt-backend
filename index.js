const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const gptResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are Just Us, a trauma-informed peer support companion." },
          { role: "user", content: userMessage }
        ]
      },
      {
        headers: {
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ reply: gptResponse.data.choices[0].message.content });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("GPT Error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
