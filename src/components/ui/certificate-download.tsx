import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import logo from "../../../public/image.png";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import { toast } from "sonner";

const base_url = import.meta.env.VITE_BACKEND_URL;
type CertificateResponse = {
  certificate_url: string;
  id: string;
  workshop_name: string;
};

const checkCompletion = async (
  email: string,
  workshop: string,
  setResData: React.Dispatch<React.SetStateAction<CertificateResponse | null>>
) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, workshop }),
  };
  const res = await fetch(`${base_url}/certificate`, requestOptions).then(
    (res) => res.json()
  );
  setResData(res);
  return res.message == "Email not found" ? false : true;
};

const workshops = [
  {
    value: "Web Development and Cloud Hosting",
  },
];

export default function CertificateDownload() {
  const [email, setEmail] = useState("");
  const [workshop, setWorkshop] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resData, setResData] = useState<CertificateResponse | null>(null);
  const [celebrate, setCelebrate] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const completed = await checkCompletion(email, workshop, setResData);
      setIsCompleted(completed);
      setCelebrate(false);

      if (!completed) {
        setCelebrate(false);
        setError(
          "Please enter the email address you used when filling out the Google form."
        );
      }
      toast.success(" Certificate generated successfully! ", {
        duration: 5000,
        position: "top-right",
        closeButton: true,
        icon: "🎉",
      });
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setCelebrate(false);
    }
  };

  return (
    <div className="">
      <div>
        {celebrate && <Realistic autorun={{ duration: 4, speed: 30 }} />}
      </div>
      <Card className="lg:max-w-[900px] lg:p-14 lg:max-h-[500px] lg:grid lg:grid-cols-3 place-content-center ">
        <CardHeader className="col-span-1 w-full">
          <div className="relative mx-auto">
            <img
              src={logo}
              className="h-44 w-44 bg-blend-lighten blur-lg animate-pulse  relative"
            />
            <img src={logo} className="h-44 w-44  absolute top-0 " />
          </div>
          <CardTitle className="text-3xl arima font-semibold lg:text-3xl text-center text-gray-800">
            <b>MLSC Workshop Certificate </b>{" "}
          </CardTitle>
         
        </CardHeader>
        <CardContent className="col-span-2 my-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select value={workshop} onValueChange={setWorkshop}>
              <SelectTrigger className="h-12  poppins-regular text-wrap text-base lg:text-lg">
                <SelectValue placeholder="Select workshop" />
              </SelectTrigger>
              <SelectContent className="h-18 ">
                {workshops.map((w) => (
                  <SelectItem
                    key={w.value}
                    className="text-base lg:text-lg"
                    value={w.value}
                  >
                    {w.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              className="poppins-regular text-lg h-12 lg:h-12 lg:text-xl"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {!isCompleted && (
              <Button
                type="submit"
                className="w-full text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Checking... "
                ) : (
                  <div className="flex gap-3 ">
                    <span>👉</span>
                    <span className="poppins-regular">Get Certificate</span>
                  </div>
                )}
              </Button>
            )}
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="mt-1">{error}</AlertDescription>
            </Alert>
          )}

          {isCompleted && (
            <div className="mt-6 flex  justify-center items-center">
              <Button
                disabled={isDownloading}
                className="py-6  sm:text-sm lg:py-6  poppins-regular lg:mt-9"
              >
                <a
                  download={true}
                  onLoad={() => console.log("downloaded the pdf")}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = resData?.certificate_url || "";
                    setIsDownloading(true);
                    toast.success("Congratulations!", {
                      duration: 5000,
                      position: "top-right",
                      closeButton: true,
                      icon: "🎉",
                    });
                    setCelebrate(true);
                    setTimeout(() => {
                      setIsDownloading(false);
                    }, 2500);
                  }}
                  className="w-full flex gap-1 items-center justify-center font-semibold lg:font-normal sm:text-sm  lg:text-xl md:text-xl "
                >
                  {isDownloading ? (
                    <span>📥 Downloading...</span>
                  ) : (
                    <span>🎉 Download Certificate 🎉</span>
                  )}
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
