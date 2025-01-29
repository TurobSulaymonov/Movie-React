import { Route, Routes } from 'react-router-dom'
import DetailedPage from '../../pages/detailed-page'
import HomePage from '../../pages/home-page'
import NotFoundPage from '../../pages/not-found-page'
import Navbar from '../navbar/navbar'
import TrandingPage from '../../pages/tranding-page'
import PopularPage from '../../pages/popular-page'

const App = () => {
	return (
		<div className='app'>
		<Navbar />
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/tranding' element={<TrandingPage/>} />
			<Route path='/popular' element={<PopularPage/>} />
			<Route path='/movie/:movieId' element={<DetailedPage />} />
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	</div>
	)
}

export default App
