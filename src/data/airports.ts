import type { Airport } from '../types/flight';

export const airports: Airport[] = [
  // Philippines
  { code: 'MNL', city: 'Manila' },
  { code: 'CEB', city: 'Cebu' },
  { code: 'DVO', city: 'Davao' },
  { code: 'CRK', city: 'Clark' },
  { code: 'ILO', city: 'Iloilo' },
  { code: 'PPS', city: 'Puerto Princesa' },

  // Southeast Asia
  { code: 'SIN', city: 'Singapore' },
  { code: 'KUL', city: 'Kuala Lumpur' },
  { code: 'BKK', city: 'Bangkok' },
  { code: 'SGN', city: 'Ho Chi Minh City' },
  { code: 'HAN', city: 'Hanoi' },
  { code: 'CGK', city: 'Jakarta' },

  // East Asia
  { code: 'TPE', city: 'Taipei' },
  { code: 'HKG', city: 'Hong Kong' },
  { code: 'NRT', city: 'Tokyo' },
  { code: 'HND', city: 'Tokyo' },
  { code: 'ICN', city: 'Seoul' },
  { code: 'KIX', city: 'Osaka' },

  // Middle East
  { code: 'DXB', city: 'Dubai' },
  { code: 'DOH', city: 'Doha' },

  // Europe
  { code: 'LHR', city: 'London' },
  { code: 'CDG', city: 'Paris' },
  { code: 'IST', city: 'Istanbul' },
];