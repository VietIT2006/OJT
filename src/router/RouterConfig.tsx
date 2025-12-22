import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomepageMain } from "../pages/Homepage/HomepageMain";
import Login from "../pages/Authentication/User/Login";
import BusinessLogin from "../pages/Authentication/Bussiness/BusinessLogin";
import Register from "../pages/Authentication/User/Register";
import BusinessRegister from "../pages/Authentication/Bussiness/BusinessRegister";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomepageMain />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/business/login",
    element: <BusinessLogin />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/business/register",
    element: <BusinessRegister />,
  },
  {
    path: "/footer",
    element: <Footer />,
  },
  {
    path: "/header",
    element: <Header />,
  },
]);

const RouterConfig = () => {
  return <RouterProvider router={router} />;
};

export default RouterConfig;
