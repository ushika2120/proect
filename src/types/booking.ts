export interface BookingFormValues {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
}

export interface Booking extends BookingFormValues {
  id: string
  createdAt: string
}
