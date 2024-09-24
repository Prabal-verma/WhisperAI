// pages/onboarding.js
export default function Onboarding() {
    return (
      <div className="min-h-screen bg-blue-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-blue-600 text-center">Onboarding</h2>
          <form className="mt-8 space-y-6">
            <div>
              <label className="block text-gray-700">How are you feeling today?</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none" />
            </div>
            <div>
              <label className="block text-gray-700">What’s your primary concern?</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none" />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Next</button>
          </form>
        </div>
      </div>
    );
  }
  