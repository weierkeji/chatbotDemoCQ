import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1',
  timeout: 60000, // 增加超时时间到 60 秒
});

export async function POST(request: Request) {
  const { messages } = await request.json();

  try {
    const response = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages,
      temperature: 0.7,
      max_tokens: 500, // 减少 max_tokens 以避免可能的响应大小限制
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error: any) {
    console.error('Error calling DeepSeek API:', error);
    let errorMessage = 'An error occurred while processing your request.';
    if (error.response) {
      errorMessage = `API Error: ${error.response.status} - ${error.response.data.error}`;
    } else if (error.request) {
      errorMessage = 'No response received from the API. The request may have timed out.';
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}