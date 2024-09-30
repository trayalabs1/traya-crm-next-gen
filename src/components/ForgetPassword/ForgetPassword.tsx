import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you a link to reset your
            password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <Button className="w-full" type="submit">
            Send Reset Link
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            to="/login"
            className="flex items-center text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
