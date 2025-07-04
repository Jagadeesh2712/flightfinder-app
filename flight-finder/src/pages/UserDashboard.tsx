import React from 'react';
import { Calendar, MapPin, Clock, Plane, Download, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock booking data
  const bookings = [
    {
      id: '1',
      flightNumber: 'AF007',
      airline: 'Air France',
      departure: {
        city: 'New York',
        airport: 'JFK',
        time: '08:30',
        date: '2024-04-10'
      },
      arrival: {
        city: 'Paris',
        airport: 'CDG',
        time: '21:45',
        date: '2024-04-10'
      },
      status: 'Confirmed',
      price: 1250,
      bookingDate: '2024-03-15'
    },
    {
      id: '2',
      flightNumber: 'DL456',
      airline: 'Delta Airlines',
      departure: {
        city: 'Paris',
        airport: 'CDG',
        time: '14:20',
        date: '2024-04-15'
      },
      arrival: {
        city: 'New York',
        airport: 'JFK',
        time: '16:35',
        date: '2024-04-15'
      },
      status: 'Confirmed',
      price: 980,
      bookingDate: '2024-03-15'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your flight bookings and travel history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Plane className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Flights</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Countries Visited</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Miles Earned</p>
                <p className="text-2xl font-bold text-gray-900">24,580</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Upcoming Trips</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <div key={booking.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {booking.airline}
                    </div>
                    <div className="text-sm text-gray-600">
                      {booking.flightNumber}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">${booking.price}</div>
                    <div className="text-sm text-gray-600">Booked on {booking.bookingDate}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">{booking.departure.time}</div>
                      <div className="text-sm text-gray-600">{booking.departure.city}</div>
                      <div className="text-sm text-gray-600">{booking.departure.airport}</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <div className="h-0.5 bg-blue-600 flex-1"></div>
                          <Plane className="h-4 w-4 text-blue-600" />
                          <div className="h-0.5 bg-blue-600 flex-1"></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div className="text-xs text-gray-600">{booking.departure.date}</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">{booking.arrival.time}</div>
                      <div className="text-sm text-gray-600">{booking.arrival.city}</div>
                      <div className="text-sm text-gray-600">{booking.arrival.airport}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    Booking ID: {booking.id}
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                      <Download className="h-4 w-4" />
                      <span>Download Ticket</span>
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      Manage Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;