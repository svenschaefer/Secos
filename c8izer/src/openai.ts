import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function openaiChat(opts: {
  system: string;
  user: string;
  temperature?: number;
}): Promise<string> {
  const response = await client.chat.completions.create({
    model: "gpt-4.1",
    temperature: opts.temperature ?? 0,
    messages: [
      { role: "system", content: opts.system },
      { role: "user", content: opts.user }
    ]
  });

  return response.choices[0].message.content ?? "";
}