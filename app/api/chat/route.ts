import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1'
});

export async function POST(request: Request) {
  const { messages } = await request.json();

  try {
    const response = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages,
      temperature: 0.7, // 调整这个值可以控制回答的创造性
      max_tokens: 1000, // 限制回答的长度
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}