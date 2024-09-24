// import SignIn from "./../components/sign-in";
// import Image from "next/image";
import Navbar from "../components/Navbar"


export default function Home() {
  return (
    <>
    <div>
      {/* hello
      <SignIn/> */}
      <div className="min-h-screen bg-blue-50 flex flex-col justify-between">
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6">Your Personal Mental Health Assistant</h1>
          <p className="text-xl mb-8">
            Providing support, guidance, and understanding whenever you need it.
          </p>
          <a href="/chat" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition">
            Start Chatting
          </a>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Mental Health Assistant</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We believe that mental health is essential for leading a fulfilling life. Our AI assistant offers personalized support, helps reduce stress, and guides you through your emotional journey. Start today and take a step towards well-being.
          </p>
          <a href="/about" className="mt-8 inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition">
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-12">Our Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">24/7 Availability</h3>
              <p className="text-gray-600">
                Our assistant is available around the clock, ensuring that support is always accessible.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Personalized Support</h3>
              <p className="text-gray-600">
                Tailored advice and guidance to help you through challenging times, based on your needs and emotions.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Safe & Confidential</h3>
              <p className="text-gray-600">
                Your conversations are private, encrypted, and secure to guarantee complete confidentiality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-4">1</div>
              <h3 className="text-2xl font-semibold mb-2">Create an Account</h3>
              <p className="text-gray-600">Sign up for free to start your journey towards mental well-being.</p>
            </div>
            {/* Step 2 */}
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-4">2</div>
              <h3 className="text-2xl font-semibold mb-2">Start Sharing</h3>
              <p className="text-gray-600">Share your feelings and receive advice that&apos;s designed just for you.</p>
            </div>
            {/* Step 3 */}
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-4">3</div>
              <h3 className="text-2xl font-semibold mb-2">Receive Guidance</h3>
              <p className="text-gray-600">Get instant support from our assistant, guiding you towards a healthier mindset.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
              &quot;The assistant has been a life-changer for me. It&apos;s always there to listen and guide, even at 3 AM.&quot;
              </p>
              <h3 className="text-xl font-semibold">- Sarah K.</h3>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
              &quot;It feels like talking to a trusted friend who understands me, without any judgment.&quot;
              </p>
              <h3 className="text-xl font-semibold">- Michael R.</h3>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
              &quot;I love how easy it is to use and the instant support I get whenever I need it.&quot;
              </p>
              <h3 className="text-xl font-semibold">- Emily J.</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow-md py-8">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2024 Mental Health Assistant | <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a></p>
        </div>
      </footer>
    </div>
    
    </div>
    </>
  );
}
