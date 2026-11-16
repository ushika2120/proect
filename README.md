# Suli — ჯავშნის ფორმა

რესპონსიული React აპლიკაცია კეთილდღეობის სესიების დასაჯავშნად. მომხმარებელს შეუძლია კალენდარში აირჩიოს თარიღი, დროის სლოტი და სესიის ტიპი, შეავსოს საკონტაქტო მონაცემები და მიიღოს ჯავშნის დადასტურება.

## გაშვება

საჭიროა Node.js 20.19+ ან 22.12+.

```bash
npm install
npm run dev
```

## GitHub Pages-ზე გამოქვეყნება

ცვლილებების `main` ბრენჩზე ატვირთვის შემდეგ GitHub Actions ავტომატურად ააწყობს და გამოაქვეყნებს საიტს. რეპოზიტორიის `Settings > Pages` განყოფილებაში `Build and deployment > Source` უნდა იყოს არჩეული `GitHub Actions`.

გამოქვეყნების შემდეგ საიტის მისამართია `https://ushika2120.github.io/proect/`.

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
