import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { routes } from "./Routes/Routes";
import { ToastContainer, Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppContextProvider from "./ContextProvider/AppContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <HelmetProvider>
          <RouterProvider router={routes} />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </HelmetProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
