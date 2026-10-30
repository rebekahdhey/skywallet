export interface Airport {
  code: string;
  city: string;
}

export interface BoardingPass {
  id: string;
  airline: string;
  flightNumber: string;
  from: Airport;
  to: Airport;
  departure: string;
  gate: string;
  seat: string;
  terminal: string;
  passenger: string;
  color: string;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  from: Airport;
  to: Airport;
  departure: string;
  arrival: string;
  price: number;
}

export interface PassengerDetails {
  name: string
  email: string
}