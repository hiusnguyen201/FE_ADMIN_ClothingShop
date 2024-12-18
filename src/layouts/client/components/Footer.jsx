import { Separator } from "@/components/ui/separator";
import { FooterItem } from "./FooterItem";

export default function Footer() {
  return (
    <footer className="footer-menu px-4 py-9">
      <div className="max-w-screen-2xl w-full mx-auto">
        <Separator className="lg:hidden my-5" />
        <div className=" lg:flex space-y-3 lg:space-y-0">
          <div className="lg:w-1/5 space-y-3 lg:space-y-8">
            <FooterItem
              title="COOLCLUB"
              items={[
                { title: "Đăng kí thành viên" },
                { title: "Ưu đãi & Đặc quyền" },
              ]}
            />
            <FooterItem
              title="Tài liệu - Tuyển dụng"
              items={[
                { title: "Tuyển dụng" },
                { title: "Đăng ký bản quyền" },
              ]}
            />
          </div>
          <div className="lg:w-1/5 space-y-3 lg:space-y-8">
            <FooterItem
              title="Chính sách"
              items={[
                { title: "Chính sách đổi trả 60 ngày" },
                { title: "Chính sách khuyến mãi" },
                { title: "Chính sách bảo mật" },
                { title: "Chính sách giao hàng" },
              ]}
            />
            <FooterItem
              title="Coolmate.me"
              items={[{ title: "Lịch sử thay đổi website" }]}
            />
          </div>
          <div className="lg:w-1/5 space-y-3 lg:space-y-8">
            <FooterItem
              title="Chăm sóc khách hàng"
              items={[
                { title: "Trải nghiệm mua sắm 100% hài lòng" },
                { title: "Hỏi đáp - FAQs" },
              ]}
            />
            <FooterItem
              title="Kiến thức mặc đẹp"
              items={[{ title: "Hướng dẫn chọn size" }, { title: "Blog" }]}
            />
          </div>
          <div className="lg:w-1/5 space-y-3 lg:space-y-8">
            <FooterItem
              title="Về COOLMATE"
              items={[
                { title: "Quy tắc ứng xử của Coolmate" },
                { title: "Coolmate 101" },
                { title: "DVKH xuất sắc" },
                { title: "Câu chuyện về Coolmate" },
                { title: "Nhà máy" },
                { title: "Care & Share" },
                { title: "Cam kết bền vững" },
              ]}
            />
          </div>
          <div className="lg:w-1/5 space-y-3 lg:space-y-8">
            <FooterItem
              title="Địa chỉ liên hệ"
              items={[
                {
                  title:
                    "Văn phòng Hà Nội: Tầng 3 Tòa nhà BMM, KM2, Đường Phùng Hưng, Phường Phúc La, Quận Hà Đông, TP Hà Nội",
                },
                {
                  title:
                    "Trung tâm vận hành Hà Nội: Lô C8, KCN Lại Yên, Xã Lại Yên, Huyện Hoài Đức, Thành phố Hà Nội",
                },
                {
                  title:
                    "Văn phòng và Trung tâm vận hành TP. HCM: Lô C3, đường D2, KCN Cát Lái, Thạnh Mỹ Lợi, TP. Thủ Đức, TP. Hồ Chí Minh.",
                },
                {
                  title:
                    "Trung tâm R&D: T6-01, The Manhattan Vinhomes Grand Park, Long Bình, TP. Thủ Đức",
                },
              ]}
            />
          </div>
        </div>
        <Separator className="lg:hidden my-5" />
      </div>
    </footer>
  );
}
