import React from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import MovieInfo from '../movie-info/movie-info'
import RowMoviesItem from '../row-movies-item/row-movies-item'
import './row-movies.scss'
import MovieService from '../../services/movie.service'
import Spinner from '../spinner/spinner'
import Error from '../error/error'


class RowMovies extends React.Component {
	state = {
			open: false,
			movies: [],
			movieId: null,
			loading: true,
			error: false
		}
		
	movieService = new MovieService()
	

	componentDidMount() {
		this.getTrendingMovies()
	}
   
	onClose = () => this.setState({open: false});

	onOpen = (id) => this.setState({open: true, movieId: id})
	

	getTrendingMovies = () => {
		this.movieService.getTrandingMovies()
		 .then(res => this.setState({movies: res}))
		 .catch(() => this.setState({error: true}))
		.finally(() => this.setState({loading: false}))
	}

	render() {
		const { open, movies, movieId, error, loading} = this.state

		const contentError = error ? <Error/> : null;
		const contentLoading = loading ? <Spinner/> : null;
	


		return (
			<div className='app__rowmovie'>
				<div className='app__rowmovie-top'>
					<div className='app__rowmovie-top__title'>
						<img src='/tranding.svg' alt='' />
						<h1>Trending</h1>
					</div>
					<div className='hr' />
					<a href='#'>See more</a>
				</div>

				<div className='app__rowmovie-lists'>
					{contentError}
					{!contentLoading}
					{movies.map((movie) => (
						<RowMoviesItem
							key={movie.id}
							movie={movie}
							onOpen={this.onOpen}
						/>
					))}
				</div>

				<Modal open={open} onClose={this.onClose} >
					<MovieInfo movieId={movieId}  />
				</Modal>
			</div>
		)
	}
}


export default RowMovies
