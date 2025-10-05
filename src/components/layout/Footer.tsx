const Footer = () => {
  return (
    <footer className="mt-16 pt-8 pb-4 border-t border-zinc-800">
      <div className="grid grid-cols-4 gap-8 mb-8">
        {/* Company */}
        <div>
          <h3 className="font-bold text-white mb-4">Công ty</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Nghề nghiệp
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                For the Record
              </a>
            </li>
          </ul>
        </div>

        {/* Communities */}
        <div>
          <h3 className="font-bold text-white mb-4">Cộng đồng</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Dành cho Nghệ sĩ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Nhà phát triển
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Quảng cáo
              </a>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-bold text-white mb-4">Liên kết hữu ích</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Hỗ trợ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Ứng dụng Di động Miễn phí
              </a>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-bold text-white mb-4">Chính sách</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Pháp lý
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Trung tâm quyền riêng tư
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Chính sách quyền riêng tư
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} WebNhac. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
