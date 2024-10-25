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
import { AlertCircle, Download } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import logo from "../../../public/logo.png";
import bg from "../../../public/vite.svg"

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
  console.log(res);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const completed = await checkCompletion(email, workshop, setResData);
      setIsCompleted(completed);
      if (!completed) {
        setError(
          "Please enter the email address you used when filling out the Google form."
        );
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <Card className="lg:max-w-[900px] lg:p-14 lg:max-h-[500px] lg:grid lg:grid-cols-3 place-content-center ">
        <CardHeader className="col-span-1 w-full">
          <div className="relative mx-auto">
            <img
              src={bg}
              className="h-44 scale-75  w-44 blur-lg animate-pulse  relative"
            />
            <img src={logo} className="h-44 w-44  absolute top-0 " />
          </div>
          <CardTitle className="text-3xl arima font-semibold lg:text-3xl text-center text-gray-800">
            <b>MLSC Workshop Certificate </b>{" "}
          </CardTitle>
          <p className="text-center text-gray-600 mt-2">
            Enter your email and select the workshop to download your
            certificate.
          </p>
        </CardHeader>
        <CardContent className="col-span-2 my-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              className="poppins-regular text-lg h-12 lg:h-12 lg:text-xl"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
            <div className="mt-6 flex justify-center items-center">
              <Button className="py-6">
                <a
                  download={true}
                  href={resData?.certificate_url}
                  className="w-full flex gap-1 items-center justify-center text-xl "
                >
                  <Download className="mr-2 h-4 w-4" /> Download Certificate 🎉
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
