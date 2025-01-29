import { Route, Routes } from 'react-router-dom'
import DetailedPage from '../../pages/detailed-page'
import HomePage from '../../pages/home-page'
import NotFoundPage from '../../pages/not-found-page'
import TvPage from '../../pages/tv-page'
import Navbar from '../navbar/navbar'

const App = () => {
	return (
		<div className='app'>
		<Navbar />
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/tv' element={<TvPage />} />
			<Route path='/movie/:movieId' element={<DetailedPage />} />
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	</div>
	)
}

export default App
