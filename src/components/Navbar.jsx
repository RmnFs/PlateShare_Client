import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          PlateShare
        </Link>

        {/* Nav Links */}
        <ul className="menu menu-horizontal space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/available-foods">Available Foods</Link>
          </li>

          {!user && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>

        {/* Right Side (User Info) */}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar cursor-pointer"
            >
              <div className="w-10 rounded-full">
                <img src={user.photoURL} alt="profile" />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="text-center font-semibold">
                {user.displayName || "User"}
              </li>
              <li><Link to="/add-food">Add Food</Link></li>
              <li><Link to="/manage-my-foods">Manage My Foods</Link></li>
              <li><Link to="/my-requests">My Food Requests</Link></li>
              <li>
                <button onClick={handleLogout} className="text-error font-semibold">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;