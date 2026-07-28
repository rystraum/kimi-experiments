import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Stacks from './pages/Stacks'
import StackPage from './pages/StackPage'
import GroundZero from './pages/GroundZero'
import WeeklyExecution from './pages/WeeklyExecution'
import Gps from './pages/Gps'
import Powwow from './pages/Powwow'
import Soon from './pages/Soon'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stacks" element={<Stacks />} />
      <Route path="/stacks/ground-zero" element={<GroundZero />} />
      <Route path="/stacks/weekly-execution" element={<WeeklyExecution />} />
      <Route path="/stacks/:slug" element={<StackPage />} />
      <Route path="/gps" element={<Gps />} />
      <Route path="/powwow" element={<Powwow />} />
      <Route path="/soon/:slug" element={<Soon />} />
    </Routes>
  )
}
