import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Card, CardContent } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Progress } from "@components/ui/progress";
import {
  LockIcon,
  RefreshCwIcon,
  ArrowRightIcon,
  XIcon,
  ShieldOff,
} from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL, LOGIN_URL } from "@config/config";
import { LoginFrom, Roles, User } from "user";
import { ROLES_IDS } from "@utils/common";
import { get, isEmpty } from "lodash";
import { useAuthStore } from "./store/useAuthStore";
import { toast } from "react-toastify";

type ValidationStatus = "loading" | "success" | "failed" | "unauthorized";

const ExternalLogin = () => {
  const [validationStatus, setValidationStatus] =
    useState<ValidationStatus>("loading");
  const [countdown, setCountdown] = useState(3);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ loginFrom: LoginFrom }>();
  const { externalLogin } = useAuthStore();

  const handleProgressUpdate = (
    loaded: number,
    total: number,
    multiplier: number = 1,
  ) => {
    const percentCompleted = Math.round((loaded * multiplier) / (total || 1));
    setProgress(percentCompleted);
  };

  const validateUser = useCallback(async () => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token") || sessionStorage.getItem("token");

    if (isEmpty(token)) {
      setValidationStatus("failed");
      toast.error("Token validation failed. Please log in again.");
      return;
    }

    sessionStorage.setItem("token", token ?? "");
    urlParams.delete("token");
    navigate(`${location.pathname}?${urlParams.toString()}`, { replace: true });

    try {
      const headers = { Authorization: `Bearer ${token}` };

      // Validate Token
      const tokenResponse = await axios.get(
        `${API_BASE_URL}/api/validate-token`,
        {
          headers,
          onDownloadProgress: (progressEvent) =>
            handleProgressUpdate(
              progressEvent.loaded,
              progressEvent.total || 0,
            ),
        },
      );

      if (tokenResponse.status !== 200 || !tokenResponse.data.valid) {
        setValidationStatus("failed");
        toast.error("Token validation failed. Please log in again.");
        return;
      }

      // Get User Profile
      const profileResponse = await axios.get(`${API_BASE_URL}/profile`, {
        headers,
        onDownloadProgress: (progressEvent) =>
          handleProgressUpdate(
            progressEvent.loaded,
            progressEvent.total || 0,
            0.5,
          ),
      });

      if (profileResponse.status === 200) {
        const { email, first_name, id, phone_number, roles } =
          profileResponse.data;
        const roleId = get(roles, [0, "role_id"]);
        if (!Object.keys(ROLES_IDS).includes(roleId)) {
          setValidationStatus("unauthorized");
          return;
        }

        const user: User = {
          email,
          first_name,
          id,
          phone_number,
          role: ROLES_IDS[roleId] as Roles,
          roles,
          tenants: [],
        };
        externalLogin(user, token ?? "", params.loginFrom ?? "guest");
        setValidationStatus("success");
      } else {
        setValidationStatus("failed");
        toast.error("Failed to fetch user profile.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      toast.error("An error occurred during authentication. Please try again.");
      setValidationStatus("failed");
    }
  }, [
    externalLogin,
    location.pathname,
    location.search,
    navigate,
    params.loginFrom,
  ]);

  useEffect(() => {
    validateUser();
  }, [validateUser]);

  useEffect(() => {
    if (["success", "failed", "unauthorized"].includes(validationStatus)) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            if (validationStatus === "success") {
              sessionStorage.clear();
              handleSuccessRedirect();
            } else {
              handleInstantLoginRedirect();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [validationStatus]);

  const handleInstantLoginRedirect = () => {
    window.location.replace(LOGIN_URL);
  };

  const handleSuccessRedirect = () => {
    window.location.replace("/");
  };

  const renderStatusMessage = () => {
    const messages: Record<ValidationStatus, JSX.Element> = {
      loading: (
        <>
          <Progress value={progress} className="w-full h-2 [&>*]:bg-blue-500" />
          <p className="text-sm text-gray-400 text-center">
            Validating your session...
          </p>
        </>
      ),
      success: (
        <>
          <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <ArrowRightIcon className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">Access Granted</h3>
          <p className="text-gray-400">
            Redirecting to CMS in {countdown} seconds...
          </p>
        </>
      ),
      failed: (
        <>
          <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <XIcon className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">Access Denied</h3>
          <p className="text-gray-400">
            Redirecting to Login in {countdown} seconds...
          </p>
        </>
      ),
      unauthorized: (
        <>
          <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <ShieldOff className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">Access Denied</h3>
          <p className="text-gray-400">
            <span>You do not have permission to access. </span>
            <span>Redirecting to Login in {countdown} seconds...</span>
          </p>
        </>
      ),
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-4"
      >
        {messages[validationStatus]}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-gray-800 border-gray-700 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-500 p-3 rounded-full">
                <LockIcon className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-white mb-6">
              Secure Access Authentication
            </h2>
            <AnimatePresence mode="wait">
              {renderStatusMessage()}
            </AnimatePresence>
            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={validateUser}
                disabled={validationStatus === "loading"}
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <RefreshCwIcon className="mr-2 h-4 w-4" /> Retry
              </Button>
              <Button
                onClick={handleInstantLoginRedirect}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Go to Login Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ExternalLogin;
