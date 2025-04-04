import { streamText } from "ai"
import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import dotenv from "dotenv"

dotenv.config()

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});

const medium = openrouter("deepseek/deepseek-chat-v3-0324:free")

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = streamText({
    model: medium,
    messages,
  })
  return result.toDataStreamResponse()
}

