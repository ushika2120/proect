import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatBookingDate, getDateKey, monthNames } from '../utils/bookingDate'

interface CalendarDay {
  date: Date
  dateKey: string
  isCurrentMonth: boolean
  isPast: boolean
}

interface BookingCalendarProps {
  selectedDate: string
  visibleMonth: Date
  onSelectDate: (date: string) => void
  onChangeMonth: (month: Date) => void
}

const weekdayNames = ['ორ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვ']
const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate())

function BookingCalendar({
  selectedDate,
  visibleMonth,
  onSelectDate,
  onChangeMonth,
}: BookingCalendarProps) {
  const [today] = useState(() => startOfDay(new Date()))
  const days = useMemo<CalendarDay[]>(() => {
    const firstOfMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth(),
      1,
    )
    const mondayOffset = (firstOfMonth.getDay() + 6) % 7
    const firstVisibleDate = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth(),
      1 - mondayOffset,
    )
    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(firstVisibleDate)
      date.setDate(firstVisibleDate.getDate() + index)

      return {
        date,
        dateKey: getDateKey(date),
        isCurrentMonth: date.getMonth() === visibleMonth.getMonth(),
        isPast: date < today,
      }
    })
  }, [today, visibleMonth])

  const changeMonth = (amount: number) => {
    onChangeMonth(
      new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + amount, 1),
    )
  }

  const canGoBack =
    visibleMonth.getFullYear() > today.getFullYear() ||
    (visibleMonth.getFullYear() === today.getFullYear() &&
      visibleMonth.getMonth() > today.getMonth())

  return (
    <section className="calendar" aria-label="აირჩიეთ თარიღი">
      <div className="calendar__heading">
        <h3>აირჩიე თარიღი</h3>
        <div className="calendar__month-nav">
          <button
            aria-label="წინა თვე"
            className="icon-button"
            disabled={!canGoBack}
            onClick={() => changeMonth(-1)}
            type="button"
          >
            <ChevronLeft size={17} />
          </button>
          <span aria-live="polite">
            {monthNames[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}
          </span>
          <button
            aria-label="შემდეგი თვე"
            className="icon-button"
            onClick={() => changeMonth(1)}
            type="button"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      <div className="calendar__grid" aria-label="კალენდარი">
        {weekdayNames.map((day) => (
          <span className="calendar__weekday" key={day}>
            {day}
          </span>
        ))}
        {days.map(({ date, dateKey, isCurrentMonth, isPast }) => (
          <button
            aria-label={formatBookingDate(dateKey)}
            aria-pressed={selectedDate === dateKey}
            className={[
              'calendar__day',
              !isCurrentMonth && 'calendar__day--outside',
              isPast && 'calendar__day--disabled',
              selectedDate === dateKey && 'calendar__day--selected',
            ]
              .filter(Boolean)
              .join(' ')}
            disabled={isPast}
            key={dateKey}
            onClick={() => onSelectDate(dateKey)}
            type="button"
          >
            {date.getDate()}
          </button>
        ))}
      </div>
      <div className="calendar__legend">
        <span className="calendar__legend-dot" />
        ხელმისაწვდომია
      </div>
    </section>
  )
}

export default BookingCalendar
