import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express();
app.use(express.json());

import Groq from 'groq-sdk'
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

