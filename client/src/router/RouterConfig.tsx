import { createBrowserRouter, RouterProvider } from "react-router";
import { HomepageMain } from "../pages/Homepage/HomepageMain";
import CandidateCvPage from "../pages/Candidate/CandidateCvPage";
import CandidateSupportPage from "../pages/Candidate/CandidateSupportPage";
import JobListingSection from "../pages/Candidate/JobPage/JobListingSection";
import JobDetailPage from "../pages/Candidate/JobPage/JobDetails/JobDetailPage";
import NotFoundPage from "../components/common/NotFoundPage";
import Login from "../pages/Authentication/User/Login";
import OutCandidateMain from "../pages/Business/OutCandidate/OutCandidateMain";
import OutCandidateDetailMain from "../pages/Business/OutCandidateDetail/OutCandidateDetailMain";
import OutBusinessMain from "../pages/Candidate/OutBusiness/OutBusinessMain";
import OutBusinessDetailMain from "../pages/Candidate/OutBusinessDetail/OutBusinessDetailMain";
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
        path: "/viec-lam",
        element: <JobListingSection />,
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
    {
        path: "/",
        element: <HomepageMain />,
    },
    {
        path: "/candidate/outstanding-company",
        element: <OutBusinessMain />,
    },
    {
        path: "/candidate/outstanding-company/:id",
        element: <OutBusinessDetailMain />,
    },
    {
        path: "/business/outstanding-candidate",
        element: <OutCandidateMain />,
    },
    {
        path: "/business/outstanding-candidate/:id",
        element: <OutCandidateDetailMain />,
    },
]);
const RouterConfig = () => {
    return <RouterProvider router={router} />;
};

export default RouterConfig;
