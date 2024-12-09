import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-menu px-4 py-9">
      <div className="w-1/5">
        <p className="footer-menu_title">COOLCLUB</p>
        <ul className="space-y-2">
          <li>
            <Link to="#">Đăng kí thành viên</Link>
          </li>
          <li>
            <Link to="#">Ưu đãi & Đặc quyền</Link>
          </li>
        </ul>
        <Separator className="my-4 bg-[transparent]" />
        <p className="footer-menu_title">Tài liệu - Tuyển dụng</p>
        <ul className="space-y-2">
          <li>
            <Link to="#">Tuyển dụng</Link>
          </li>
          <li>
            <Link to="#">Đăng ký bản quyền</Link>
          </li>
        </ul>
      </div>
      <div className="w-1/5">
        <p className="footer-menu_title">Chính sách</p>
        <ul className="space-y-2">
          <li>
            <Link to="#">Chính sách đổi trả 60 ngày</Link>
          </li>
          <li>
            <Link to="#">Chính sách khuyến mãi</Link>
          </li>
          <li>
            <Link to="#">Chính sách bảo mật</Link>
          </li>
          <li>
            <Link to="#">Chính sách giao hàng</Link>
          </li>
        </ul>
        <Separator className="my-4 bg-[transparent]" />
        <p className="footer-menu_title">Coolmate.me</p>
        <ul className="space-y-2">
          <li>
            <Link to="#">Lịch sử thay đổi website</Link>
          </li>
        </ul>
      </div>
      <div className="w-1/5">
        <p className="footer-menu_title">Chăm sóc khách hàng</p>
        <ul className="space-y-2">
          <li>
            <Link to="#">Trải nghiệm mua sắm 100% hài lòng</Link>
          </li>
          <li>
            <Link to="#">Hỏi đáp - FAQs</Link>
          </li>
        </ul>
        <Separator className="my-4 bg-[transparent]" />
        <p className="footer-menu_title">Kiến thức mặc đẹp</p>
        <ul className="space-y-2">
          <li>
            <Link to="#">Hướng dẫn chọn size</Link>
          </li>
          <li>
            <Link to="#">Blog</Link>
          </li>
        </ul>
      </div>
      <div className="w-1/5">
        <p className="footer-menu_title">Về COOLMATE</p>
        <ul className="space-y-2">
          <li>
            <Link to="#">Quy tắc ứng xử của Coolmate</Link>
          </li>
          <li>
            <Link to="#">Coolmate 101</Link>
          </li>
          <li>
            <Link to="#">DVKH xuất sắc</Link>
          </li>
          <li>
            <Link to="#">Câu chuyện về Coolmate</Link>
          </li>
          <li>
            <Link to="#">Nhà máy</Link>
          </li>
          <li>
            <Link to="#">Care & Share</Link>
          </li>
          <li>
            <Link to="#">Cam kết bền vững</Link>
          </li>
        </ul>
      </div>
      <div className="w-1/5">
        <p className="footer-menu_title">Địa chỉ liên hệ</p>
        <ul className="space-y-2">
          <li>
            <span className="underline">Văn phòng Hà Nội:</span> Tầng 3 Tòa
            nhà BMM, KM2, Đường Phùng Hưng, Phường Phúc La, Quận Hà Đông,
            TP Hà Nội
          </li>
          <li>
            <span className="underline">Trung tâm vận hành Hà Nội:</span>{" "}
            Lô C8, KCN Lại Yên, Xã Lại Yên, Huyện Hoài Đức, Thành phố Hà
            Nội
          </li>
          <li>
            <span className="underline">
              Văn phòng và Trung tâm vận hành TP. HCM:
            </span>{" "}
            Lô C3, đường D2, KCN Cát Lái, Thạnh Mỹ Lợi, TP. Thủ Đức, TP. Hồ
            Chí Minh.
          </li>
          <li>
            <span className="underline">Trung tâm R&D:</span> T6-01, The
            Manhattan Vinhomes Grand Park, Long Bình, TP. Thủ Đức
          </li>
        </ul>
      </div>
    </footer>
  );
}
