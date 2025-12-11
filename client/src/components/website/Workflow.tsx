import { Upload, UserCheck, Server, CheckCircle, MoveRight } from "lucide-react";

const Workflow = () => {
  const steps = [
    {
      icon: <Upload className="w-10 h-10" />,
      step: "First Step",
      title: "Upload Document",
      desc: "Submit the required ID documents for verification."
    },
    {
      icon: <UserCheck className="w-10 h-10" />,
      step: "Second Step",
      title: "Face Verification",
      desc: "AI-powered face match to verify identity."
    },
    {
      icon: <Server className="w-10 h-10" />,
      step: "Third Step",
      title: "Server Validation",
      desc: "Backend validation to ensure authenticity."
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      step: "Fourth Step",
      title: "Result Returned",
      desc: "Receive verification results instantly."
    }
  ];

  return (
    <section className="w-full py-24 px-6" id="workflow">
      <h3 className="text-4xl font-bold text-center mb-14 text-purple-600">How It Works</h3>
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-8xl mx-auto relative">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col gap-y-4 cursor-pointer items-center text-center p-6 transition hover:scale-105 group relative">
            <div className="bg-white p-6 rounded-full flex items-center justify-center mb-4 shadow-md transition group-hover:bg-purple-600 group-hover:text-white">
              {s.icon}
            </div>
            <span className="text-gray-500 font-semibold mb-1 transition group-hover:text-purple-600">{s.step}</span>
            <h4 className="text-2xl font-bold mb-2">{s.title}</h4>
            <p className="text-gray-600 text-base">{s.desc}</p>

            {/* Arrow to next step */}
            {i < steps.length - 1 && (
              <MoveRight className="hidden md:block absolute right-[-30px] top-1/2 transform -translate-y-1/2 w-8 h-8 text-gray-400 group-hover:text-purple-600" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Workflow;
