import "./App.css";
import CertificateDownload from "./components/ui/certificate-download";
import FlickeringGrid from "./components/ui/flickering-grid";
import { Toaster } from "./components/ui/sonner";

export function App() {
  return (
    <main className="min-h-screen bg-gradient-to-r   from-blue-100 to-purple-100 flex items-center justify-center  p-4 overflow-hidden sm:p-0">
      <CertificateDownload  />
      {/* <div className="relative h-[500px] rounded-lg  w-full bg-transparent  overflow-hidden border"> */}
        <FlickeringGrid
          className="z-0 absolute inset-0 size-full overflow-hidden"
          squareSize={16}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
          height={1000}
          width={2000}
        />
      {/* </div> */}
      <Toaster />
    </main>
  );
}

export default App;
