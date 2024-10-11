import { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import AppRoutesConfig from "./routes/routes";
import { AuthProvider } from "./context/AuthContext";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@components/Fallback/ErrorFallback";
import GlobalFallback from "@components/Fallback/GlobalFallback";
import { Toaster } from "@components/ui/toaster";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { getErrorMessage, getSuccessMessage } from "@utils/common";

function AppRoutes() {
  const routes = AppRoutesConfig();
  return useRoutes(routes);
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  mutationCache: new MutationCache({
    onSuccess(data) {
      toast.success(getSuccessMessage(data));
    },
    onError(error) {
      toast.error(getErrorMessage(error));
    },
  }),
  queryCache: new QueryCache({
    onError(error) {
      toast.error(getErrorMessage(error));
    },
  }),
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={reset}
                onError={(error) => {
                  console.error(error);
                }}
              >
                <Suspense fallback={<GlobalFallback />}>
                  <AppRoutes />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
          <ToastContainer
            position="bottom-right"
            hideProgressBar={true}
            theme="colored"
            autoClose={1000}
            transition={Bounce}
          />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
