import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CommandPalette from "@/components/CommandPalette";
import MobileFAB from "@/components/MobileFAB";
import Preloader from "@/components/Preloader";

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <CommandPalette />
      <MobileFAB />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showPreloader && <Preloader onDone={() => setShowPreloader(false)} />}
        <Toaster />
        <Sonner />
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
        <Analytics />
        <SpeedInsights />
      </TooltipProvider>
    </QueryClientProvider>
  );
};
    

export default App;