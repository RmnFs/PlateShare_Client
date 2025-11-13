const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="container mx-auto flex justify-between">
        <a className="text-2xl font-bold text-primary">PlateShare</a>
        <ul className="menu menu-horizontal space-x-4">
          <li><a>Home</a></li>
          <li><a>Available Foods</a></li>
          <li><a>Login</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;