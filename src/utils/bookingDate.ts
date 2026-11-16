export const monthNames = [
  'იანვარი',
  'თებერვალი',
  'მარტი',
  'აპრილი',
  'მაისი',
  'ივნისი',
  'ივლისი',
  'აგვისტო',
  'სექტემბერი',
  'ოქტომბერი',
  'ნოემბერი',
  'დეკემბერი',
]

export const getDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const formatBookingDate = (dateKey: string) => {
  const [year, month, day] = dateKey.split('-').map(Number)
  return `${day} ${monthNames[month - 1]} ${year}`
}
