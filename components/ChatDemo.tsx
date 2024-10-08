import { useState, useEffect } from 'react'

export default function ChatDemo() {
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    const demoMessages = [
      '你好！我能为你做些什么？',
      '我想了解更多关于人工智能的信息。',
      '人工智能是计算机科学的一个分支，致力于创造能够模仿人类智能的系统。它涉及机器学习、深度学习、自然语言处理等多个领域。',
      '这听起来很有趣！AI 能做些什么具体的事情呢？',
      'AI 有很多应用，比如语音助手、图像识别、自动驾驶、医疗诊断等。它正在改变我们生活和工作的方式。'
    ]

    const timer = setInterval(() => {
      setMessages(prev => {
        if (prev.length < demoMessages.length) {
          return [...prev, demoMessages[prev.length]]
        }
        return prev
      })
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">体验 AI 对话</h2>
        <div className="max-w-2xl mx-auto bg-gray-100 rounded-lg p-4 h-80 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${index % 2 === 0 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                {message}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}