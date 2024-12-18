import { BannerBlock } from "@/components/banner-block";
import { BannerSlides } from "@/components/banner-slides";
import { ProductSlides } from "@/components/product-slides";
import { CategoryList } from "@/components/category-list";
import { useIsMobile } from "@/hooks/use-mobile";

const data = [
  "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/December2024/Hero_Banner_-_Desktop_LDDD.jpg",
  "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/October2024/1920_x_788_hero_banner2.jpg",
  "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/November2024/Hero_Banner_-_Desktop_2_KW.jpg",
];

const dataMobile = [
  "https://media3.coolmate.me/cdn-cgi/image/width=1426,height=2100,quality=90,format=auto/uploads/December2024/Hero_Banner_-_Mobile_FW24zz.jpg",
  "https://media3.coolmate.me/cdn-cgi/image/width=1426,height=2100,quality=90,format=auto/uploads/December2024/Hero_Banner_-_Mobile_LOOKBACK2024.jpg",
  "https://media3.coolmate.me/cdn-cgi/image/width=1426,height=2100,quality=90,format=auto/uploads/December2024/Hero_Banner_-_Mobile_AGNss.jpg",
];

export default function HomePage() {
  const isMobile = useIsMobile();

  return (
    <section>
      <BannerSlides data={isMobile ? dataMobile : data} />

      <CategoryList />

      <ProductSlides title="Nổi bật" />
      <BannerBlock
        src={
          isMobile
            ? "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2024/mceclip1_60.jpg"
            : "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/December2024/mceclip2_49.jpg"
        }
      />
      <ProductSlides title="Sản phẩm thu đông" />
      <BannerBlock
        src={
          isMobile
            ? "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2024/mceclip1_60.jpg"
            : "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/December2024/mceclip2_49.jpg"
        }
      />
      <ProductSlides title="Quần lót" />
      <BannerBlock
        src={
          isMobile
            ? "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2024/mceclip1_60.jpg"
            : "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/December2024/mceclip2_49.jpg"
        }
      />
      <ProductSlides title="Đồ hằng ngày" />
    </section>
  );
}
