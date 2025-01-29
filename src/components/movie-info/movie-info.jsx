import './movie-info.scss'
import {useState, useEffect} from 'react'
import Spinner from '../spinner/spinner'
import Error from '../error/error'
import useMovieService from '../../services/movie.service'
import { useNavigate } from 'react-router-dom'


const MovieInfo = ({movieId}) => {
	     
	     const [movie, setMovie] = useState(null);
		
		 const {getDetailedMovie, loading, error} = useMovieService();
		 
     
		 useEffect(() => {
			updateMovie()
		 }, [movieId])
		 
	

	const updateMovie = () =>{

		if(!movieId) {
		  return
		}
	
		getDetailedMovie(movieId).then(res =>  setMovie(res))
	
	}
      	const contentError = error ? <Error/> : null;
		const contentLoading = loading ? <Spinner/> : null;
		const content = !(error || loading || !movie) ?  <Content movie={movie}/> : null;


		return (
			<div className='movieinfo'>
			{contentError}
			{contentLoading}
			{content}
			</div>
		)
	}
	


export default MovieInfo


const Content = ({movie}) => {
	const navigate = useNavigate()
	return (
		<>
			<img src={movie.backdrop_path} alt='img' />
		
		<div className='hero__movie-descr'>
			<h2>{movie.name}</h2>	
			<p>{movie.description}</p>
		  <button 
		  className='btn btn-light'
		   onClick={() => navigate(`/movie/${movie.id}`)}
		   >
			Details
		  </button>
		</div>
		</>
	)
	}
