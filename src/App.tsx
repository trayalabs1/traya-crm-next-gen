import { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import AppRoutesConfig from "./routes/routes";
import { AuthProvider } from "./context/AuthContext";

function AppRoutes() {
  const routes = AppRoutesConfig();
  return useRoutes(routes);
}
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<p>Loading...</p>}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
