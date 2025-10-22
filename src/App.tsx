import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import ASMApproval from "./pages/ASMApproval";
import GMApproval from "./pages/GMApproval";
import CEOApproval from "./pages/CEOApproval";
import Factory from "./pages/Factory";
import LoadTracking from "./pages/LoadTracking";
import DealerAccount from "./pages/DealerAccount";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/sales" element={<AppLayout><Sales /></AppLayout>} />
          <Route path="/asm" element={<AppLayout><ASMApproval /></AppLayout>} />
          <Route path="/gm" element={<AppLayout><GMApproval /></AppLayout>} />
          <Route path="/ceo" element={<AppLayout><CEOApproval /></AppLayout>} />
          <Route path="/factory" element={<AppLayout><Factory /></AppLayout>} />
          <Route path="/tracking" element={<AppLayout><LoadTracking /></AppLayout>} />
          <Route path="/dealer" element={<AppLayout><DealerAccount /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
