import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Heart,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react'
import BookingForm from '../components/BookingForm'
import BookingModal from '../components/BookingModal'
import { DoctorDirectory } from '../components/DoctorDirectory'
import { useBookingForm } from '../hooks/useBookingForm'
import '../styles/booking.scss'
import { formatBookingDate } from '../utils/bookingDate'

function BookingPage() {
  const { formik, booking, closeBookingModal } = useBookingForm()
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const date = new Date(`${formik.values.date}T12:00:00`)
    return new Date(date.getFullYear(), date.getMonth(), 1)
  })

  const selectedDateLabel = useMemo(() => {
    if (!formik.values.date) return 'თარიღი ჯერ არ არის არჩეული'
    return formatBookingDate(formik.values.date)
  }, [formik.values.date])

  const selectedService =
    formik.values.service === 'couple'
      ? 'სესია წყვილისთვის'
      : formik.values.service === 'consultation'
        ? 'პირველადი კონსულტაცია'
        : 'ინდივიდუალური სესია'

  return (
    <div className="page">
      <header className="site-header">
        <a aria-label="Suli — მთავარ გვერდზე" className="brand" href="#top">
          <span className="brand__symbol">
            <Leaf size={18} />
          </span>
          <span>suli<span className="brand__dot">.</span></span>
        </a>
        <nav aria-label="მთავარი ნავიგაცია" className="site-nav">
          <a href="#about">ჩვენ შესახებ</a>
          <a href="#details">სერვისები</a>
          <a href="#doctors">ექიმები</a>
          <a href="#contact">კონტაქტი</a>
        </nav>
        <a className="header-booking" href="#booking">
          დაჯავშნა <ArrowUpRight size={15} />
        </a>
      </header>

      <main id="top">
        <section className="intro" id="about">
          <div className="intro__copy">
            <div className="eyebrow">
              <span className="eyebrow__line" />
              შენი კეთილდღეობის სივრცე
            </div>
            <h1>
              საკუთარ თავთან
              <br />
              <em>დაბრუნების</em> დროა.
            </h1>
            <p className="intro__description">
              პატარა პაუზა, რომელიც დიდ ცვლილებას იწყებს. შეარჩიე დრო და
              ჩვენზე მორგებული შეხვედრა მარტივად დაჯავშნე.
            </p>
            <div className="intro__trust">
              <div className="avatar-stack" aria-hidden="true">
                <span>ნ</span>
                <span>მ</span>
                <span>თ</span>
                <span>+</span>
              </div>
              <div className="intro__rating">
                <span className="rating-stars" aria-label="5 ვარსკვლავი">
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                </span>
                <span>უკვე 400+ ადამიანს ვეხმარებით</span>
              </div>
            </div>
          </div>

          <aside className="intro-card" aria-label="Suli სივრცის შესახებ">
            <div className="intro-card__art">
              <div className="sun-disc" />
              <div className="art-leaf art-leaf--one" />
              <div className="art-leaf art-leaf--two" />
              <div className="art-arch" />
              <span className="art-caption">slow down<br />and breathe</span>
              <span className="art-sparkle art-sparkle--one"><Sparkles size={16} /></span>
              <span className="art-sparkle art-sparkle--two"><Sparkles size={11} /></span>
            </div>
            <div className="intro-card__quote">
              <div>
                <span className="eyebrow">მშვიდი გონება. მსუბუქი დღე.</span>
                <p>„ზრუნვა საკუთარ თავზე ფუფუნება კი არა, აუცილებლობაა.“</p>
              </div>
              <span className="quote-heart"><Heart size={17} /></span>
            </div>
          </aside>
        </section>

        <section className="booking-layout" id="booking">
          <div className="booking-main">
            <div className="booking-heading">
              <div>
                <span className="eyebrow">შეხვედრის დაჯავშნა</span>
                <h2>შევარჩიოთ შენი დრო</h2>
              </div>
              <span className="booking-heading__secure">
                <ShieldCheck size={15} /> დაცული ჯავშანი
              </span>
            </div>
            <BookingForm
              formik={formik}
              onChangeMonth={setVisibleMonth}
              visibleMonth={visibleMonth}
            />
          </div>

          <aside className="booking-aside" id="details">
            <div className="summary-card">
              <div className="summary-card__top">
                <span className="summary-icon"><CalendarDays size={19} /></span>
                <span className="summary-card__tag"><span /> ხელმისაწვდომია</span>
              </div>
              <span className="eyebrow">შენი შეხვედრა</span>
              <h3>პირადი ზრუნვის სესია</h3>
              <p className="summary-card__description">
                სივრცე, სადაც შეგიძლია გაჩერდე, ამოისუნთქო და საკუთარ თავს მოუსმინო.
              </p>
              <div className="summary-card__divider" />
              <div className="summary-detail">
                <span><Sparkles size={16} /> სესიის ტიპი</span>
                <strong>{selectedService}</strong>
              </div>
              <div className="summary-detail">
                <span><CalendarDays size={16} /> თარიღი</span>
                <strong>{selectedDateLabel}</strong>
              </div>
              <div className="summary-detail">
                <span><Clock3 size={16} /> დრო</span>
                <strong>{formik.values.time || 'აირჩიე დრო'}</strong>
              </div>
              <div className="summary-card__divider" />
              <div className="summary-benefit">
                <Check size={16} />
                <span>პირველი გაცნობითი საუბარი უფასოა</span>
              </div>
              <div className="summary-location">
                <MapPin size={15} />
                <span>თბილისი · პირისპირ ან ონლაინ</span>
              </div>
            </div>

            <div className="aside-note">
              <span className="aside-note__icon"><Heart size={17} /></span>
              <p>
                <strong>შენთვის მოსახერხებლად</strong>
                <span>შეხვედრის ფორმატის შეცვლა ნებისმიერ დროს შეგიძლია.</span>
              </p>
            </div>
          </aside>
        </section>

        <DoctorDirectory />
      </main>

      <footer className="site-footer" id="contact">
        <a aria-label="Suli — მთავარ გვერდზე" className="brand brand--footer" href="#top">
          <span className="brand__symbol"><Leaf size={16} /></span>
          <span>suli<span className="brand__dot">.</span></span>
        </a>
        <span>შენზე ზრუნვა აქ იწყება.</span>
        <a href="mailto:hello@suli.ge">hello@suli.ge <ArrowUpRight size={14} /></a>
      </footer>

      {booking && <BookingModal booking={booking} onClose={closeBookingModal} />}
    </div>
  )
}

export default BookingPage
