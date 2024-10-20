
import Chatbot from "../../components/Chatbot"

import { Inter } from "next/font/google";



const inter = Inter({ subsets: ["latin"] });





export default async function RootLayout({ children }) {

  
  return (
    
    
       
        <div>
        <Chatbot/>
        {children}
        {/* <Chatbot /> */}
        </div>
    
  );
}
