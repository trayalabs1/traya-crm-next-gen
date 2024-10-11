import { useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@components/ui/input-otp";
import { ArrowLeft, ArrowRight, Loader2, Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useAuth } from "src/context/useAuth";
import { isDevelopment } from "@utils/envUtil";
import { toast } from "react-toastify";

const OTP_LENGTH = 6;
const FormSchema = z.object({
  otp: z.string().min(OTP_LENGTH, {
    message: `Your one-time password must be ${OTP_LENGTH} characters.`,
  }),
});

interface LocationState {
  email: string;
}
export default function OtpVerificationPage() {
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  const { login, verifyOtp } = useAuthStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (!location.state) {
      navigate("/login", { state: undefined });
    }

    if (isDevelopment()) {
      const { otp } = useAuthStore.getState();
      if (otp) {
        form.setValue("otp", otp);
      }
    }
  }, [location, navigate, form, isResending]);

  const handleSubmit = async ({ otp }: z.infer<typeof FormSchema>) => {
    try {
      setIsVerifying(true);
      const state = location.state as LocationState;
      await verifyOtp({ email: state.email, otp });
      const { error } = useAuthStore.getState();
      if (error) {
        throw new Error(error);
      }

      toast.success("Login successfully");
      setIsVerifying(false);

      const { user } = useAuthStore.getState();
      if (user) {
        handleLogin(user);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    await login(location.state);
    setIsResending(false);
    toast.success("A new OTP has been sent to your email.");
  };

  const handleBackToLogin = () => {
    navigate("/login", { state: undefined });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <Mail className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Verify Your Account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            To complete your login, please enter the 6-digit code sent to your
            email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              <div className="flex justify-center">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={OTP_LENGTH} {...field}>
                          {Array(OTP_LENGTH)
                            .fill(null)
                            .map((_, index) => (
                              <InputOTPGroup key={index}>
                                <InputOTPSlot
                                  key={index}
                                  index={index}
                                  className="w-10 h-12 sm:w-12 sm:h-14 text-lg sm:text-xl"
                                />
                              </InputOTPGroup>
                            ))}
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="w-full" type="submit" disabled={isVerifying}>
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying
                  </>
                ) : (
                  <>
                    Verify OTP
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <p>Didn't receive the code?</p>
            <Button
              variant="link"
              onClick={handleResendOtp}
              disabled={isResending}
              className="text-primary p-0 h-auto font-semibold"
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : (
                "Resend OTP"
              )}
            </Button>
          </div>
          <Button
            variant="ghost"
            onClick={handleBackToLogin}
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
