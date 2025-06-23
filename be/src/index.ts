import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
app.use(express.json());

import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/chat", async (req, res) => {
  const prompt = req.body.prompt;
  const responce = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a YouTube video summarizer. Your task is to watch and understand the video provided via a YouTube link and generate a clear, concise, and informative summary of the content. The summary should capture the key points, main ideas, and any important insights presented in the video.",
      },
      {
        role: "user",
        content: req.body.prompt,
      },
    ],
    model:"llama-3.1-8b-instant"

  });
  const answer = responce.choices[0]?.message?.content || ""
  console.log(answer)
});
