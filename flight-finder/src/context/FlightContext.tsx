import React, { createContext, useContext, useState } from 'react';
import { addDays, format } from 'date-fns';

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  duration: string;
  price: number;
  class: string;
  stops: number;
  aircraft: string;
  seats: {
    economy: number;
    business: number;
    first: number;
  };
}

export interface SearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  class: string;
  tripType: 'oneWay' | 'roundTrip';
}

interface FlightContextType {
  flights: Flight[];
  searchParams: SearchParams | null;
  searchFlights: (params: SearchParams) => void;
  selectedFlight: Flight | null;
  setSelectedFlight: (flight: Flight | null) => void;
}

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const useFlights = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlights must be used within a FlightProvider');
  }
  return context;
};

// Mock flight data
const mockFlights: Flight[] = [
  {
    id: '1',
    airline: 'Air France',
    flightNumber: 'AF007',
    departure: {
      airport: 'JFK',
      city: 'New York',
      time: '08:30',
      date: format(addDays(new Date(), 1), 'yyyy-MM-dd')
    },
    arrival: {
      airport: 'CDG',
      city: 'Paris',
      time: '21:45',
      date: format(addDays(new Date(), 1), 'yyyy-MM-dd')
    },
    duration: '7h 15m',
    price: 1250,
    class: 'Business',
    stops: 0,
    aircraft: 'Boeing 777',
    seats: {
      economy: 45,
      business: 8,
      first: 2
    }
  },
  {
    id: '2',
    airline: 'Delta Airlines',
    flightNumber: 'DL456',
    departure: {
      airport: 'JFK',
      city: 'New York',
      time: '14:20',
      date: format(addDays(new Date(), 1), 'yyyy-MM-dd')
    },
    arrival: {
      airport: 'CDG',
      city: 'Paris',
      time: '03:35',
      date: format(addDays(new Date(), 2), 'yyyy-MM-dd')
    },
    duration: '7h 15m',
    price: 980,
    class: 'Economy',
    stops: 0,
    aircraft: 'Airbus A350',
    seats: {
      economy: 23,
      business: 12,
      first: 4
    }
  },
  {
    id: '3',
    airline: 'United Airlines',
    flightNumber: 'UA789',
    departure: {
      airport: 'JFK',
      city: 'New York',
      time: '10:45',
      date: format(addDays(new Date(), 1), 'yyyy-MM-dd')
    },
    arrival: {
      airport: 'CDG',
      city: 'Paris',
      time: '00:30',
      date: format(addDays(new Date(), 2), 'yyyy-MM-dd')
    },
    duration: '7h 45m',
    price: 1120,
    class: 'Business',
    stops: 0,
    aircraft: 'Boeing 787',
    seats: {
      economy: 67,
      business: 15,
      first: 6
    }
  }
];

export const FlightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const searchFlights = (params: SearchParams) => {
    setSearchParams(params);
    // In a real app, this would make an API call
    // For now, we'll filter mock data
    const filtered = mockFlights.filter(flight => 
      flight.departure.city.toLowerCase().includes(params.from.toLowerCase()) &&
      flight.arrival.city.toLowerCase().includes(params.to.toLowerCase())
    );
    setFlights(filtered);
  };

  return (
    <FlightContext.Provider value={{
      flights,
      searchParams,
      searchFlights,
      selectedFlight,
      setSelectedFlight
    }}>
      {children}
    </FlightContext.Provider>
  );
};