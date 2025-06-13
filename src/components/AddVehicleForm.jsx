import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AddVehicleForm() {
  const route = useNavigate()
  const [data, setData] = useState({ name: '', capacityKg: '', tyres: '', fromPincode: '', toPincode: '', availableTime: '' });

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, capacityKg, tyres, availableTime, toPincode, fromPincode } = data;

    if (!name || !capacityKg || !tyres || !toPincode || !fromPincode || !availableTime) {
      toast.error('❗ All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/vehicle', data, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.status) {
        toast.success(' Vehicle added successfully!');
        setData({ name: '', capacityKg: '', tyres: '', fromPincode: '', toPincode: '', availableTime: '' });
      } else {
        toast.success(` ${response.data.message || 'Vehicle might already exist.'}`);
        setTimeout(() => {
          route('/')
        }, 1500);
      }
      setData('')
    } catch (error) {
      console.error(error);
      toast.error('❌ Error adding vehicle. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Vehicle</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            name="name"
            placeholder="Vehicle name"
            value={data.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Capacity (Kg)</label>
          <input
            name="capacityKg"
            type="number"
            placeholder="Capacity"
            value={data.capacityKg}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Number of Tyres</label>
          <input
            name="tyres"
            type="number"
            placeholder="Tyres"
            value={data.tyres}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">From Pincode</label>
          <input
            name="fromPincode"
            placeholder="From Pincode"
            type='text'
            value={data.fromPincode}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">To Pincode</label>
          <input
            name="toPincode"
            placeholder="To Pincode"
            value={data.toPincode}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Available Time</label>
          <input
            value={data.availableTime}
            name="availableTime"
            type="datetime-local"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Add Vehicle
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddVehicleForm;
