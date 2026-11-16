# Suli — ჯავშნის ფორმა

რესპონსიული React აპლიკაცია კეთილდღეობის სესიების დასაჯავშნად. მომხმარებელს შეუძლია კალენდარში აირჩიოს თარიღი, დროის სლოტი და სესიის ტიპი, შეავსოს საკონტაქტო მონაცემები და მიიღოს ჯავშნის დადასტურება.

## გაშვება

საჭიროა Node.js 20.19+ ან 22.12+.

```bash
npm install
npm run dev
```

პროდუქციული build-ის შესაქმნელად და ლინტერის გასაშვებად:

```bash
npm run build
npm run lint
```

## ტექნოლოგიები

- Vite, React და TypeScript
- React Router და Redux Toolkit
- Formik + Yup ვალიდაცია
- Tailwind CSS v4 და Sass/SCSS
- Lucide React აიქონები

## სტრუქტურა

```text
src/
  components/  BookingForm, BookingCalendar, BookingModal
  hooks/       useBookingForm
  pages/       BookingPage
  store/       Redux store და bookings slice
  styles/      responsive SCSS
  types/       booking ტიპები
  utils/       თარიღის ფორმატირება
```
