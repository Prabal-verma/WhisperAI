"use client"
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards"
import { HoverEffect } from "../components/ui/card-hover-effect.jsx"
 
const words = `Your Personal Health Asisitant  Providing support, guidance, and understanding whenever you need it.
`;


 const projects = [
  {
    title: "24/7 Availability",
    description:
      "Our assistant is available around the clock, ensuring that support is always accessible.",
    link: "https://stripe.com",
  },
  {
    title: "Personalized Support",
    description:
      "Tailored advice and guidance to help you through challenging times, based on your needs and emotions.",
    link: "https://netflix.com",
  },
  {
    title: "Safe & Confidential",
    description:
      " Your conversations are private, encrypted, and secure to guarantee complete confidentiality.",
    link: "https://google.com",
  }]



const font = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

export default function Home() {
  const {data:session }=useSession()
  return (
    <>
    <div>
        {/* Radial gradient for the container to give a faded look */}
        {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}


      {/* hello
      <SignIn/> */}
      <div className="min-h-screen bg-blue-50 dark:bg-black flex flex-col justify-between">
        <div className="flex justify-center items-center pt-[100px] flex-col gap-3" >
        <div className="">
      <svg
        className="rotate-svg" // Custom class for rotation
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="200px"
        height="200px"
      >
        <path
          d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
          fill="url(#prefix__paint0_radial_980_20147)"
        />
        <defs>
          <radialGradient
            id="prefix__paint0_radial_980_20147"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
          >
            <stop offset=".067" stopColor="#9168C0" />
            <stop offset=".343" stopColor="#5684D1" />
            <stop offset=".672" stopColor="#1BA1E3" />
          </radialGradient>
        </defs>
      </svg>
    </div>
            <h2 className={cn("text-3xl font-normal lg:text-[80px] text-[60px] bg-gradient-to-r from-blue-600  to-pink-400 inline-block text-transparent bg-clip-text ", font.className)}>Whisper AI</h2>
            <div className={cn(" container mx-auto text-center dark:text-white  text-black  dark:text-white ", font.className)}>
                      <h1 className="text-4xl font-medium mb-1"><TextGenerateEffect words={words} /> </h1>
                      <p className="text-[18px]"> 
                       
                      </p>

                                {!session?(
                                  <div className="inline-block">
                                      <HoverBorderGradient
                                      containerClassName="rounded-full"
                                      as="button"
                                      className="dark:bg-black inline-block px-6 b py-4 bg-white text-black dark:text-white items-center space-x-2"
                                      >
                                      <a href="/auth/login" >
                                                                        Get Started
                                      </a>
                                      </HoverBorderGradient>
                                      
                                  </div>
                                  
                                
                                ):( 
                                  <div className="inline-block p-7">
                                  <HoverBorderGradient
                                      containerClassName="rounded-full"
                                      as="button"
                                      className="dark:bg-black inline-block px-6 b py-4 bg-white text-black dark:text-white items-center space-x-2"
                                      >
                                        <a href="/Chat">
                                    Start Chatting
                                  </a>
                                      </HoverBorderGradient>
                                      
                                      </div>
                                )}

                      
                    </div>
                    </div>
                    
                        


      {/* Hero Section */}
      {/* <section className="bg-gradient-to-r from-blue-600  to-purple-600 dark:bg-black text-white py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6">Your Personal Mental Health Assistant</h1>
          <p className="text-xl mb-8"> 
            Providing support, guidance, and understanding whenever you need it.
          </p>

                    {!session?(
                      <a href="/dashboard" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition">
                      Get Started
                    </a>
                    
                    ):( 
                      <a href="/Chat" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition">
                        Start Chatting
                      </a>
                        
                    )}

          
        </div>
      </section> */}

      {/* Welcome Section */}
      <section className="bg-white py-16 dark:bg-black">
        <div className="container mx-auto text-center">
          
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            We believe that mental health is essential for leading a fulfilling life. Our AI assistant offers personalized support, helps reduce stress, and guides you through your emotional journey. Start today and take a step towards well-being.
          </p>
          <a href="/about" className="mt-8 inline-block bg-gray-100   border-2 border-black text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-black hover:text-white dark:border-white transition">
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-blue-50 py-16 dark:bg-black">
        <div className="container mx-auto text-center dark:bg-black">
          <h2 className="text-4xl font-bold dark:text-gray-300 text-gray-600 mb-12">Our Key Features</h2>
          <div className="p-4">
          <HoverEffect items={projects} />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 dark:bg-black">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-600 mb-12 dark:text-white">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-2">
            {/* Step 1 */}
            <div className="text-center  dark:text-white mb-4 dark:border-1 dark:border-gray-200 dark:rounded-lg py-8 px-5">
              <div className="text-6xl font-bold text-gray-600">1</div>
              <h3 className="text-2xl font-semibold mb-2 dark:text-gray-400">Create an Account</h3>
              <p className="text-gray-600 p-4">Sign up for free to start your journey towards mental well-being.</p>
            </div>
            {/* Step 2 */}
            <div className="text-center  dark:text-white mb-4 dark:border-1 dark:border-gray-200 dark:rounded-lg py-8 px-5">
              <div className="text-6xl font-bold text-gray-600 mb-4">2</div>
              <h3 className="text-2xl font-semibold mb-2  dark:text-gray-400">Start Sharing</h3>
              <p className="text-gray-600">Share your feelings and receive advice that&apos;s designed just for you.</p>
            </div>
            {/* Step 3 */}
            <div className="text-center  dark:text-white mb-4 dark:border-1 dark:border-gray-200 dark:rounded-lg py-8 px-5">
              <div className="text-6xl font-bold  text-gray-600 mb-4">3</div>
              <h3 className="text-2xl font-semibold mb-2  dark:text-gray-400">Receive Guidance</h3>
              <p className="text-gray-600">Get instant support from our assistant, guiding you towards a healthier mindset.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      
      <section className="bg-blue-50 py-16  dark:bg-black">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold dark:text-gray-300 text-gray-600 ">What Our Users Say</h2>
          <div className="">
            {/* Testimonials*/}
            <div className="h-[25rem] rounded-md flex flex-col antialiased bg-blue-50 dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden ">
                <InfiniteMovingCards
                  items={testimonials}
                  direction="right"
                  speed="slow"
                />
              </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow-md py-8 dark:bg-black">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2024 Mental Health Assistant | <a href="/privacy-policy" className="text-gray-600 hover:underline">Privacy Policy</a></p>
        </div>
      </footer>
    </div>
    
    </div>
    </>
  );
}



 
const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];