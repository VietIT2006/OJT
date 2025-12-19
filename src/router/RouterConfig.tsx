import { createBrowserRouter, RouterProvider } from "react-router";
import { HomepageMain } from "../pages/Homepage/HomepageMain";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomepageMain />,
    }
])

const RouterConfig = () => {
    return <RouterProvider router={router} />;
}

export default RouterConfig;