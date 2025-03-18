import { Routes, Route } from 'react-router-dom'
import HomeView from './View'

const HomeRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView/>} />
    </Routes>
  )
}

export default HomeRoute
