import { useEffect, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

interface DashboardData {
  totalSessions: number;
  successRate: number;
  avgCaptureTime: number;
  dailySuccess: number[];
  dailyCaptures: number[];
  stepCompletion: { fingerprint: number; face: number; fullKYC: number };
  dailyDropOffs: number[];
}

const fetchAnalytics = async (): Promise<DashboardData> => {
  return {
    totalSessions: 120,
    successRate: 92,
    avgCaptureTime: 3.4,
    dailySuccess: [4, 8, 9, 12, 7, 14, 10],
    dailyCaptures: [5, 9, 10, 11, 8, 15, 12],
    stepCompletion: { fingerprint: 90, face: 80, fullKYC: 70 },
    dailyDropOffs: [1, 2, 1, 3, 2, 1, 0]
  };
};

const ReportDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetchAnalytics().then(setData);
  }, []);

  if (!data) return <div className="p-4 text-center">Loading...</div>;

  const successChart = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Success Rate %",
        data: data.dailySuccess,
        borderColor: "#7c3aed",
        backgroundColor: "rgba(124, 58, 237, 0.2)",
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  const captureChart = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Captures",
        data: data.dailyCaptures,
        backgroundColor: "#6366f1"
      }
    ]
  };

  const stepCompletionChart = {
    labels: ["Fingerprint", "Face", "Full KYC"],
    datasets: [
      {
        label: "Completion %",
        data: [data.stepCompletion.fingerprint, data.stepCompletion.face, data.stepCompletion.fullKYC],
        backgroundColor: ["#7c3aed", "#9333ea", "#a78bfa"]
      }
    ]
  };

  const dropOffChart = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Drop-offs",
        data: data.dailyDropOffs,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="w-full max-w-md mx-auto font-poppins p-4 bg-gray-100 min-h-screen space-y-6">
      <h1 className="text-xl font-bold text-purple-600 mb-4 text-center">Capture Analytics</h1>

      <div className="grid gap-3">
        <div className="p-4 bg-white rounded-xl shadow-sm text-center">
          <p className="text-sm font-bold">Total Sessions</p>
          <p className="text-2xl font-bold text-purple-600">{data.totalSessions}</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm text-center">
          <p className="text-sm font-bold">Success Rate</p>
          <p className="text-2xl font-bold text-purple-600">{data.successRate}%</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm text-center">
          <p className="text-sm font-bold">Avg Capture Time</p>
          <p className="text-2xl font-bold text-purple-600">{data.avgCaptureTime}s</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Weekly Success Rate</h2>
        <Line data={successChart} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Daily Captures</h2>
        <Bar data={captureChart} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Step Completion</h2>
        <Doughnut data={stepCompletionChart} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Daily Drop-offs</h2>
        <Line data={dropOffChart} />
      </div>
    </div>
  );
};

export default ReportDashboard;
