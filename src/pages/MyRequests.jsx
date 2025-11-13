import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Loader from "../components/Loader";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/requests/user/${user.email}`
      );
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Error fetching user requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchRequests();
  }, [user]);

  if (loading) return <Loader />;

  if (requests.length === 0)
    return (
      <p className="text-center text-gray-500 mt-20">
        You haven’t requested any food yet.
      </p>
    );

  return (
    <section className="max-w-5xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-primary text-center mb-8">
        My Food Requests 🍱
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Food ID</th>
              <th>My Location</th>
              <th>Reason</th>
              <th>Contact</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r._id}>
                <td className="font-medium">{r.foodName || "—"}</td>
                {/* <td className="text-sm text-gray-500">{r.foodId}</td> */}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyRequests;