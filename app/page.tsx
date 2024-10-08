import Image from "next/image";
import AIChatComponent from "../components/AIChatComponent";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="p-4 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <Image
            src="/logo.svg" // 请确保添加您的logo
            alt="AI Chat Logo"
            width={120}
            height={40}
            priority
          />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
            欢迎使用我们的AI聊天助手
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            体验智能对话的未来，让AI成为您的得力助手
          </p>
          <AIChatComponent />
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 text-center text-gray-600 dark:text-gray-300">
          © 2024 AI Chat Assistant. 保留所有权利。
        </div>
      </footer>
    </div>
  );
}
