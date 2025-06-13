import React from 'react';
import Loader from './Loader';

function VehicleList({ vehicles, onBook, loading }) {
  if (loading) return <Loader />
  if (!vehicles.length) return <p className="text-center text-gray-500">No vehicles found.</p>;

  return (
    <div className="space-y-4">
      {vehicles.map(vehicle => (
        <div
          key={vehicle._id}
          className="bg-white shadow-md rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
        >
          <div>
            <h3 className="text-xl font-bold text-gray-800">{vehicle.name}</h3>
            <p className="text-gray-600 text-sm">
              Capacity: {vehicle.capacityKg} Kg • Tyres: {vehicle.tyres}
            </p>
            {vehicle.estimatedRideDurationHours && (
              <p className="text-gray-500 text-sm">
                ETA: {vehicle.estimatedRideDurationHours} hours
              </p>
            )}
          </div>
          <button
            onClick={() => onBook(vehicle._id)}
            className="mt-4 md:mt-0 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default VehicleList;
