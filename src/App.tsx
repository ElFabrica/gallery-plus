import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PageComponent from "./pages/page-component";
import LayoutMain from "./pages/layout-main";
import PageHome from "./pages/page-home";
import PagePhotoDetails from "./pages/page-photo-details";

const querryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={querryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutMain />}>
            <Route index element={<PageHome />} />
            <Route path="/fotos/:id" element={<PagePhotoDetails />} />
            <Route path="/components" element={<PageComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
