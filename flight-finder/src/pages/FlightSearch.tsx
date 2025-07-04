import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, SortAsc, Plane, Clock, MapPin, Star } from 'lucide-react';
import { useFlights } from '../context/FlightContext';
import SearchForm from '../components/SearchForm';

const FlightSearch: React.FC = () => {
  const { flights, searchParams } = useFlights();
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [showFilters, setShowFilters] = useState(false);

  const sortedFlights = [...flights].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'duration':
        return a.duration.localeCompare(b.duration);
      case 'departure':
        return a.departure.time.localeCompare(b.departure.time);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Search Flights</h1>
          <div className="max-w-4xl">
            <SearchForm />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchParams && (
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span className="font-semibold">{searchParams.from}</span>
                    <span className="text-gray-500">→</span>
                    <span className="font-semibold">{searchParams.to}</span>
                  </div>
                  <div className="text-gray-500">
                    {searchParams.departureDate}
                  </div>
                  <div className="text-gray-500">
                    {searchParams.passengers} {searchParams.passengers === 1 ? 'Passenger' : 'Passengers'}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <SortAsc className="h-5 w-5 text-gray-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                      className="border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="price">Price</option>
                      <option value="duration">Duration</option>
                      <option value="departure">Departure Time</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                {flights.length} flights found
              </div>
            </div>
          </div>
        )}

        {flights.length === 0 ? (
          <div className="text-center py-12">
            <Plane className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No flights found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedFlights.map((flight) => (
              <div key={flight.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {flight.airline}
                      </div>
                      <div className="text-sm text-gray-600">
                        {flight.flightNumber} • {flight.aircraft}
                      </div>
                      {flight.stops === 0 && (
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Direct
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">${flight.price}</div>
                      <div className="text-sm text-gray-600">{flight.class}</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{flight.departure.time}</div>
                        <div className="text-sm text-gray-600">{flight.departure.city}</div>
                        <div className="text-sm text-gray-600">{flight.departure.airport}</div>
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            <div className="h-0.5 bg-blue-600 flex-1"></div>
                            <Plane className="h-4 w-4 text-blue-600" />
                            <div className="h-0.5 bg-blue-600 flex-1"></div>
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          </div>
                          <div className="text-sm text-gray-600 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {flight.duration}
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{flight.arrival.time}</div>
                        <div className="text-sm text-gray-600">{flight.arrival.city}</div>
                        <div className="text-sm text-gray-600">{flight.arrival.airport}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>4.5 rating</span>
                      </div>
                      <div>
                        {flight.seats.economy + flight.seats.business + flight.seats.first} seats left
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        View Details
                      </button>
                      <Link
                        to={`/booking/${flight.id}`}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;