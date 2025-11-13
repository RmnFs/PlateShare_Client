const FoodCard = ({ food }) => {
  const {
    food_image,
    food_name,
    food_quantity,
    pickup_location,
    expire_date,
    donator_name,
    donator_image,
  } = food;

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
      <figure>
        <img
          src={food_image}
          alt={food_name}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-primary">{food_name}</h2>
        <p className="text-sm text-gray-500">
          Quantity: Serves {food_quantity} people
        </p>
        <p className="text-sm">Pickup: {pickup_location}</p>
        <p className="text-sm">Expires: {expire_date}</p>

        <div className="flex items-center gap-2 mt-2">
          <img
            src={donator_image}
            alt={donator_name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm">{donator_name}</span>
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-sm btn-primary">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;