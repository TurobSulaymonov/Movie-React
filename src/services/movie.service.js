import { useHttp } from "../hooks/use-http"

const useMovieService = () => {
 
	const {request, loading, error, clearError} = useHttp()
	// 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1' \
  
 
  const _apiBase = 'https://api.themoviedb.org/3'
  const _apiLng = "language=en-US"
  const	_apiKey = "a3a0780fc7fc42db604937ef761762dd"
  const	_apiImg = "https://image.tmdb.org/t/p/original"
  const  _apiPage = 1


	const getPopularMovies = async () => {
		return request(`${_apiBase}/movie/popular?${_apiLng}&page=1&api_key=${_apiKey}`)
	}

	const getTrandingMovies = async (page = _apiPage) => {
		const responce = await request(`${_apiBase}/movie/top_rated?${_apiLng}&page=${page}&api_key=${_apiKey}`)
	    const movies = responce.results
        return movies && movies.map(movie => _transformMovie(movie))
    }

	const getDetailedMovie = async (id) => {
		const movie = await request(`${_apiBase}/movie/${id}?${_apiLng}&api_key=${_apiKey}`)
        return  _transformMovie(movie)
	}
  const  getRandomMovie = async () => {
		const res = await getPopularMovies()
		const movie = res.results[Math.floor(Math.random() * res.results.length)]
		return _transformMovie(movie)
	}

	const _transformMovie = (movie) => {
		return {
			name: movie.original_title,
			description: movie.overview,
			backdrop_path: `${_apiImg}${movie.backdrop_path}`,
			poster_path: `${_apiImg}${movie.poster_path}`,
		    id: movie.id,
			release_date: movie.release_date,
			vote_average: movie.vote_average,

		}
	}
	return {
		getTrandingMovies, 
		getRandomMovie, 
		getDetailedMovie,
		clearError,
		loading,
		error
	}
}

export default useMovieService