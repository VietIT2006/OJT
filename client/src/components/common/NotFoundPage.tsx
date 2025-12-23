import Header from "../layout/Header";
import Footer from "../layout/Footer";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="flex flex-col items-center justify-center px-4 py-20 text-center text-[#616161]">
        <h1 className="text-5xl font-bold text-[#1f1f1f]">404</h1>
        <p className="mt-4 text-lg">
          Trang bạn tìm không tồn tại hoặc đã được di chuyển.
        </p>
      </main>
    </div>
  );
};

export default NotFoundPage;
