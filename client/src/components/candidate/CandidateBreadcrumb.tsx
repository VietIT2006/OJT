import { Link } from "react-router";

type BreadcrumbItem = {
  label: string;
  to?: string;
  highlight?: boolean;
};

type CandidateBreadcrumbProps = {
  items: BreadcrumbItem[];
};

const CandidateBreadcrumb = ({ items }: CandidateBreadcrumbProps) => (
  <section className="bg-[#F1F2F4]">
    <div className="mx-auto w-full max-w-[1320px] px-6 py-4">
      <div className="rounded-[1px] px-6 py-3 text-sm text-[#a5a5a5]">
        {items.map((item, index) => (
          <span key={`${item.label}-${index}`}>
            {item.to ? (
              <Link
                to={item.to}
                className={`${item.highlight ? "text-[#c71c1c]" : "text-[#6a6a6a]"} hover:text-[#c71c1c]`}
              >
                {item.label}
              </Link>
            ) : (
              <span className={item.highlight ? "text-[#c71c1c]" : ""}>{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className="px-2 text-[#d0d0d0]">/</span>
            )}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default CandidateBreadcrumb;
