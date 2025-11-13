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
    const food_name = form.food_name.value.trim();
    const food_image = form.food_image.files[0];
    const food_quantity = form.food_quantity.value.trim();
    const pickup_location = form.pickup_location.value.trim();
    const expire_date = form.expire_date.value;
    const additional_notes = form.additional_notes.value.trim();

    const formData = new FormData();
    formData.append("image", food_image);

    try {
      const imageRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        { method: "POST", body: formData }
      );
      const imgData = await imageRes.json();
      if (!imgData.success) {
        toast.error("Image upload failed.");
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
      } else toast.error(data.error || "Failed to add food.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <section className="max-w-2xl mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-primary mb-10">
        Add Food
      </h2>

      <form
        onSubmit={handleAddFood}
        className="bg-base-100 rounded-2xl shadow-lg p-8 space-y-6 border border-base-200"
      >
        {/* Food Name */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Food Name
          </label>
          <input
            type="text"
            name="food_name"
            placeholder="e.g., Homemade Vegetable Soup"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Food Image */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Food Image
          </label>
          <input
            type="file"
            name="food_image"
            className="file-input file-input-bordered w-full"
            accept="image/*"
            required
          />
        </div>

        {/* Food Quantity */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Food Quantity
          </label>
          <input
            type="text"
            name="food_quantity"
            placeholder="Serves how-many people? add a number e.g, 3/4/5"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Pickup Location */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Pickup Location
          </label>
          <input
            type="text"
            name="pickup_location"
            placeholder="e.g., Programming Hero Office"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Expire Date */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Expire Date
          </label>
          <input
            type="date"
            name="expire_date"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Additional Notes
          </label>
          <textarea
            name="additional_notes"
            placeholder="e.g., homemade, spicy, vegetarian..."
            className="textarea textarea-bordered w-full min-h-[100px]"
            required
          ></textarea>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className={`btn btn-primary w-full text-base font-semibold tracking-wide ${
              loading ? "loading" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Food"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddFood;