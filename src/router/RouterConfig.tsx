import { createBrowserRouter, RouterProvider } from "react-router";
import { HomepageMain } from "../pages/Homepage/HomepageMain";
import CandidateCvPage from "../pages/candidate/CandidateCvPage";
import CandidateSupportPage from "../pages/candidate/CandidateSupportPage";
import JobDetailPage from "../pages/job/JobDetailPage";
import NotFoundPage from "../components/common/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomepageMain />,
  },
  {
    path: "/viec-lam",
    element: <HomepageMain />,
  },
  {
    path: "/viec-lam/:jobId",
    element: <JobDetailPage />,
  },
  {
    path: "/cv-cua-ban",
    element: <CandidateCvPage />,
  },
  {
    path: "/customer-supports",
    element: <CandidateSupportPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const RouterConfig = () => {
  return <RouterProvider router={router} />;
};

export default RouterConfig;
