import "./App.css";
import CertificateDownload from "./components/ui/certificate-download";
import { Toaster } from "./components/ui/sonner";

export function App() {
  return (
    <main className="min-h-screen antialiased bg-gradient-to-r from-blue-100 to-purple-100 flex py-32 lg:items-center justify-center  p-4 overflow-auto sm:p-0">
      <p className="z-10 whitespace-pre-wrap antialiased">
        <CertificateDownload />
      </p>
      <Toaster />
    </main>
  );
}

export default App;
