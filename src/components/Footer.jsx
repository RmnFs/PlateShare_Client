const Footer = () => {
  return (
    <footer className="footer footer-center p-6 bg-base-200 mt-10">
      <aside>
        <p className="font-semibold text-primary text-lg">
          © {new Date().getFullYear()} PlateShare — Sharing made simple.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;