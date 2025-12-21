import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const CandidateCvPage = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-16 text-center text-[#626262]">
        <h1 className="text-3xl font-semibold text-[#1f1f1f]">
          CV của bạn
        </h1>
        <p className="mt-4 text-base">
          Khu vực quản lý CV sẽ được triển khai tại đây. Bạn có thể cho phép
          ứng viên tạo, chỉnh sửa và tải CV ở bước tiếp theo.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default CandidateCvPage;
