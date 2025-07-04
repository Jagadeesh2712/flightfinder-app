import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, Plane, Calendar, DollarSign, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'flights' | 'bookings' | 'users'>('flights');

  // Mock data
  const flights = [
    {
      id: '1',
      flightNumber: 'AF007',
      airline: 'Air France',
      departure: { city: 'New York', airport: 'JFK', time: '08:30' },
      arrival: { city: 'Paris', airport: 'CDG', time: '21:45' },
      price: 1250,
      status: 'Active'
    },
    {
      id: '2',
      flightNumber: 'DL456',
      airline: 'Delta Airlines',
      departure: { city: 'New York', airport: 'JFK', time: '14:20' },
      arrival: { city: 'Paris', airport: 'CDG', time: '03:35' },
      price: 980,
      status: 'Active'
    }
  ];

  const bookings = [
    {
      id: '1',
      flightNumber: 'AF007',
      passenger: 'John Doe',
      email: 'john@example.com',
      price: 1250,
      status: 'Confirmed',
      bookingDate: '2024-03-15'
    },
    {
      id: '2',
      flightNumber: 'DL456',
      passenger: 'Jane Smith',
      email: 'jane@example.com',
      price: 980,
      status: 'Confirmed',
      bookingDate: '2024-03-16'
    }
  ];

  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      joinDate: '2024-01-15',
      totalBookings: 3
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      joinDate: '2024-02-10',
      totalBookings: 5
    }
  ];

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage flights, bookings, and users</p>
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
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">2,340</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">1,890</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$2.8M</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('flights')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'flights'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Flights
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Users
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'flights' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Manage Flights</h2>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Flight</span>
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Flight</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Route</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Time</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Price</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {flights.map((flight) => (
                        <tr key={flight.id}>
                          <td className="px-4 py-4">
                            <div>
                              <div className="font-medium text-gray-900">{flight.flightNumber}</div>
                              <div className="text-sm text-gray-600">{flight.airline}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">
                              {flight.departure.city} → {flight.arrival.city}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">
                              {flight.departure.time} - {flight.arrival.time}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm font-medium text-gray-900">${flight.price}</div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                              {flight.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-3">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Manage Bookings</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search bookings..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Booking ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Passenger</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Flight</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-4 py-4">
                            <div className="text-sm font-medium text-gray-900">#{booking.id}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{booking.passenger}</div>
                              <div className="text-sm text-gray-600">{booking.email}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">{booking.flightNumber}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">{booking.bookingDate}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm font-medium text-gray-900">${booking.price}</div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-3">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Manage Users</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">User</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Role</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Join Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Bookings</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-4 py-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">{user.email}</div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">{user.joinDate}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">{user.totalBookings}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-3">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;