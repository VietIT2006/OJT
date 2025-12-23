import { createBrowserRouter, RouterProvider } from "react-router";
import { HomepageMain } from "../pages/Homepage/HomepageMain";
import NotFoundPage from "../components/common/NotFoundPage";
import Login from "../pages/Authentication/User/Login";
import OutCandidateMain from "../pages/Business/OutCandidate/OutCandidateMain";
import OutCandidateDetailMain from "../pages/Business/OutCandidateDetail/OutCandidateDetailMain";
import OutBusinessMain from "../pages/Candidate/OutBusiness/OutBusinessMain";
import OutBusinessDetailMain from "../pages/Candidate/OutBusinessDetail/OutBusinessDetailMain";
import BusinessLogin from "../pages/Authentication/Bussiness/BusinessLogin";
import Register from "../pages/Authentication/User/Register";
import BusinessRegister from "../pages/Authentication/Bussiness/BusinessRegister";
import LayoutMain from "../components/Layout/LayoutMain";
import CandidateSupportPage from "../pages/Candidate/CandidateSupportPage";
import CandidateCvPage from "../pages/Candidate/CandidateCvPage";
import JobDetailPage from "../pages/Candidate/JobPage/JobDetails/JobDetailPage";
// import Footer from "../components/layout/Footer";
// import Header from "../components/layout/Header";



const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutMain />,
        children: [
            { index: true, element: <HomepageMain /> },
            { path: "viec-lam", element: <HomepageMain /> },
            { path: "viec-lam/:jobId", element: <JobDetailPage /> },
            { path: "cv-cua-ban", element: <CandidateCvPage /> },
            { path: "customer-supports", element: <CandidateSupportPage /> },
            { path: "login", element: <Login /> },
            { path: "business/login", element: <BusinessLogin /> },
            { path: "register", element: <Register /> },
            { path: "business/register", element: <BusinessRegister /> },
            { path: "candidate/outstanding-company", element: <OutBusinessMain /> },
            { path: "candidate/outstanding-company/:id", element: <OutBusinessDetailMain /> },
            { path: "business/outstanding-candidate", element: <OutCandidateMain /> },
            { path: "business/outstanding-candidate/:id", element: <OutCandidateDetailMain /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);
const RouterConfig = () => {
    return <RouterProvider router={router} />;
};

export default RouterConfig;
