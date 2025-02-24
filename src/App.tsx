import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/home";
import { Contact } from "@/pages/contact";
import { Suspense } from "react";
import { Spinner } from "@chakra-ui/react";
import { Layout } from "@/components/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
