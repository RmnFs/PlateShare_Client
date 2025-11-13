import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AvailableFoods from "../pages/AvailableFoods";
import FoodDetails from "../pages/FoodDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "available-foods", element: <AvailableFoods /> },
      { path: "food/:id", element: <FoodDetails /> },
    ],
  },
  {
    path: "*",
    element: (
      <h2 className="text-center text-3xl mt-20 text-error">
        404 - Page Not Found
      </h2>
    ),
  },
]);

export default router;