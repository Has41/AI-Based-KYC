import { ArrowRight, ScanFace, IdCard, Server } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <ScanFace className="size-16 mx-auto text-purple-600" />,
      title: "Face Match",
      desc: "AI-powered face recognition for accurate identity verification."
    },
    {
      icon: <IdCard className="size-16 mx-auto text-purple-600" />,
      title: "Document Scan",
      desc: "Extract and validate information from ID documents instantly."
    },
    {
      icon: <Server className="size-16 mx-auto text-purple-600" />,
      title: "Real-Time API",
      desc: "Connect with your backend using our secure API endpoints."
    }
  ];

  return (
    <section className="w-full py-20 bg-gray-50 px-6" id="features">
      <h3 className="text-3xl font-bold text-center mb-10 text-purple-600">Core Features</h3>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="bg-white shadow-md p-6 rounded-2xl text-center border border-gray-100 flex gap-y-5 flex-col items-center">
            {f.icon}
            <h4 className="text-xl font-semibold text-purple-600 mt-4 mb-2">{f.title}</h4>
            <p className="text-gray-600 mb-4">{f.desc}</p>
            <button className="mt-auto flex items-center gap-2 cursor-pointer text-purple-600 font-semibold hover:text-purple-800">
              Know More <ArrowRight />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
