import { MoveDown } from "lucide-react";

const Architecture = () => {
  return (
    <section className="w-full py-20 px-6 bg-white" id="architecture">
      <h3 className="text-3xl font-bold text-center mb-12 text-purple-600">Solution Architecture</h3>
      <div className="lg:max-w-6xl mx-auto flex flex-col items-center gap-12">
        {/* User */}
        <div className="flex flex-col items-center">
          <div className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md">User / Client</div>
          <div className="mt-2 text-gray-600">Submits KYC Documents</div>
          <MoveDown className="w-6 h-6 text-gray-400 mt-5" />
        </div>

        {/* Frontend */}
        <div className="flex flex-col items-center relative">
          <div className="bg-purple-200 text-purple-800 px-6 py-3 rounded-lg shadow-md">Frontend (React + TypeScript)</div>
          <MoveDown className="w-6 h-6 text-gray-400 mt-5" />
        </div>

        {/* API / Middleware */}
        <div className="flex flex-col items-center relative">
          <div className="bg-purple-200 text-purple-800 px-6 py-3 rounded-lg shadow-md">API / Middleware</div>
          <MoveDown className="w-6 h-6 text-gray-400 mt-5" />
        </div>

        {/* Backend */}
        <div className="flex flex-col items-center relative">
          <div className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md">Backend Services (Go)</div>
          <MoveDown className="w-6 h-6 text-gray-400 mt-5" />
        </div>

        {/* Database / Cache / External */}
        <div className="flex flex-col items-center">
          {/* Database / Cache / External / Logging */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-x-10">
            <div className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg text-center shadow-md">PostgreSQL</div>
            <div className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg shadow-md text-center">Redis Cache</div>
            <div className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg shadow-md text-center">External Services</div>
            <div className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg shadow-md text-center">Logging / Monitoring</div>
          </div>
          <div className="mt-10 text-gray-600">Stores & Verifies Data</div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
