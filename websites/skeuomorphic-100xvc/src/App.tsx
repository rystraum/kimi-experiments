import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Stacks from './pages/Stacks'
import Gps from './pages/Gps'
import Soon from './pages/Soon'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stacks" element={<Stacks />} />
      <Route path="/gps" element={<Gps />} />
      <Route path="/soon/:slug" element={<Soon />} />
    </Routes>
  )
}
