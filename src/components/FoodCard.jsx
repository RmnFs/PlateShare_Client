import { Link } from "react-router";

const FoodCard = ({ food }) => {
  const {
    _id,
    food_image,
    food_name,
    food_quantity,
    pickup_location,
    expire_date,
    donator_name,
    donator_image,
  } = food;

  return (
    <div
      className="card bg-base-100 border hover:shadow-2xl transition-transform hover:-translate-y-1 duration-300"
      data-aos="zoom-in-up"
    >
      <figure>
        <img
          src={food_image}
          alt={food_name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-primary">{food_name}</h2>
        <p className="text-sm text-gray-600">
          Quantity: Serves {food_quantity} people
        </p>
        <p className="text-sm">Pickup: {pickup_location}</p>
        <p className="text-sm">Expires: {expire_date}</p>

        <div className="flex items-center gap-3 mt-3">
          <img
            src={donator_image}
            alt={donator_name}
            className="w-8 h-8 rounded-full border"
          />
          <span className="text-sm">{donator_name}</span>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link to={`/food/${_id}`} className="btn btn-outline btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;