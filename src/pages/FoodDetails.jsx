import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import { AuthContext } from "../auth/AuthProvider";
import RequestModal from "../components/RequestModal";
import { toast } from "react-hot-toast";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const isOwner = user?.email === food?.donator_email;

  // Fetch single food
  useEffect(() => {
    const fetchFood = async () => {
      try {
        //const res = await fetch(`http://localhost:3000/api/foods/${id}`);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/foods/${id}`);
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

  // Fetch requests (if user is owner)
  const fetchRequests = async () => {
    if (!isOwner) return;
    try {
      //const res = await fetch(`http://localhost:3000/api/requests/food/${id}`);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/requests/food/${id}`);

      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    if (isOwner) fetchRequests();
  }, [isOwner]);

  const handleStatus = async (reqId, newStatus) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/requests/${reqId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(`Request ${newStatus}`);
        fetchRequests(); // reload list
        if (newStatus === "accepted") {
          //  reload food to update donated status
          //const foodRes = await fetch(`http://localhost:3000/api/foods/${id}`);
          const foodRes = await fetch(`${import.meta.env.VITE_API_URL}/api/foods/${id}`);
          setFood(await foodRes.json());
        }
      } else {
        toast.error(data.error || "Failed to update request.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  if (loading) return <Loader />;
  if (!food)
    return (
      <p className="text-center text-error mt-10">Food item not found.</p>
    );

  return (
    <section className="py-12 max-w-4xl mx-auto">
      <div className="card bg-base-100 shadow-xl mb-10">
        <figure>
          <img
            src={food.food_image}
            alt={food.food_name}
            className="w-full h-[400px] object-cover"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title text-2xl text-primary">
            {food.food_name}
          </h2>
          <p className="text-sm text-gray-600">
            Status:{" "}
            <span className="font-semibold text-accent uppercase">
              {food.food_status}
            </span>
          </p>
          <p>Quantity: Serves {food.food_quantity} people</p>
          <p>Pickup Location: {food.pickup_location}</p>
          <p>Expires: {food.expire_date}</p>
          <p className="mt-3 text-gray-600">
            <strong>Additional Notes:</strong> {food.additional_notes}
          </p>

          <div className="flex items-center gap-3 mt-6">
            <img
              src={food.donator_image}
              alt={food.donator_name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{food.donator_name}</p>
              <p className="text-sm text-gray-500">{food.donator_email}</p>
            </div>
          </div>

          {/* Only show Request button for non-owner */}
          {!isOwner && food.food_status === "available" && user && (
            <div className="card-actions justify-end mt-6">
              <button onClick={() => setShowModal(true)} className="btn btn-primary">
                Request Food
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Requests table (Owner view) */}
      {isOwner && (
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-primary text-center">
            Food Requests
          </h3>

          {requests.length === 0 ? (
            <p className="text-center text-gray-500">No requests yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Requester</th>
                    <th>Location</th>
                    <th>Reason</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r) => (
                    <tr key={r._id}>
                      <td className="flex items-center gap-2">
                        <img
                          src={r.userPhoto}
                          alt={r.userName}
                          className="w-8 h-8 rounded-full"
                        />
                        {r.userName}
                      </td>
                      <td>{r.location}</td>
                      <td>{r.reason}</td>
                      <td>{r.contactNo}</td>
                      <td
                        className={`font-semibold ${
                          r.status === "accepted"
                            ? "text-success"
                            : r.status === "rejected"
                            ? "text-error"
                            : "text-warning"
                        }`}
                      >
                        {r.status}
                      </td>
                      <td>
                        {r.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              className="btn btn-xs btn-success"
                              onClick={() => handleStatus(r._id, "accepted")}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-xs btn-error"
                              onClick={() => handleStatus(r._id, "rejected")}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Request Modal for non-owners */}
      {showModal && (
        <RequestModal food={food} onClose={() => setShowModal(false)} />
      )}
    </section>
  );
};

export default FoodDetails;