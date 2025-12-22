import rikkeiwhite from "../../assets/img/rikkeiwhite.png";
import facebookIcon from "../../assets/img/facebookicon.png";
import youtubeIcon from "../../assets/img/ytbicon.png";

export default function Footer() {
    const FooterTitle = ({ title }: { title: string }) => (
        <div className="h-6 mb-4 font-semibold text-base text-white leading-6 whitespace-nowrap">{title}</div>
    );
    const footerItemClass = "font-medium text-sm leading-[150%] text-[#EBB0B2] mb-2";

    return (
        <footer className="w-full bg-[#BC2228] pt-10 pb-4 px-6 box-border text-white">
            <div className="w-max mx-auto flex gap-14">
                <div className="flex-1">
                    <img src={rikkeiwhite} alt="Rikkei Education" className="w-24 h-9 mb-12" />

                    <p className="text-sm leading-5">
                        Tầng 7 tháp A tòa Sông Đà, đường Phạm Hùng,
                        <br />
                        quận Nam Từ Liêm, Hà Nội
                    </p>

                    <p className="text-sm mt-2">0862 069 233</p>
                    <p className="text-sm">academy@rikkeisoft.com</p>

                    <div className="flex gap-3 mt-3">
                        <img src={facebookIcon} alt="Facebook" className="w-6 h-6 cursor-pointer" />
                        <img src={youtubeIcon} alt="YouTube" className="w-6 h-6 cursor-pointer" />
                    </div>
                </div>

                <div className="flex gap-12">
                    <div className="min-w-40">
                        <FooterTitle title="Khóa học" />
                        <div className="mt-2">
                            <p className={footerItemClass}>Làm quen với Code</p>
                            <p className={footerItemClass}>Bootcamp Fulltime</p>
                            <p className={footerItemClass}>Bootcamp Parttime</p>
                            <p className={footerItemClass}>Kỹ sư CNTT - PTIT</p>
                            <p className={footerItemClass}>Bổ trợ cho nghề</p>
                        </div>
                    </div>

                    <div className="min-w-40">
                        <FooterTitle title="Tài nguyên học tập" />
                        <div className="mt-2">
                            <p className={footerItemClass}>Blog</p>
                            <p className={footerItemClass}>Ebook - Report</p>
                            <p className={footerItemClass}>Khóa học miễn phí</p>
                            <p className={footerItemClass}>Sự kiện - Webinar</p>
                            <p className={footerItemClass}>Cộng đồng</p>
                        </div>
                    </div>

                    <div className="min-w-50">
                        <FooterTitle title="Vì sao chọn Rikkei Academy" />
                        <div className="mt-2">
                            <p className={footerItemClass}>Về Rikkei Academy</p>
                            <p className={footerItemClass}>Hệ sinh thái Rikkei</p>
                            <p className={footerItemClass}>Cơ hội nghề nghiệp</p>
                            <p className={footerItemClass}>Tấm gương sáng</p>
                            <p className={footerItemClass}>Liên hệ</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className="mt-6 text-center text-xs text-white">Copyright © 2023 Rikkei Education. All Rights Reserved.</p>
        </footer>
    );
}
