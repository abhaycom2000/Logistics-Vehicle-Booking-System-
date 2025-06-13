import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTruckArrowRight } from "react-icons/fa6";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2 text-xl font-bold">
                        <FaTruckArrowRight size={"2em"} />
                        <Link to="/">Lifting</Link>
                    </div>

                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:text-gray-200">Search & Book</Link>
                        <Link to="/add-vehicle" className="hover:text-gray-200">Add Vehicle</Link>
                        <Link to="/bookings" className="hover:text-gray-200">Booking History</Link>
                    
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2" id="mobile-menu">
                    <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Search & Book</Link>
                    <Link to="/add-vehicle" onClick={() => setIsOpen(false)} className="block hover:text-gray-200">Add Vehicle</Link>
                    <Link to="/bookings" onClick={() => setIsOpen(false)} className="hover:text-gray-200">Booking History</Link>

                </div>
            )}
        </nav>
    );
}

export default Navbar;
