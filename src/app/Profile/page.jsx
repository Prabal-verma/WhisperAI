// pages/profile.js
export default function Profile() {
    return (
      <div className="min-h-screen bg-blue-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-blue-600 text-center">Your Profile</h2>
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-gray-700">Name</h3>
              <p className="text-gray-600">John Doe</p>
            </div>
            <div>
              <h3 className="text-gray-700">Email</h3>
              <p className="text-gray-600">johndoe@example.com</p>
            </div>
            <div>
              <h3 className="text-gray-700">Mood History</h3>
              <p className="text-gray-600">Feeling stressed lately</p>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Edit Profile</button>
          </div>
        </div>
      </div>
    );
  }
  