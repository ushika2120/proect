import { useEffect } from 'react'
import { Check, Clock3, Mail, X } from 'lucide-react'
import type { Booking } from '../types/booking'
import { formatBookingDate } from '../utils/bookingDate'

interface BookingModalProps {
  booking: Booking
  onClose: () => void
}

const serviceNames: Record<string, string> = {
  individual: 'ინდივიდუალური სესია',
  couple: 'სესია წყვილისთვის',
  consultation: 'პირველადი კონსულტაცია',
}

function BookingModal({ booking, onClose }: BookingModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const formattedDate = formatBookingDate(booking.date)

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        aria-labelledby="booking-success-title"
        aria-modal="true"
        className="booking-modal"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="დახურვა"
          className="icon-button booking-modal__close"
          onClick={onClose}
          type="button"
        >
          <X size={19} />
        </button>
        <div className="success-mark">
          <Check size={25} strokeWidth={2.2} />
        </div>
        <span className="eyebrow">ჯავშანი მიღებულია</span>
        <h2 id="booking-success-title">
          შენთვის დრო <em>დავჯავშნეთ.</em>
        </h2>
        <p className="booking-modal__intro">
          მადლობა, {booking.name.split(' ')[0]}! შეხვედრის დეტალები გამოგიგზავნეთ:
        </p>
        <div className="booking-modal__summary">
          <div>
            <span>სესია</span>
            <strong>{serviceNames[booking.service] ?? booking.service}</strong>
          </div>
          <div>
            <span>თარიღი და დრო</span>
            <strong>
              {formattedDate} · {booking.time}
            </strong>
          </div>
          <div>
            <span>დადასტურება</span>
            <strong className="booking-modal__email">
              <Mail size={15} />
              {booking.email}
            </strong>
          </div>
        </div>
        <p className="booking-modal__note">
          <Clock3 size={15} />
          თუ გეგმები შეგეცვალა, მოგვწერე მინიმუმ 24 საათით ადრე.
        </p>
        <button className="primary-button booking-modal__done" onClick={onClose} type="button">
          კარგი, მადლობა
        </button>
      </section>
    </div>
  )
}

export default BookingModal
