import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { toast, ToastContainer } from "react-toastify";

function BookingHistory({ customerId  }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await axios.get("http://localhost:8000/booking", {
          params: { customerId },
        });

        setHistory(res.data.data.bookings || []);
      } catch (err) {
        console.error("Error fetching booking history:", err);
        toast.error("Failed to load booking history");
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [customerId]);

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:8000/booking/${id}`, {
        bookingStatus: "cancel",
      });

      toast.success("Booking cancelled successfully");

      setHistory((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, bookingStatus: "cancel" } : b
        )
      );
    } catch (err) {
      toast.error("Failed to cancel booking");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader />
      </div>
    );

  if (!history.length)
    return (
      <p className="text-center text-gray-400 italic mt-12">
        You have no bookings yet.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
        Your Booking History
      </h2>

      {history.map((b) => (
        <div
          key={b._id}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">{b.name}</h3>
            <span
              className={`px-3 py-1 rounded-full font-medium text-sm ${
                b.bookingStatus === "booked"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {b.bookingStatus === "booked" ? "Booked" : "Cancelled"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm mb-4">
            <div>
              <p>
                <span className="font-semibold">Capacity:</span> {b.capacityKg} Kg
              </p>
              <p>
                <span className="font-semibold">Tyres:</span> {b.tyres}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">From:</span> {b.fromPincode}
              </p>
              <p>
                <span className="font-semibold">To:</span> {b.toPincode}
              </p>
            </div>
          </div>

          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Start Time:</span>{" "}
            {new Date(b.startTime).toLocaleString()}
          </p>

          {b.bookingStatus === "booked" ? (
            <button
              onClick={() => handleCancel(b._id)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-colors duration-200"
              aria-label={`Cancel booking for ${b.name}`}
            >
              Cancel Booking
            </button>
          ) : (
            <p className="text-red-500 italic font-medium">Booking Cancelled</p>
          )}
        </div>
      ))}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default BookingHistory;
