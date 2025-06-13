import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function AllVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const res = await axios.get('http://localhost:8000/Vehicle');
        if (res.data.data?.vehicle) {
          setVehicles(res.data.data.vehicle);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load vehicles.");
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, []);

  if (loading) return <p>Loading vehicles...</p>;

  if (!vehicles.length) return <p>No vehicles found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Vehicles</h2>
      <ul>
        {vehicles.map((v) => (
          <li key={v._id} className="border p-3 mb-3 rounded shadow-sm">
            <p><strong>Name:</strong> {v.name}</p>
            <p><strong>Capacity:</strong> {v.capacityKg} Kg</p>
            <p><strong>From:</strong> {v.fromPincode}</p>
            <p><strong>To:</strong> {v.toPincode}</p>
            <p><strong>Estimated Duration:</strong> {v.estimatedRideDurationHours || 'N/A'} hours</p>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}

export default AllVehicles;
