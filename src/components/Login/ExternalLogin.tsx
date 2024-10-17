import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Progress } from "@components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import {
  LockIcon,
  CheckCircleIcon,
  XCircleIcon,
  RefreshCwIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EnhancedExternalLogin() {
  const [validationStatus, setValidationStatus] = useState<
    "loading" | "success" | "failed"
  >("loading");
  const [countdown, setCountdown] = useState(3);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // Validation logic
  useEffect(() => {
    const validateUser = async () => {
      try {
        // Simulating API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch("/api/validate-session");
        const data = await response.json();
        if (data.isValid) {
          setValidationStatus("success");
        } else {
          setValidationStatus("failed");
        }
      } catch (error) {
        console.error("Error validating user:", error);
        setValidationStatus("failed");
      }
    };

    validateUser();
  }, []);

  // Progress bar logic
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Countdown and delayed navigation on failure
  useEffect(() => {
    if (validationStatus === "failed") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Navigate after a delay in useEffect, so it happens after rendering
            // navigate("/login");
            window.location.href = "/login";
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [validationStatus, navigate]); // Navigation logic here after render

  const handleRetry = () => {
    setValidationStatus("loading");
    setProgress(0);
    // Retry validation (simulated)
    setTimeout(() => {
      const isValid = Math.random() < 0.5;
      setValidationStatus(isValid ? "success" : "failed");
    }, 2000);
  };

  const handleInstantRedirect = () => {
    // Navigation on button click
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-primary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
              <LockIcon className="mr-2" /> Secure Access Validation
            </CardTitle>
          </CardHeader>
          <CardContent>
            {validationStatus === "loading" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Progress value={progress} className="w-full mb-4" />
                <p className="text-sm text-gray-600">
                  Validating your session...
                </p>
              </motion.div>
            )}

            {validationStatus === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Alert
                  variant="default"
                  className="bg-green-50 border-green-200"
                >
                  <CheckCircleIcon className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">
                    Access Granted
                  </AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your session is valid. Redirecting to CMS Dashboard...{" "}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {validationStatus === "failed" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Alert variant="destructive">
                  <XCircleIcon className="h-4 w-4" />
                  <AlertTitle>Access Denied</AlertTitle>
                  <AlertDescription>
                    Your session is invalid. Redirecting to login in {countdown}{" "}
                    seconds...
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleRetry}
              disabled={validationStatus === "loading"}
            >
              <RefreshCwIcon className="mr-2 h-4 w-4" /> Retry
            </Button>
            <Button onClick={handleInstantRedirect}>Go to Login Now</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
