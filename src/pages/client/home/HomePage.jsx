import { BannerBlock } from "@/components/banner-block";
import { BannerSlides } from "@/components/banner-slides";
import { ProductSlides } from "@/components/product-slides";

export default function HomePage() {
  return (
    <section>
      <BannerSlides />
      <ProductSlides title="Nổi bật" />
      <BannerBlock />
      <ProductSlides title="Sản phẩm thu đông" />
      <BannerBlock />
      <ProductSlides title="Quần lót" />
      <BannerBlock />
      <ProductSlides title="Đồ hằng ngày" />
    </section>
  );
}
