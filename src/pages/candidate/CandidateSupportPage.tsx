import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const CandidateSupportPage = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-16 text-center text-[#626262]">
        <h1 className="text-3xl font-semibold text-[#1f1f1f]">
          Customer Supports
        </h1>
        <p className="mt-4 text-base">
          Trang hỗ trợ khách hàng cho ứng viên. Nội dung hỗ trợ trực tuyến,
          FAQ, form liên hệ hoặc live chat sẽ được bổ sung sau.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default CandidateSupportPage;
