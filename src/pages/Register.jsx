import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate, Link } from "react-router";
import { toast } from "react-hot-toast";

const Register = () => {
  const { registerUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Password validation
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      setError("Password must include both uppercase and lowercase letters.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const result = await registerUser(email, password);
      await updateUserProfile(name, photoURL);
      toast.success("Registration successful!");
      form.reset();
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        onSubmit={handleRegister}
        className="card w-full max-w-sm bg-base-100 shadow-md p-8"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Register for PlateShare
        </h2>

        <label className="form-control w-full mb-3">
          <span className="label-text font-medium">Name</span>
          <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
        </label>

        <label className="form-control w-full mb-3">
          <span className="label-text font-medium">Photo URL</span>
          <input type="text" name="photo" placeholder="Profile Picture URL" className="input input-bordered" required />
        </label>

        <label className="form-control w-full mb-3">
          <span className="label-text font-medium">Email</span>
          <input type="email" name="email" placeholder="Email Address" className="input input-bordered" required />
        </label>

        <label className="form-control w-full mb-3">
          <span className="label-text font-medium">Password</span>
          <input type="password" name="password" placeholder="*******" className="input input-bordered" required />
        </label>

        {error && <p className="text-error text-sm mb-3">{error}</p>}

        <button type="submit" className="btn btn-primary w-full">Register</button>

        <p className="text-center mt-3 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;