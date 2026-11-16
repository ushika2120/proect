import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import BookingPage from './pages/BookingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
