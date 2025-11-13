import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import Loader from "./Loader";
import { Link } from "react-router";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const res = await fetch("http://localhost:3000/api/foods/featured/list");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/foods/featured/list`);
        const data = await res.json();
        setFoods(data);
      } catch (error) {
        console.error("Error fetching featured foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Featured Foods 🍽️
      </h2>

      {foods.length === 0 ? (
        <p className="text-center text-gray-500">No featured foods found</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <Link to="/available-foods" className="btn btn-outline btn-primary">
          Show All
        </Link>
      </div>
    </section>
  );
};

export default FeaturedFoods;