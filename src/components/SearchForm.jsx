import React, { useState } from 'react';
import axios from 'axios';
import VehicleList from '../components/VehicleList';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function SearchForm() {
  const route = useNavigate()
  const [form, setForm] = useState({
    capacityKg: '',
    fromPincode: '',
    toPincode: '',
    startTime: ''
  });

  const [vehicles, setVehicles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSearch = async () => {
  setLoading(true);
  setMessage('');
  try {
    const res = await axios.post('http://localhost:8000/Vehicle/search', {
      capacityKg: form.capacityKg,
      fromPincode: form.fromPincode,
      toPincode: form.toPincode,
      availableTime: new Date(form.startTime).toISOString() 
    });

    if (res.data.data?.availableVehicles?.length > 0) {
      setVehicles(res.data.data.availableVehicles);
    } else {
      setVehicles([]);
      toast.error("No vehicles available for the given criteria.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to fetch vehicles.");
  } finally {
    setLoading(false);
  }
};


  const handleBook = async (vehicleId) => {
    try {
      const bookingData = {
        vehicleId,
        fromPincode: form.fromPincode,
        toPincode: form.toPincode,
        startTime: form.startTime,
        customerId:vehicleId
      };

      await axios.post('http://localhost:8000/booking', bookingData);
 
      toast.success('✅ Booking Confirmed!')
      setTimeout(() => {
        route('/bookings')
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error('❌ Booking Failed! Vehicle might be unavailable.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded shadow p-6 mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Search Vehicles</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="capacityKg"
            placeholder="Required Capacity (Kg)"
            onChange={handleChange}
            className="border p-2 rounded w-full"
            type="number"
            required
          />
          <input
            name="fromPincode"
            placeholder="From Pincode"
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            name="toPincode"
            placeholder="To Pincode"
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            name="startTime"
            type="datetime-local"
           onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <button
          onClick={handleSearch}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          {loading ? 'Searching...' : 'Search Availability'}
        </button>
      </div>

      <div className="w-full max-w-2xl">
        <VehicleList vehicles={vehicles} onBook={handleBook} loading={loading} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default SearchForm;
