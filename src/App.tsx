import { useState, useEffect, useRef } from "react";
import { FaChevronRight } from "react-icons/fa";
import BgHeader from "./assets/images/Combined Shape.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import L from "leaflet";

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
  const { register, handleSubmit } = useForm<FormValue>();
  const [ipData, setIpData] = useState<IpData | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  console.log(ipData);
  const onSubmit: SubmitHandler<FormValue> = (data) => {
    axios
      .get(`https://ipinfo.io/${data.ipAdress}?token=3210df1714e5a8`)
      .then((res) => setIpData(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([0, 0], 2);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }
  }, []);

  useEffect(() => {
    if (ipData && mapRef.current) {
      const { loc } = ipData;
      const [lat, lng] = loc.split(",").map(Number);

      mapRef.current.setView([lat, lng], 13);
      if (markerRef.current) {
        markerRef.current
          .setLatLng([lat, lng])
          .bindPopup(`<b>${ipData.region}</b>`)
          .openPopup();
      } else {
        markerRef.current = L.marker([lat, lng])
          .addTo(mapRef.current)
          .bindPopup(`<b>${ipData.region}</b>`)
          .openPopup();
      }
    }
  }, [ipData]);

  return (
    <main className="min-h-screen">
      <header>
        <div className="relative">
          <img
            src={BgHeader}
            className="w-full h-[30vh] object-cover"
            alt="background pattern"
          />

          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 flex items-center gap-[31px] flex-col w-full max-w-xl px-6 md:px-4">
            <h1 className="text-white font-medium lg:text-[32px] text-2xl tracking-[-0.29px] leading-[30px]">
              IP Address Tracker
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
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

          <div className="absolute top-1/2 lg:top-[70%] right-0 scale-75 lg:scale-100 left-0 ">
            <div className="bg-white max-w-[1110px] mx-auto shadow-[0px_50px_50px_-25px_rgba(0,0,0,0.1)] py-6 sm:py-[37px] px-6 sm:px-[32px] rounded-[15px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase mb-1 sm:mb-2">
                    IP Address
                  </p>
                  <p className="text-lg sm:text-2xl font-medium">
                    {ipData?.ip || "N/A"}
                  </p>
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase mb-1 sm:mb-2">
                    Location
                  </p>
                  <p className="text-lg sm:text-2xl font-medium">
                    {ipData?.city || "N/A"}
                  </p>
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase mb-1 sm:mb-2">
                    Timezone
                  </p>
                  <p className="text-lg sm:text-2xl font-medium">
                    {ipData?.timezone || "N/A"}
                  </p>
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase mb-1 sm:mb-2">
                    ISP
                  </p>
                  <p className="text-lg sm:text-2xl font-medium">
                    {ipData?.region || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div id="map" className="h-[calc(100vh-30vh)] relative -z-10"></div>
    </main>
  );
}

export default App;
