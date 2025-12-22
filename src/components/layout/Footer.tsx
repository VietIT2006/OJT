const infoLines = [
  "Tầng 7 tháp A tòa Sông Đà, đường Phạm Hùng,",
  "quận Nam Từ Liêm, Hà Nội",
  "0862 069 233",
  "academy@rikkeisoft.com",
];

const courseLinks = [
  "Làm quen với Code",
  "Bootcamp Fulltime",
  "Bootcamp Parttime",
  "Kỹ sư CNTT - PTIT",
  "Bổ trợ cho nghề",
];

const resourceLinks = [
  "Blog",
  "Ebook - Report",
  "Khóa học miễn phí",
  "Sự kiện - Webinar",
  "Cộng đồng",
];

const reasonLinks = [
  "Về Rikkei Academy",
  "Hệ sinh thái Rikkei",
  "Cơ hội nghề nghiệp",
  "Tấm gương sáng",
  "Liên hệ",
];

const socialIcons = [
  {
    name: "facebook",
    viewBox: "0 0 24 24",
    path: "M16 2h-2a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    name: "youtube",
    viewBox: "0 0 24 24",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.17 5 12 5 12 5s-6.17 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26.43 26.43 0 0 0 2 12a26.43 26.43 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.83 19 12 19 12 19s6.17 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26.43 26.43 0 0 0 22 12a26.43 26.43 0 0 0-.4-4.8zM10 15V9l5 3z",
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#1f1f1f] text-white">
      <div className="bg-[#b9151b]">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-10 px-8 py-10 text-sm">
          <div className="w-full min-w-[230px] flex-1 text-white">
            <div className="text-2xl font-semibold tracking-wide">
              R<span className="text-[#ffd5d7]">K</span>EI
              <span className="text-[#ffd5d7]">Edu</span>
            </div>
            <p className="mt-1 text-xs uppercase tracking-widest text-[#ffd5d7]">
              where dreams come true
            </p>
            <div className="mt-5 space-y-2 leading-relaxed">
              {infoLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              {socialIcons.map((icon) => (
                <button
                  key={icon.name}
                  className="rounded-full border border-[#ffd5d7]/50 p-2 transition hover:bg-white/10"
                  aria-label={icon.name}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={icon.viewBox}
                    className="h-4 w-4 fill-white"
                  >
                    <path d={icon.path} />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-wrap gap-10 text-white">
            <FooterColumn title="Khóa học" items={courseLinks} />
            <FooterColumn title="Tài nguyên học tập" items={resourceLinks} />
            <FooterColumn title="Vì sao chọn Rikkei Academy" items={reasonLinks} />
          </div>
        </div>
      </div>
      <div className="border-t border-black/30 py-4 text-center text-xs text-[#e7e7e7]">
        Copyright 2023 © Rikkei Education. All Rights Reserved.
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  items: string[];
};

const FooterColumn = ({ title, items }: FooterColumnProps) => (
  <div className="min-w-[160px] flex-1">
    <p className="text-base font-semibold">{title}</p>
    <ul className="mt-3 space-y-2 text-sm text-[#ffe5e6]">
      {items.map((item) => (
        <li key={item} className="cursor-pointer transition hover:text-white">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
