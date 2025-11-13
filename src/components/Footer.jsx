import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-10 border-t border-base-300">
      {/* Top row: logo + social */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-6">
        {/* Left: Logo & Name */}
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <span className="text-2xl font-bold text-primary">PlateShare</span>
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex items-center gap-5 text-2xl text-gray-600">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Bottom row: copyright */}
      <div className="bg-base-300 py-3 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} PlateShare — Sharing made simple.
      </div>
    </footer>
  );
};

export default Footer;