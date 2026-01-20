export type BookingStatus = 'pending' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceCategory: string;
  serviceName: string;
  price: string;
  duration: string;
  bookingDate: string; // ISO date string YYYY-MM-DD
  bookingTime: string; // HH:mm format
  status: BookingStatus;
  notes?: string;
}

// Generate mock bookings for the current week
const getWeekDates = (): string[] => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

const weekDates = getWeekDates();

export const mockBookings: Booking[] = [
  // Monday
  {
    id: '1',
    customerName: 'Ama Asante',
    customerEmail: 'ama@example.com',
    customerPhone: '+233 24 123 4567',
    serviceCategory: 'Nails',
    serviceName: 'Acrylic Nails',
    price: 'GH₵150',
    duration: '1 hr 30 mins',
    bookingDate: weekDates[0],
    bookingTime: '09:00',
    status: 'completed',
  },
  {
    id: '2',
    customerName: 'Kofi Mensah',
    customerEmail: 'kofi@example.com',
    customerPhone: '+233 20 234 5678',
    serviceCategory: 'Massages',
    serviceName: 'Deep Tissue Massage',
    price: 'GH₵300',
    duration: '1 hr 15 mins',
    bookingDate: weekDates[0],
    bookingTime: '10:30',
    status: 'cancelled',
  },
  {
    id: '3',
    customerName: 'Adwoa Boateng',
    customerEmail: 'adwoa@example.com',
    customerPhone: '+233 27 345 6789',
    serviceCategory: 'Pedicure',
    serviceName: 'Jelly Pedicure',
    price: 'GH₵200',
    duration: '1 hr 30 mins',
    bookingDate: weekDates[0],
    bookingTime: '13:00',
    status: 'completed',
  },
  // Tuesday
  {
    id: '4',
    customerName: 'Yaw Agyei',
    customerEmail: 'yaw@example.com',
    customerPhone: '+233 54 456 7890',
    serviceCategory: 'Facials',
    serviceName: 'Hydra Facial',
    price: 'GH₵300',
    duration: '1 hr 15 mins',
    bookingDate: weekDates[1],
    bookingTime: '09:30',
    status: 'completed',
  },
  {
    id: '5',
    customerName: 'Akosua Frimpong',
    customerEmail: 'akosua@example.com',
    customerPhone: '+233 24 567 8901',
    serviceCategory: 'Mink Eyelashes',
    serviceName: 'Volume Mink Lashes',
    price: 'GH₵300',
    duration: '2 hrs',
    bookingDate: weekDates[1],
    bookingTime: '11:00',
    status: 'pending',
  },
  {
    id: '6',
    customerName: 'Kwame Osei',
    customerEmail: 'kwame@example.com',
    customerPhone: '+233 20 678 9012',
    serviceCategory: 'Massages',
    serviceName: 'Swedish Massage',
    price: 'GH₵250',
    duration: '1 hr',
    bookingDate: weekDates[1],
    bookingTime: '13:00',
    status: 'pending',
  },
  // Wednesday
  {
    id: '7',
    customerName: 'Efua Owusu',
    customerEmail: 'efua@example.com',
    customerPhone: '+233 27 789 0123',
    serviceCategory: 'Nails',
    serviceName: 'Gel Builder (BIAB)',
    price: 'GH₵120',
    duration: '1 hr 15 mins',
    bookingDate: weekDates[2],
    bookingTime: '09:00',
    status: 'pending',
  },
  {
    id: '8',
    customerName: 'Nana Akufo',
    customerEmail: 'nana@example.com',
    customerPhone: '+233 54 890 1234',
    serviceCategory: 'Waxing',
    serviceName: 'Bikini',
    price: 'GH₵200',
    duration: '30 mins',
    bookingDate: weekDates[2],
    bookingTime: '10:30',
    status: 'cancelled',
  },
  {
    id: '9',
    customerName: 'Abena Darko',
    customerEmail: 'abena@example.com',
    customerPhone: '+233 24 901 2345',
    serviceCategory: 'Facials',
    serviceName: 'Deep Cleansing Facial',
    price: 'GH₵250',
    duration: '1 hr',
    bookingDate: weekDates[2],
    bookingTime: '13:30',
    status: 'pending',
  },
  // Thursday
  {
    id: '10',
    customerName: 'Kweku Asare',
    customerEmail: 'kweku@example.com',
    customerPhone: '+233 20 012 3456',
    serviceCategory: 'Pedicure',
    serviceName: 'Classic Pedicure',
    price: 'GH₵100',
    duration: '45 mins',
    bookingDate: weekDates[3],
    bookingTime: '09:00',
    status: 'pending',
  },
  {
    id: '11',
    customerName: 'Afia Nyarko',
    customerEmail: 'afia@example.com',
    customerPhone: '+233 27 123 4567',
    serviceCategory: 'Massages',
    serviceName: 'Hot Stone Massage',
    price: 'GH₵400',
    duration: '1 hr 30 mins',
    bookingDate: weekDates[3],
    bookingTime: '10:00',
    status: 'pending',
  },
  // Friday
  {
    id: '12',
    customerName: 'Yaa Serwaa',
    customerEmail: 'yaa@example.com',
    customerPhone: '+233 54 234 5678',
    serviceCategory: 'Nails',
    serviceName: 'Nail Art & Manicure',
    price: 'GH₵80',
    duration: '45 mins',
    bookingDate: weekDates[4],
    bookingTime: '09:30',
    status: 'pending',
  },
  {
    id: '13',
    customerName: 'Kwabena Opoku',
    customerEmail: 'kwabena@example.com',
    customerPhone: '+233 24 345 6789',
    serviceCategory: 'Other Services',
    serviceName: 'Cavitation Treatment',
    price: 'GH₵400',
    duration: '45 mins',
    bookingDate: weekDates[4],
    bookingTime: '11:00',
    status: 'pending',
  },
  {
    id: '14',
    customerName: 'Adjoa Mensah',
    customerEmail: 'adjoa@example.com',
    customerPhone: '+233 20 456 7890',
    serviceCategory: 'Mink Eyelashes',
    serviceName: 'Hybrid Lashes',
    price: 'GH₵250',
    duration: '1 hr 45 mins',
    bookingDate: weekDates[4],
    bookingTime: '13:30',
    status: 'pending',
  },
];
