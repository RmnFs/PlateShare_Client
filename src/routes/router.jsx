import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "../pages/Home";
import AvailableFoods from "../pages/AvailableFoods";
import FoodDetails from "../pages/FoodDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddFood from "../pages/AddFood";
import ManageMyFoods from "../pages/ManageMyFoods";
import MyRequests from "../pages/MyRequests";

// Route guard
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "available-foods", element: <AvailableFoods /> },

      // ✅ Make Food Details private
      {
        path: "food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },

      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },

      {
        path: "my-requests",
        element: (
          <PrivateRoute>
            <MyRequests />
          </PrivateRoute>
        ),
      },

      {
        path: "manage-my-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods />
          </PrivateRoute>
        ),
      },

      {
        path: "add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <ErrorPage></ErrorPage>
    ),
  },
]);

export default router;