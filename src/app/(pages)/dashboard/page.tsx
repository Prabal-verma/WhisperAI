"use client";
import Sidebar from '../../../components/ui/Sidebar';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the charts
const engagementData = [
  { name: 'Day 1', interactions: 40 },
  { name: 'Day 2', interactions: 30 },
  { name: 'Day 3', interactions: 20 },
  { name: 'Day 4', interactions: 27 },
  { name: 'Day 5', interactions: 18 },
];

const sentimentData = [
  { name: 'Positive', value: 400 },
  { name: 'Neutral', value: 300 },
  { name: 'Negative', value: 300 },
];

const accuracyData = [
  { name: 'Emotional Response', accuracy: 85 },
  { name: 'Question Understanding', accuracy: 78 },
  { name: 'Advice Precision', accuracy: 82 },
];

const retentionData = [
  { name: 'Week 1', retention: 65 },
  { name: 'Week 2', retention: 60 },
  { name: 'Week 3', retention: 55 },
  { name: 'Week 4', retention: 50 },
];

// Chart Components for easier filtering
const chartComponents = [
  {
    name: 'User Engagement',
    chart: (
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={engagementData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="interactions" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    ),
  },
  {
    name: 'Sentiment Analysis',
    chart: (
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={sentimentData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
            {sentimentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={['#00C49F', '#FFBB28', '#FF8042'][index % 3]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    ),
  },
  {
    name: 'Chatbot Accuracy',
    chart: (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={accuracyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="accuracy" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    ),
  },
  {
    name: 'User Retention',
    chart: (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={retentionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="retention" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    ),
  },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: session } = useSession();
  const [filteredCharts, setFilteredCharts] = useState(chartComponents);

  useEffect(() => {
    // Filter the charts based on the search term, making matches appear first
    const filtered = chartComponents.filter(chart =>
      chart.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharts(filtered);
  }, [searchTerm]);

  return (
    <div className="flex flex-col lg:flex-row mt-[70px]">
      <Sidebar />
      <div className="lg:ml-64 w-full h-screen p-5 bg-gradient-to-r from-gray-100 to-gray-200">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
                Welcome, {session?.user?.name}
               
              </h1>
              <span className="text-lg text-gray-600 ml-2 inline-block">Overview</span> {/* Added Overview here */}
              <div className="w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 w-full sm:w-auto rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </header>


        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Render filtered charts */}
          {filteredCharts.map((chartComponent, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                {chartComponent.name}
              </h2>
              {chartComponent.chart}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}










// "use client"
// import Sidebar from '../../../components/ui/Sidebar';
// import { useState } from 'react';
// import { auth} from "../../../auth"



// export default async function Dashboard() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const session = await auth();

//   return (
//     <div className="flex mt-[70px]">
//       <Sidebar />
//       <div className="ml-64 w-full h-screen p-10 bg-gray-50">
//         <header className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Welcome, {session.user.name}</h1>
//           <div>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </header>

//         <section className="grid grid-cols-3 gap-6">
//           {/* Example Dashboard Cards */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Posts</h2>
//             <p className="text-2xl font-bold text-blue-600">{12}</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">Followers</h2>
//             <p className="text-2xl font-bold text-blue-600">{1}</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">Following</h2>
//             <p className="text-2xl font-bold text-blue-600">{4}</p>
//           </div>
//         </section>

//         <section className="mt-10">
//           <h2 className="text-2xl font-bold text-gray-700 mb-6">Recent Activity</h2>
//           <ul className="space-y-4">
//             {/* {userData.recentActivity.map((activity, index) => (
//               <li key={index} className="bg-white p-4 rounded-lg shadow-md">
//                 {activity}
//                 Playing
//               </li>
//             ))} */}
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// }