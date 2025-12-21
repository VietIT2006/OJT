import { createBrowserRouter, RouterProvider } from "react-router";
import { HomepageMain } from "../pages/Homepage/HomepageMain";
import OutCandidateMain from "../pages/Business/OutCandidate/OutCandidateMain";
import OutCandidateDetailMain from "../pages/Business/OutCandidateDetail/OutCandidateDetailMain";
import OutBusinessMain from "../pages/Candidate/OutBusiness/OutBusinessMain";
import OutBusinessDetailMain from "../pages/Candidate/OutBusinessDetail/OutBusinessDetailMain";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomepageMain />,
    },
    {
        path: "/candidate/outstanding-company",
        element: <OutBusinessMain/>
    },
    {
        path: "/candidate/outstanding-company/:id",
        element: <OutBusinessDetailMain/>
    },
    {
        path: "/business/outstanding-candidate",
        element: <OutCandidateMain/>,
    },
    {
        path: "/business/outstanding-candidate/:id",
        element: <OutCandidateDetailMain/>,
    }
])

const RouterConfig = () => {
    return <RouterProvider router={router} />;
}

export default RouterConfig;