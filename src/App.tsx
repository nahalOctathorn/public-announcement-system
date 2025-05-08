import { RouterProvider } from "react-router-dom";
import appRouter from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { AuthProvider } from "./hooks/use-auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, //5 * 60 * 1000,

      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={appRouter} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
