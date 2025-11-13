import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import Loader from "../components/Loader";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/foods");
        const data = await res.json();
        setFoods(data);
      } catch (err) {
        console.error("Error loading foods:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">
        Available Foods 🍛
      </h2>

      {foods.length === 0 ? (
        <p className="text-center text-gray-500">No available foods found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AvailableFoods;