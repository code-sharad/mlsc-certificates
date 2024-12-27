import "./App.css";
import CertificateDownload from "./components/ui/certificate-download";
import { Toaster } from "./components/ui/sonner";

export function App() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center  p-4 overflow-auto sm:p-0">
      <p className="z-10 whitespace-pre-wrap ">
        <CertificateDownload />
      </p>
      <Toaster />
    </main>
  );
}

export default App;
