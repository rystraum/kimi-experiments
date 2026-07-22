import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Gps from './pages/Gps'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gps" element={<Gps />} />
    </Routes>
  )
}
