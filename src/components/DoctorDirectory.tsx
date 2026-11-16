import { useMemo, useState } from 'react'
import { doctors } from '../data/doctors'
import { doctorSpecialties } from '../types/doctor'
import type { DoctorSpecialty } from '../types/doctor'
import '../styles/doctors.scss'

function isDoctorSpecialty(value: string): value is DoctorSpecialty {
  return doctorSpecialties.some((specialty) => specialty === value)
}

export function DoctorDirectory() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<
    DoctorSpecialty | 'ყველა'
  >('ყველა')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDoctors = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase('ka')

    return doctors.filter((doctor) => {
      const matchesSpecialty =
        selectedSpecialty === 'ყველა' ||
        doctor.specialty === selectedSpecialty
      const matchesSearch =
        normalizedQuery.length === 0 ||
        doctor.name.toLocaleLowerCase('ka').includes(normalizedQuery) ||
        doctor.clinic.toLocaleLowerCase('ka').includes(normalizedQuery)

      return matchesSpecialty && matchesSearch
    })
  }, [searchQuery, selectedSpecialty])

  return (
    <section
      aria-labelledby="doctors-title"
      className="doctor-directory"
      id="doctors"
    >
      <div className="doctor-directory__heading">
        <div>
          <p className="doctor-directory__eyebrow">ზრუნვა შენს ჯანმრთელობაზე</p>
          <h2 id="doctors-title">იპოვე შენთვის სასურველი ექიმი</h2>
          <p className="doctor-directory__description">
            დაათვალიერე სპეციალისტები და დაუკავშირდი კლინიკას პირდაპირ.
          </p>
        </div>
        <a className="doctor-directory__booking-link" href="#booking">
          სესიის დაჯავშნა
        </a>
      </div>

      <div aria-label="ექიმების ძიება" className="doctor-directory__filters">
        <div>
          <label htmlFor="doctor-search">ექიმის ან კლინიკის ძიება</label>
          <input
            autoComplete="off"
            id="doctor-search"
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="მაგ. ნინო ან მედიქლაბი"
            type="search"
            value={searchQuery}
          />
        </div>
        <div>
          <label htmlFor="specialty-filter">სპეციალობა</label>
          <select
            id="specialty-filter"
            onChange={(event) => {
              const value = event.target.value
              setSelectedSpecialty(
                value === 'ყველა' || isDoctorSpecialty(value)
                  ? value
                  : 'ყველა',
              )
            }}
            value={selectedSpecialty}
          >
            <option value="ყველა">ყველა სპეციალობა</option>
            {doctorSpecialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="doctor-directory__results">
        <h3>ექიმების კატალოგი</h3>
        <p aria-live="polite">ნაპოვნია: {filteredDoctors.length}</p>
      </div>

      {filteredDoctors.length > 0 ? (
        <div className="doctor-directory__grid">
          {filteredDoctors.map((doctor) => (
            <article className="doctor-card" key={doctor.id}>
              <div className="doctor-card__identity">
                <span aria-hidden="true" className="doctor-card__initials">
                  {doctor.initials}
                </span>
                <div>
                  <h4>{doctor.name}</h4>
                  <p>{doctor.specialty}</p>
                </div>
                <span
                  aria-label={`შეფასება ${doctor.rating}-დან 5`}
                  className="doctor-card__rating"
                >
                  ★ {doctor.rating.toFixed(1)}
                </span>
              </div>
              <div className="doctor-card__details">
                <p>
                  {doctor.experienceYears} წლიანი გამოცდილება ·{' '}
                  {doctor.reviewsCount} შეფასება
                </p>
                <p>
                  {doctor.clinic} · {doctor.city}
                </p>
              </div>
              <div className="doctor-card__footer">
                <span
                  className={
                    doctor.availableToday
                      ? 'doctor-card__availability'
                      : 'doctor-card__availability doctor-card__availability--unavailable'
                  }
                >
                  {doctor.availableToday
                    ? 'დღეს ხელმისაწვდომია'
                    : 'ჩაწერა წინასწარ'}
                </span>
                <a href={`tel:${doctor.phone}`}>დაკავშირება</a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="doctor-directory__empty">
          მითითებული პარამეტრებით ექიმი ვერ მოიძებნა.
        </p>
      )}
    </section>
  )
}
