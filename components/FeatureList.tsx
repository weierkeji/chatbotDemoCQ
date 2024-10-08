import { IconType } from 'react-icons';
import { FaBrain, FaRobot, FaLock } from 'react-icons/fa';

type Feature = {
  icon: IconType;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: FaBrain,
    title: "智能学习",
    description: "我们的AI助手能够理解您的学习需求，提供个性化的指导。"
  },
  {
    icon: FaRobot,
    title: "24/7 可用",
    description: "随时随地，我们的AI助手都在这里为您解答疑问。"
  },
  {
    icon: FaLock,
    title: "安全可靠",
    description: "您的学习数据受到严格保护，确保隐私和安全。"
  }
];

export default function FeatureList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <feature.icon className="text-4xl mb-4 text-blue-500" />
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}