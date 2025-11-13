import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../components/Loader";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/foods/${id}`);
        const data = await res.json();
        setFood(data);
      } catch (error) {
        console.error("Error loading food details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  if (loading) return <Loader />;

  if (!food)
    return (
      <p className="text-center text-error mt-10">Food item not found.</p>
    );

  const {
    food_name,
    food_image,
    food_quantity,
    pickup_location,
    expire_date,
    additional_notes,
    donator_name,
    donator_email,
    donator_image,
    food_status,
  } = food;

  return (
    <section className="py-12 max-w-4xl mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={food_image}
            alt={food_name}
            className="w-full h-[400px] object-cover"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title text-2xl text-primary">{food_name}</h2>
          <p className="text-sm text-gray-600">
            Status:{" "}
            <span className="font-semibold text-accent uppercase">
              {food_status}
            </span>
          </p>
          <p>Quantity: Serves {food_quantity} people</p>
          <p>Pickup Location: {pickup_location}</p>
          <p>Expires: {expire_date}</p>
          <p className="mt-3 text-gray-600">
            <strong>Additional Notes:</strong> {additional_notes}
          </p>

          <div className="flex items-center gap-3 mt-6">
            <img
              src={donator_image}
              alt={donator_name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{donator_name}</p>
              <p className="text-sm text-gray-500">{donator_email}</p>
            </div>
          </div>

          <div className="card-actions justify-end mt-6">
            <button className="btn btn-primary">Request Food</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodDetails;