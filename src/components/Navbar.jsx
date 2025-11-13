import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          PlateShare
        </Link>
        <ul className="menu menu-horizontal space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/available-foods">Available Foods</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        {user && (
          <div className="flex items-center gap-2">
            <img
              src={user.photoURL}
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <span>{user.displayName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;