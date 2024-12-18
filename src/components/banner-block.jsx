import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BasicButton } from "@/components/basic-button";

export function BannerBlock({ title, description, to, src }) {
  return (
    <section className="w-full my-10 relative text-[#fff]">
      <Link to={to} className="w-full block relative">
        <img alt={title} className="w-full" src={src} />
      </Link>
      <div className="absolute px-5 -top-[10%] left-0 max-w-[800px] h-full flex justify-end flex-col">
        <h2 className="uppercase font-bold md:text-7xl mb-5 text-4xl">
          Đồ Thu Đông
        </h2>
        <p className="text-base mb-3 md:mb-9">
          Giảm tới 50% - X2 CoolCash - X3 voucher
        </p>
        <div>
          <Link to={to}>
            <BasicButton className="md:py-4 md:px-12 md:text-sx text-base py-2 px-3 uppercase bg-[#c1f700] text-[#000] hover:bg-[#98c300cc] hover:text-[#000] rounded-full h-auto">
              Khám phá ngay <ArrowRight />
            </BasicButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
