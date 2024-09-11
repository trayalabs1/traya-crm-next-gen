import { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import AppRoutesConfig from "./routes/routes";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@components/Fallback/ErrorFallback";
import GlobalFallback from "@components/Fallback/GlobalFallback";

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
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
                <Suspense fallback={<GlobalFallback />}>
                  <AppRoutes />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
