import { Routes, Route } from 'react-router-dom'
import HomeRoute from '../modules/home/Route'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  )
}

export default AppRoutes
