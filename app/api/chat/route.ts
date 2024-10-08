import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1',
  timeout: 120000, // 增加到120秒
});

const MAX_RETRIES = 3;

export async function POST(request: Request) {
  const { messages } = await request.json();

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await client.chat.completions.create({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 4000, // 增加 max_tokens 的值
        stream: true, // 启用流式响应
      });

      // 创建一个 TransformStream 来处理流式响应
      const stream = new TransformStream();
      const writer = stream.writable.getWriter();
      const encoder = new TextEncoder();

      // 处理流式响应
      (async () => {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || '';
            await writer.write(encoder.encode(content));
          }
        } catch (error) {
          console.error('Streaming error:', error);
        } finally {
          writer.close();
        }
      })();

      return new Response(stream.readable, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    } catch (error: any) {
      console.error(`Attempt ${attempt + 1} failed:`, error);
      if (attempt === MAX_RETRIES - 1) {
        console.error('All retries failed');
        return NextResponse.json({ error: 'Failed to get response after multiple attempts' }, { status: 500 });
      }
      // 等待一段时间后重试
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
}