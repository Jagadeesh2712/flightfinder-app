import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plane, Clock, MapPin, Wifi, Coffee, Tv, Star } from 'lucide-react';
import { useFlights } from '../context/FlightContext';

const FlightDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { flights } = useFlights();
  
  const flight = flights.find(f => f.id === id);

  if (!flight) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Flight Not Found</h2>
          <Link to="/search" className="text-blue-600 hover:text-blue-800">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/search"
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search Results
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Flight Details</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold">
                    {flight.airline}
                  </div>
                  <div className="text-gray-600">
                    {flight.flightNumber} • {flight.aircraft}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-gray-600">4.5</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Departure</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-900">{flight.departure.city} ({flight.departure.airport})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-900">{flight.departure.time}</span>
                    </div>
                    <div className="text-sm text-gray-600">{flight.departure.date}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Arrival</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-900">{flight.arrival.city} ({flight.arrival.airport})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-900">{flight.arrival.time}</span>
                    </div>
                    <div className="text-sm text-gray-600">{flight.arrival.date}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="h-0.5 bg-blue-600 w-24"></div>
                  <div className="text-center">
                    <Plane className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900">{flight.duration}</div>
                    <div className="text-xs text-gray-600">
                      {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                    </div>
                  </div>
                  <div className="h-0.5 bg-blue-600 w-24"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">WiFi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Coffee className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Meals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tv className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Entertainment</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Baggage Policy</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Carry-on Bag</h4>
                  <p className="text-gray-600">1 bag (22" x 14" x 9") - Included</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Checked Bag</h4>
                  <p className="text-gray-600">1 bag (50 lbs) - $30</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Flight</span>
                  <span className="font-medium text-gray-900">{flight.flightNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Class</span>
                  <span className="font-medium text-gray-900">{flight.class}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Passengers</span>
                  <span className="font-medium text-gray-900">1</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">${flight.price}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to={`/booking/${flight.id}`}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-center block"
                >
                  Book This Flight
                </Link>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Add to Wishlist
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium text-gray-900 mb-3">Seat Availability</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Economy</span>
                    <span className="text-gray-900">{flight.seats.economy} seats</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Business</span>
                    <span className="text-gray-900">{flight.seats.business} seats</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">First</span>
                    <span className="text-gray-900">{flight.seats.first} seats</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;