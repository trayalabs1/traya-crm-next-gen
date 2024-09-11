import { Button } from "@components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center text-destructive">
          <AlertTriangle className="w-5 h-5 mr-2" />
          An Error Occurred
        </CardTitle>
        <CardDescription>
          We're sorry, but something went wrong. Please try again or contact support if the problem persists.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground break-words">
          Error: {error.message || 'Unknown error'}
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={resetErrorBoundary} className="w-full flex items-center justify-center">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </CardFooter>
    </Card>
  )
}