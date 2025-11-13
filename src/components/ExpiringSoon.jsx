import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import Loader from "./Loader";
import { Link } from "react-router";

const ExpiringSoon = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpiringFoods = async () => {
      try {
        //const res = await fetch("http://localhost:3000/api/foods");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/foods`);
        const data = await res.json();

        // Filter only available foods, sort by nearest expire date
        const available = data
          .filter((food) => food.food_status === "available" && food.expire_date)
          .sort(
            (a, b) =>
              new Date(a.expire_date).getTime() -
              new Date(b.expire_date).getTime()
          )
          .slice(0, 3); // Take 6 foods closest to expiring

        setFoods(available);
      } catch (err) {
        console.error("Error fetching expiring foods:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiringFoods();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="my-20" data-aos="fade-up">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Expiring Soon ⏳
      </h2>

      {foods.length === 0 ? (
        <p className="text-center text-gray-500">
          No items are nearing expiration right now.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
      <div className="text-center mt-10">
        <Link to="/available-foods" className="btn btn-outline btn-primary">
          See All Available Foods
        </Link>
      </div>
    </section>
  );
};

export default ExpiringSoon;