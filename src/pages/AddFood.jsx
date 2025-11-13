import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { toast } from "react-hot-toast";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

  const handleAddFood = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const food_name = form.food_name.value;
    const food_image = form.food_image.files[0];
    const food_quantity = form.food_quantity.value;
    const pickup_location = form.pickup_location.value;
    const expire_date = form.expire_date.value;
    const additional_notes = form.additional_notes.value;

    // Upload image to imgbb
    const formData = new FormData();
    formData.append("image", food_image);

    try {
      const imageRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imgData = await imageRes.json();

      if (!imgData.success) {
        toast.error("Image upload failed");
        setLoading(false);
        return;
      }

      const foodData = {
        food_name,
        food_image: imgData.data.display_url,
        food_quantity,
        pickup_location,
        expire_date,
        additional_notes,
        food_status: "available",
        donator_name: user.displayName,
        donator_email: user.email,
        donator_image: user.photoURL,
      };

      const res = await fetch("http://localhost:3000/api/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Food added successfully!");
        form.reset();
      } else {
        toast.error(data.error || "Failed to add food.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }

    setLoading(false);
  };

  if (!user) return null;

  return (
    <section className="max-w-2xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Add Food
      </h2>

      <form onSubmit={handleAddFood} className="card bg-base-100 p-8 shadow-md">
        <label className="form-control mb-3">
          <span className="label-text">Food Name</span>
          <input
            type="text"
            name="food_name"
            className="input input-bordered"
            required
          />
        </label>

        <label className="form-control mb-3">
          <span className="label-text">Food Image</span>
          <input type="file" name="food_image" className="file-input w-full" required />
        </label>

        <label className="form-control mb-3">
          <span className="label-text">Food Quantity (e.g. serves 3 people)</span>
          <input
            type="text"
            name="food_quantity"
            className="input input-bordered"
            required
          />
        </label>

        <label className="form-control mb-3">
          <span className="label-text">Pickup Location</span>
          <input
            type="text"
            name="pickup_location"
            className="input input-bordered"
            required
          />
        </label>

        <label className="form-control mb-3">
          <span className="label-text">Expire Date</span>
          <input type="date" name="expire_date" className="input input-bordered" required />
        </label>

        <label className="form-control mb-4">
          <span className="label-text">Additional Notes</span>
          <textarea
            name="additional_notes"
            className="textarea textarea-bordered"
            placeholder="e.g., homemade, spicy, vegetarian, etc."
            required
          ></textarea>
        </label>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Food"}
        </button>
      </form>
    </section>
  );
};

export default AddFood;