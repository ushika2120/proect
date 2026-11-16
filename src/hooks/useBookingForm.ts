import { useCallback, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { addBooking } from '../store/bookingSlice'
import { useAppDispatch } from '../store/useAppDispatch'
import type { Booking, BookingFormValues } from '../types/booking'
import { getDateKey } from '../utils/bookingDate'

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'სახელი მინიმუმ 2 სიმბოლოსგან უნდა შედგებოდეს')
    .required('გთხოვთ, მიუთითოთ სახელი'),
  email: yup
    .string()
    .trim()
    .email('გთხოვთ, შეიყვანოთ სწორი ელფოსტა')
    .required('გთხოვთ, მიუთითოთ ელფოსტა'),
  phone: yup
    .string()
    .trim()
    .matches(/^\+?[0-9\s()-]{7,20}$/, 'გთხოვთ, შეიყვანოთ სწორი ტელეფონი')
    .required('გთხოვთ, მიუთითოთ ტელეფონი'),
  service: yup.string().required('აირჩიეთ სესიის ტიპი'),
  date: yup.string().required('აირჩიეთ თარიღი'),
  time: yup.string().required('აირჩიეთ დრო'),
})

const getInitialDate = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return getDateKey(tomorrow)
}

export function useBookingForm() {
  const dispatch = useAppDispatch()
  const [booking, setBooking] = useState<Booking | null>(null)

  const handleBooking = useCallback(
    async (values: BookingFormValues) => {
      const newBooking: Booking = {
        ...values,
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      }

      dispatch(addBooking(newBooking))
      setBooking(newBooking)
    },
    [dispatch],
  )

  const formik = useFormik<BookingFormValues>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      service: 'individual',
      date: getInitialDate(),
      time: '',
    },
    validationSchema,
    onSubmit: handleBooking,
  })

  const closeBookingModal = useCallback(() => setBooking(null), [])

  return { formik, booking, closeBookingModal }
}
