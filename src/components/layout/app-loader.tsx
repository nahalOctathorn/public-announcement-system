import loaderBackground from '@/assets/nastp-landing 1.png';
import alphaLogo from "@/assets/alpha-logo 1.png";
export function AppLoader() {
  return (
    <div className="min-h-screen min-w-screen  relative overflow-hidden">
      <img src={loaderBackground} alt="loader-bg" className="h-screen w-screen" />
      <img
        src={alphaLogo}
        alt="alpha-logo"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-32 md:w-60 animate-spin"
        style={{ animationDuration: "3s" }}
      />
    </div>
  );
}