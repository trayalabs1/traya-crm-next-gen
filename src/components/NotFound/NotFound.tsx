import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Home, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">404</CardTitle>
          <CardDescription className="text-xl">Page Not Found</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlertCircle className="mx-auto h-12 w-12 text-yellow-500" />
          <p className="text-muted-foreground">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/">
            <Button variant="default" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
