import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import JobListingSection from "./components/JobListingSection";

export const HomepageMain = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <JobListingSection />
      <Footer />
    </div>
  );
};
