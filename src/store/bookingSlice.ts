import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Booking } from '../types/booking'

interface BookingState {
  bookings: Booking[]
}

const initialState: BookingState = {
  bookings: [],
}

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.unshift(action.payload)
    },
  },
})

export const { addBooking } = bookingSlice.actions
export default bookingSlice.reducer
