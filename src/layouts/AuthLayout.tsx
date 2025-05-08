import nastpBg from "@/assets/bg-img-login.png";
import alphaLogo from "@/assets/alpha-logo 1.png";
import nastpLogo from "@/assets/nastp-logo 3.png";

import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="text-white min-h-screen w-full bg-[#0E2033]">
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/2 relative">
          <img src={nastpBg} alt="Company background" className=" h-[300px] md:h-screen object-cover" />
          <img src={nastpLogo} alt="nastp-logo" className="absolute top-10 left-6 w-32" />
          <img
            src={alphaLogo}
            alt="alpha-logo"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-32 md:w-60"
          />
        </div>
        <div className="w-full md:w-1/2  flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    
    </div>
  );
}
