import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate, Link, useLocation } from "react-router";
import { toast } from "react-hot-toast";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
      toast.error("Login failed.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google login failed.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="card w-full max-w-sm bg-base-100 shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center text-primary">
          Login to PlateShare
        </h2>

        <form onSubmit={handleLogin}>
          <label className="form-control w-full mb-3">
            <span className="label-text font-medium">Email</span>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input input-bordered"
              required
            />
          </label>

          <label className="form-control w-full mb-3">
            <span className="label-text font-medium">Password</span>
            <input
              type="password"
              name="password"
              placeholder="*******"
              className="input input-bordered"
              required
            />
          </label>

          {error && <p className="text-error text-sm mb-3">{error}</p>}

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn btn-outline mt-4 w-full"
        >
          Login with Google
        </button>

        <p className="text-center mt-3 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="link link-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;