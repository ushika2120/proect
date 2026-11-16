import type { FormikProps } from 'formik'
import {
  ArrowRight,
  Check,
  Clock3,
  Mail,
  Phone,
  UserRound,
} from 'lucide-react'
import type { BookingFormValues } from '../types/booking'
import BookingCalendar from './BookingCalendar'

interface BookingFormProps {
  formik: FormikProps<BookingFormValues>
  visibleMonth: Date
  onChangeMonth: (month: Date) => void
}

const timeSlots = [
  '09:00',
  '10:30',
  '12:00',
  '13:30',
  '15:00',
  '16:30',
  '18:00',
]

const services = [
  { value: 'individual', label: 'ინდივიდუალური სესია', duration: '60 წუთი' },
  { value: 'couple', label: 'სესია წყვილისთვის', duration: '75 წუთი' },
  { value: 'consultation', label: 'პირველადი კონსულტაცია', duration: '30 წუთი' },
]

function BookingForm({
  formik,
  visibleMonth,
  onChangeMonth,
}: BookingFormProps) {
  const getFieldError = (field: keyof BookingFormValues) =>
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : ''

  const serviceError = getFieldError('service')

  return (
    <form className="booking-form" onSubmit={formik.handleSubmit} noValidate>
      <div className="form-section">
        <div className="form-section__title">
          <span className="step-number">01</span>
          <div>
            <h2>შეარჩიე დრო</h2>
            <p>აირჩიე შენთვის მოსახერხებელი დღე და საათი</p>
          </div>
        </div>

        <div className="schedule-picker">
          <BookingCalendar
            onChangeMonth={onChangeMonth}
            onSelectDate={(date) => {
              void formik.setFieldValue('date', date)
              void formik.setFieldValue('time', '')
            }}
            selectedDate={formik.values.date}
            visibleMonth={visibleMonth}
          />

          <div className="time-picker">
            <div className="time-picker__heading">
              <h3>თავისუფალი დრო</h3>
              <span>
                <Clock3 size={14} />
                ადგილობრივი დრო
              </span>
            </div>
            <div className="time-picker__slots">
              {timeSlots.map((time) => (
                <button
                  aria-pressed={formik.values.time === time}
                  className={`time-slot${formik.values.time === time ? ' time-slot--selected' : ''}`}
                  key={time}
                  onClick={() => void formik.setFieldValue('time', time)}
                  type="button"
                >
                  {time}
                  {formik.values.time === time && <Check size={14} />}
                </button>
              ))}
            </div>
            {getFieldError('date') && (
              <p className="field-error" role="alert">
                {getFieldError('date')}
              </p>
            )}
            {getFieldError('time') && (
              <p className="field-error" role="alert">
                {getFieldError('time')}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="form-section form-section--details">
        <div className="form-section__title">
          <span className="step-number">02</span>
          <div>
            <h2>შენი დეტალები</h2>
            <p>შეხვედრის დასადასტურებლად შეავსე ინფორმაცია</p>
          </div>
        </div>

        <label className="field">
          <span>სესიის ტიპი</span>
          <select
            className="field__control"
            name="service"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.service}
          >
            {services.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label} · {service.duration}
              </option>
            ))}
          </select>
          {serviceError && (
            <span className="field-error" role="alert">
              {serviceError}
            </span>
          )}
        </label>

        <div className="field-grid">
          <label className="field">
            <span>სახელი და გვარი</span>
            <span className="field__input-wrap">
              <UserRound aria-hidden="true" size={17} />
              <input
                autoComplete="name"
                className="field__control"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="მაგ. ნინო ბერიძე"
                value={formik.values.name}
              />
            </span>
            {getFieldError('name') && (
              <span className="field-error" role="alert">
                {getFieldError('name')}
              </span>
            )}
          </label>

          <label className="field">
            <span>ელფოსტა</span>
            <span className="field__input-wrap">
              <Mail aria-hidden="true" size={17} />
              <input
                autoComplete="email"
                className="field__control"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="name@email.com"
                type="email"
                value={formik.values.email}
              />
            </span>
            {getFieldError('email') && (
              <span className="field-error" role="alert">
                {getFieldError('email')}
              </span>
            )}
          </label>
        </div>

        <label className="field">
          <span>ტელეფონის ნომერი</span>
          <span className="field__input-wrap">
            <Phone aria-hidden="true" size={17} />
            <input
              autoComplete="tel"
              className="field__control"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="+995 5XX XX XX XX"
              type="tel"
              value={formik.values.phone}
            />
          </span>
          {getFieldError('phone') && (
            <span className="field-error" role="alert">
              {getFieldError('phone')}
            </span>
          )}
        </label>

        <div className="form-submit">
          <p>დაჯავშნის შემდეგ დეტალებს ელფოსტაზე მიიღებ.</p>
          <button
            className="primary-button inline-flex items-center"
            disabled={formik.isSubmitting}
            type="submit"
          >
            <span>{formik.isSubmitting ? 'იგზავნება...' : 'დაჯავშნე სესია'}</span>
            <ArrowRight aria-hidden="true" size={17} />
          </button>
        </div>
      </div>
    </form>
  )
}

export default BookingForm
