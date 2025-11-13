import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchMyFoods = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/foods/my/${user.email}`
      );
      const data = await res.json();
      setFoods(data);
    } catch (err) {
      console.error("Error fetching foods:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMyFoods();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Food?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/foods/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (res.ok) {
          toast.success("Food deleted successfully!");
          setFoods(foods.filter((f) => f._id !== id));
        } else {
          toast.error(data.error || "Failed to delete food.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong.");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      food_name: form.food_name.value,
      food_quantity: form.food_quantity.value,
      pickup_location: form.pickup_location.value,
      expire_date: form.expire_date.value,
      additional_notes: form.additional_notes.value,
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/foods/${selectedFood._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Food updated successfully!");
        setShowModal(false);
        setSelectedFood(null);
        fetchMyFoods();
      } else {
        toast.error(data.error || "Update failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="max-w-5xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        Manage My Foods 🍲
      </h2>

      {foods.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t added any foods.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Quantity</th>
                <th>Pickup Location</th>
                <th>Expires</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id}>
                  <td>{food.food_name}</td>
                  <td>{food.food_quantity}</td>
                  <td>{food.pickup_location}</td>
                  <td>{food.expire_date}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline btn-primary mr-2"
                      onClick={() => {
                        setSelectedFood(food);
                        setShowModal(true);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleDelete(food._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {showModal && selectedFood && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-base-100 p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Update Food Details</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="food_name"
                defaultValue={selectedFood.food_name}
                className="input input-bordered w-full mb-3"
                required
              />

              <input
                type="text"
                name="food_quantity"
                defaultValue={selectedFood.food_quantity}
                className="input input-bordered w-full mb-3"
                required
              />

              <input
                type="text"
                name="pickup_location"
                defaultValue={selectedFood.pickup_location}
                className="input input-bordered w-full mb-3"
                required
              />

              <input
                type="date"
                name="expire_date"
                defaultValue={selectedFood.expire_date}
                className="input input-bordered w-full mb-3"
                required
              />

              <textarea
                name="additional_notes"
                className="textarea textarea-bordered w-full mb-4"
                defaultValue={selectedFood.additional_notes}
              ></textarea>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedFood(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageMyFoods;