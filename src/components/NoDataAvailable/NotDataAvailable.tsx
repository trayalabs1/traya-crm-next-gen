import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardFooter } from "@components/ui/card";
import { useNavigate } from "react-router-dom";
import { isFunction } from "lodash";
interface NoDataProps {
  message?: string;
  description?: string;
  onBack?: () => void;
  icon?: JSX.Element;
}

export default function NotDataAvailable({
  message = "No Data Available",
  description = "There is currently no data to display. Please check back later or try a different query.",
  onBack,
  icon,
}: NoDataProps = {}) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl">
          <CardContent className="pt-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="text-6xl mb-6 flex justify-center"
            >
              {icon ? icon : "📊"}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-semibold mb-3"
            >
              {message}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-muted-foreground px-4"
            >
              {description}
            </motion.p>
          </CardContent>
          <CardFooter className="justify-center pb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button
                variant="outline"
                onClick={() => {
                  if (isFunction(onBack)) {
                    onBack();
                  } else {
                    navigate(-1);
                  }
                }}
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
