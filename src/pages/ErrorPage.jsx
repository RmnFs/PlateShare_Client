import { Link } from "react-router";
import errorImg from "../assets/404.jpg"; 

const ErrorPage = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      {errorImg && (
        <img
          src={errorImg}
          alt="Page not found"
          className="w-60 mb-6 animate-bounce"
        />
      )}
      <h1 className="text-5xl font-bold text-primary mb-4">404 😕</h1>
      <p className="text-gray-600 text-lg mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </section>
  );
};

export default ErrorPage;