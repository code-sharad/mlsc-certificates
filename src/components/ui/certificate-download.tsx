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

import logo from "../../../public/logo.png"

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
        setError("Plese check you email.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" ">
      <Card className="lg:w-[800px] lg:h-[400px] lg:grid lg:grid-cols-3 place-content-center">
        <CardHeader className="col-span-1 w-full">
          <img src={logo} className="h-44 w-44 mx-auto"/>
          <CardTitle className="text-2xl font-semibold lg:text-3xl  text-center text-gray-800">
            MLSC Workshop Certificate
          </CardTitle>
        </CardHeader>
        <CardContent className="col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              className="font-mono text-lg lg:h-12 lg:text-xl"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Select value={workshop} onValueChange={setWorkshop}>
              <SelectTrigger className="h-12 lg:text-xl text-base">
                <SelectValue placeholder="Select workshop" />
              </SelectTrigger>
              <SelectContent className="h-18 ">
                {workshops.map((w) => (
                  <SelectItem key={w.value} className="lg:text-lg text-base" value={w.value}>
                    {w.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!isCompleted && (
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Checking... " : "Find Certificate"}
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
