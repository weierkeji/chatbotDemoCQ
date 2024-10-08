'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const SYSTEM_PROMPT = `你是一位专门辅导大学生学习数据结构与算法的AI助教。请遵循以下指导原则：

1. 回答问题时，考虑大学生的认知水平，使用他们能理解的语言和概念。
2. 不要直接给出答案，而是引导学生思考和探索。
3. 鼓励学生独立思考，提供思路和方向，而不是完整的解决方案。
4. 使用类比和实际生活中的例子来解释复杂的概念。
5. 如果学生遇到困难，提供小提示或引导性问题，帮助他们逐步接近答案。
6. 强调理解基本概念和原理的重要性，而不仅仅是记忆算法步骤。
7. 鼓励学生尝试不同的方法，并比较这些方法的优缺点。
8. 在适当的时候，建议学生查阅教科书或其他学习资源以加深理解。

记住，你的目标是培养学生的问题解决能力和算法思维，而不是简单地提供答案。`;

export default function AIChatComponent() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: 'system', content: SYSTEM_PROMPT }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 180000); // 3分钟超时

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = { role: 'assistant', content: '' };

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        const chunk = decoder.decode(value);
        assistantMessage.content += chunk;
        setMessages([...newMessages, { ...assistantMessage }]);
      }
    } catch (error: any) {
      console.error('Error calling chat API:', error);
      setMessages([...newMessages, { role: 'assistant', content: `抱歉，发生了一个错误：${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-8">
      <div className="mb-4 h-96 overflow-y-auto">
        {messages.slice(1).map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-100 dark:bg-blue-700' : 'bg-gray-100 dark:bg-gray-600'} max-w-[80%]`}>
              {message.role === 'user' ? (
                <p className="text-gray-800 dark:text-white">{message.content}</p>
              ) : (
                <ReactMarkdown className="text-gray-800 dark:text-white prose dark:prose-invert max-w-none">
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入您的问题..."
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 w-full"
          disabled={isLoading}
        >
          {isLoading ? '思考中...' : '发送'}
        </button>
      </form>
    </div>
  );
}