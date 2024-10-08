import { IconType } from 'react-icons'
import { FaBrain, FaRobot, FaLock } from 'react-icons/fa'

type Feature = {
  icon: IconType
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: FaBrain,
    title: '智能对话',
    description: '先进的自然语言处理技术，提供流畅、自然的对话体验。'
  },
  {
    icon: FaRobot,
    title: '多领域知识',
    description: '涵盖广泛的知识领域，满足各种学习和咨询需求。'
  },
  {
    icon: FaLock,
    title: '安全可靠',
    description: '严格的隐私保护措施，确保您的对话安全无忧。'
  }
]

export default function FeatureList() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">为什么选择我们</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <feature.icon className="mx-auto text-5xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}