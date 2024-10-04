import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  otp: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

interface OTPDialogProps {
  isOpen: boolean;
  onSubmit: (formData: { otp: string }) => void;
  onClose: () => void;
  onResend: () => Promise<void>;
  otp?: string | null;
}
export function OTPDialog({
  isOpen,
  onSubmit,
  onClose,
  onResend,
  otp,
}: OTPDialogProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    onSubmit(data);
  };

  const [countdown, setCountdown] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsResendDisabled(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen, countdown]);

  useEffect(() => {
    if (otp) {
      form.setValue("otp", otp, { shouldValidate: true });
    }
  }, [otp, form]);
  const handleResend = async () => {
    await onResend();
    setCountdown(30);
    setIsResendDisabled(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="z-[60]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Enter OTP</DialogTitle>
              <DialogDescription>
                Please enter the One-Time Password sent to your email or phone.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          {[0, 1, 2, 3].map((index) => (
                            <InputOTPSlot key={index} index={index} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex-col items-center sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleResend}
                disabled={isResendDisabled}
                className="mb-2 sm:mb-0 bg"
              >
                {isResendDisabled ? `Resend OTP (${countdown}s)` : "Resend OTP"}
              </Button>
              <div>
                <Button variant="outline" onClick={onClose} className="mr-2">
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
