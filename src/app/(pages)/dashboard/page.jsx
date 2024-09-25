"use client"
import Sidebar from '../../../components/ui/Sidebar';
import { useState } from 'react';
import { auth} from "../../../auth"



export default async function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const session = await auth();

  return (
    <div className="flex mt-[70px]">
      <Sidebar />
      <div className="ml-64 w-full h-screen p-10 bg-gray-50">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {session.user.name}</h1>
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </header>

        <section className="grid grid-cols-3 gap-6">
          {/* Example Dashboard Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Posts</h2>
            <p className="text-2xl font-bold text-blue-600">{12}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Followers</h2>
            <p className="text-2xl font-bold text-blue-600">{1}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Following</h2>
            <p className="text-2xl font-bold text-blue-600">{4}</p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Recent Activity</h2>
          <ul className="space-y-4">
            {/* {userData.recentActivity.map((activity, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                {activity}
                Playing
              </li>
            ))} */}
          </ul>
        </section>
      </div>
    </div>
  );
}

