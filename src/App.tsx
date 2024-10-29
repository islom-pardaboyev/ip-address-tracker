import { FaChevronRight } from "react-icons/fa";
import BgHeader from "./assets/images/Combined Shape.svg";
import { useState } from "react";

function App() {
  const [ipAddress, setIpAddress] = useState<string>("");
  
  return (
    <main className="min-h-screen">
      <header>
        <div className="relative">
          <img 
            src={BgHeader} 
            className="w-full h-[33vh] object-cover" 
            alt="background pattern" 
          />

          <div className="absolute top-[94px] left-1/2 -translate-x-1/2 flex items-center gap-[31px] flex-col w-full max-w-xl px-6 md:px-4">
            <h1 className="text-white font-medium lg:text-[32px] text-2xl tracking-[-0.29px] leading-[30px]">
              IP Address Tracker
            </h1>

            <div className="w-full flex rounded-[15px] overflow-hidden">
              <input
                onChange={(e) =>
                  setTimeout(() => {
                    setIpAddress(e.target.value);
                  }, 600)
                }
                type="text"
                placeholder="Search for any IP address or domain"
                className="outline-none py-[18px] px-6 flex-1 text-base sm:text-lg"
              />
              <button className="bg-black hover:bg-gray-800 w-14 flex items-center justify-center">
                <FaChevronRight className="text-white" />
              </button>
            </div>
          </div>

          <div className="absolute -bottom-[130px] sm:-bottom-16 left-1/2 -translate-x-1/2 w-full px-6 md:px-4">
            <div className="bg-white max-w-[1110px] mx-auto shadow-[0px_50px_50px_-25px_rgba(0,0,0,0.1)] py-6 sm:py-[37px] px-6 sm:px-[32px] rounded-[15px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase mb-1 sm:mb-2">
                    IP Address
                  </p>
                  <p className="text-lg sm:text-2xl font-medium">192.212.174.101</p>
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase mb-1 sm:mb-2">
                    Location
                  </p>
                  <p className="text-lg sm:text-2xl font-medium">Brooklyn, NY</p>
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase mb-1 sm:mb-2">
                    Timezone
                  </p>
                  <p className="text-lg sm:text-2xl font-medium">UTC-05:00</p>
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase mb-1 sm:mb-2">
                    ISP
                  </p>
                  <p className="text-lg sm:text-2xl font-medium">SpaceX Starlink</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mt-[160px] sm:mt-[88px]">
        <h1>assalom</h1>
      </div>
    </main>
  );
}

export default App;