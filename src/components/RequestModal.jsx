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
    const location = form.location.value;
    const reason = form.reason.value;
    const contactNo = form.contactNo.value;

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
      const res = await fetch("http://localhost:3000/api/requests", {
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
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
      <div className="bg-base-100 p-6 rounded-lg w-full max-w-md shadow-lg">
        <h3 className="text-xl font-semibold mb-4">
          Request Food: {food.food_name}
        </h3>

        <form onSubmit={handleSubmit}>
          <label className="form-control mb-3">
            <span className="label-text">Your Location</span>
            <input
              name="location"
              type="text"
              className="input input-bordered"
              required
            />
          </label>

          <label className="form-control mb-3">
            <span className="label-text">Why do you need this food?</span>
            <textarea
              name="reason"
              className="textarea textarea-bordered"
              required
            ></textarea>
          </label>

          <label className="form-control mb-4">
            <span className="label-text">Contact Number</span>
            <input
              name="contactNo"
              type="text"
              className="input input-bordered"
              required
            />
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
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