import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BasicButton } from "@/components/basic-button";

export function BannerBlock({ title, description, to }) {
  return (
    <section className="w-full my-10 relative text-[#fff]">
      <Link to={to} className="w-full block relative">
        <img
          alt={title}
          src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/December2024/mceclip2_49.jpg"
        />
      </Link>
      <div className="absolute pl-8 -top-[10%] left-0 max-w-[800px] h-full flex justify-end flex-col">
        <h2
          style={{
            fontSize: 80,
            lineHeight: "96px",
          }}
          className="uppercase font-bold"
        >
          Đồ Thu Đông
        </h2>
        <p className="text-base mb-9">
          Giảm tới 50% - X2 CoolCash - X3 voucher
        </p>
        <div>
          <Link to={to}>
            <BasicButton
              style={{
                lineHeight: "24px",
              }}
              className="uppercase bg-[#c1f700] text-[#000] hover:bg-[#98c300cc] hover:text-[#000] py-4 px-12 text-base rounded-full h-auto"
            >
              Khám phá ngay <ArrowRight />
            </BasicButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
