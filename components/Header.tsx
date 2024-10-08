import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-500">
          AI聊天
        </Link>
        <div>
          <Link href="/about" className="text-gray-600 hover:text-gray-800 mx-2">
            关于
          </Link>
          <Link href="/login" className="text-gray-600 hover:text-gray-800 mx-2">
            登录
          </Link>
        </div>
      </nav>
    </header>
  )
}