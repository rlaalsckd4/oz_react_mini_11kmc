import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MovieList from './MovieList.jsx'
import MovieDetail from './component/MovieDetail.jsx'
import Layout from './component/Layout.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MovieList />} />
          <Route path='/details/:id' element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}