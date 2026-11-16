export const doctorSpecialties = [
  'კარდიოლოგი',
  'დერმატოლოგი',
  'ნევროლოგი',
  'პედიატრი',
  'ოჯახის ექიმი',
] as const

export type DoctorSpecialty = (typeof doctorSpecialties)[number]

export interface Doctor {
  id: string
  name: string
  specialty: DoctorSpecialty
  experienceYears: number
  rating: number
  reviewsCount: number
  clinic: string
  city: string
  availableToday: boolean
  phone: string
  initials: string
}
