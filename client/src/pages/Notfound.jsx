import React, { useEffect } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import { Home, BookX } from 'lucide-react';


function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();


  function returnHome() {

      navigate("/")

  }


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);


  return (
    <div  className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] relative overflow-hidden mt-[70px]">
      <div className="text-center p-8 max-w-2xl z-10 animate-fadeIn">
        <div className="text-blue-500 mb-6 animate-bounce">
          <BookX size={64} />
        </div>
        <h1 className="text-8xl font-extrabold mb-4 text-transparent bg-gradient-to-br from-blue-400 to-blue-500 bg-clip-text leading-none">
          404
        </h1>
        <h2 className="text-3xl text-[#1e293b] mb-6">Page Not Found</h2>
        <p className="text-xl text-[#64748b] mb-8 leading-relaxed">
          Oops! It seems the page you're looking for has wandered off our shelves.
        </p>
        <button
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl text-lg font-semibold cursor-pointer transition-all ease-in-out duration-300 hover:bg-blue-600 transform hover:translate-y-[-2px] shadow-md hover:shadow-lg"
          onClick={returnHome}
        >
          <Home size={20} />
          Return Home
        </button>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-10 h-16 bg-[#0069AA] rounded-lg opacity-10 animate-float top-[20%] left-[15%]"></div>
        <div className="absolute w-10 h-16 bg-[#0069AA] rounded-lg opacity-10 animate-float top-[60%] right-[20%] animation-delay-[1s]"></div>
        <div className="absolute w-10 h-16 bg-[#0069AA] rounded-lg opacity-10 animate-float bottom-[15%] left-[30%] animation-delay-[2s]"></div>
      </div>
    </div>
  );
}

export default NotFound;