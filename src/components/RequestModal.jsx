import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { toast } from "react-hot-toast";

const RequestModal = ({ food, onClose }) => {
  const { user } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;
    const location = form.location.value.trim();
    const reason = form.reason.value.trim();
    const contactNo = form.contactNo.value.trim();

    const requestData = {
      foodId: food._id,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      location,
      reason,
      contactNo,
      status: "pending",
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Request submitted successfully!");
        onClose();
      } else {
        toast.error(data.error || "Failed to submit request.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50 p-4">
      <div className="bg-base-100 rounded-xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="border-b border-base-300 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-primary">
            Request Food:{" "}
            <span className="text-neutral">{food.food_name}</span>
          </h3>
          <button
            className="btn btn-sm btn-ghost text-lg"
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600">
              Your Location
            </label>
            <input
              name="location"
              type="text"
              placeholder="e.g., Shundarban, Boro Bot Gacher niche"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600">
              Why do you need this food?
            </label>
            <textarea
              name="reason"
              placeholder="Share a short reason..."
              className="textarea textarea-bordered w-full min-h-[100px]"
              required
            ></textarea>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600">
              Contact Number
            </label>
            <input
              name="contactNo"
              type="text"
              placeholder="e.g., +880 123 456 7890"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-primary ${submitting ? "loading" : ""}`}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;