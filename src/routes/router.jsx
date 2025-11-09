import { createBrowserRouter } from "react-router";

// simple placeholder layout + page
const MainLayout = () => (
  <div style={{ textAlign: "center", marginTop: "4rem" }}>
    <h1 className="text-3xl font-bold text-green-600">
      Connection established with backend
    </h1>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
]);