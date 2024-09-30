import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@schemas/user/user";
import type { LoginSchemaType } from "user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { useAuth } from "src/context/useAuth";
import { SAMPLE_USERS } from "@utils/user";
import { find } from "lodash";
import { useToast } from "@hooks/use-toast";
const DEFAULT_PASSWORD = "password";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { toast } = useToast();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async ({ email, password }: LoginSchemaType) => {
    try {
      const user = find(SAMPLE_USERS, { email });
      if (user && password === DEFAULT_PASSWORD) {
        login(user);
        navigate("/");
        toast({
          description: "Login Successfully",
          variant: "success",
          duration: 1000,
        });
      } else {
        toast({
          description: "Invalid email or password",
          variant: "destructive",
          duration: 1000,
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        description: "Invalid email or password",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Login
              </Button>
            </form>
          </Form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <Mail className="w-4 h-4 mr-2" />
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-end gap-2">
          <Link
            to="/forget-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
