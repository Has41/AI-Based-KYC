import { useState } from "react";
import { FaReact, FaDatabase, FaServer, FaCode, FaNode } from "react-icons/fa";

const techIcons = {
  React: <FaReact className="w-8 h-8 text-blue-500" />,
  TypeScript: <FaCode className="w-8 h-8 text-blue-600" />,
  Vite: <FaCode className="w-8 h-8 text-purple-500" />,
  "Tailwind CSS": <FaCode className="w-8 h-8 text-teal-500" />,
  "Go (Golang)": <FaCode className="w-8 h-8 text-blue-700" />,
  "Gin/Fiber": <FaCode className="w-8 h-8 text-purple-600" />,
  "REST API": <FaCode className="w-8 h-8 text-green-600" />,
  Node: <FaNode className="w-8 h-8 text-green-500" />,
  "Custom Face Match Service": <FaServer className="w-8 h-8 text-purple-400" />,
  "Verification Pipeline": <FaServer className="w-8 h-8 text-purple-500" />,
  PostgreSQL: <FaDatabase className="w-8 h-8 text-blue-700" />,
  Redis: <FaDatabase className="w-8 h-8 text-red-500" />
};

const TechStack = () => {
  const tabs = [
    { cat: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
    { cat: "Backend", items: ["Go (Golang)", "Gin/Fiber", "REST API", "Node"] },
    { cat: "Middleware", items: ["Custom Face Match Service", "Verification Pipeline"] },
    { cat: "Database", items: ["PostgreSQL", "Redis"] }
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="w-full py-24 bg-white px-6" id="tech">
      <h3 className="text-4xl font-bold text-center mb-12 text-purple-600">Tools & Technologies Used</h3>
      <div className="flex lg:flex-row flex-col justify-center mb-10 gap-4">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-6 py-3 rounded-lg font-medium text-lg ${
              activeTab === i ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-purple-100 hover:text-purple-600"
            }`}
          >
            {t.cat}
          </button>
        ))}
      </div>

      {/* Table-like Tiles in 2 columns */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 border border-gray-300 text-lg">
        {tabs[activeTab].items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between p-6 border-b border-gray-300 ${idx % 2 === 1 ? "border-l border-gray-300" : ""}`}
          >
            <span className="text-gray-800 font-medium">{item}</span>
            <span>{techIcons[item as keyof typeof techIcons]}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
