class MovieService  {
  // 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1' \
   _apiBase = 'https://api.themoviedb.org/3'
	_apiLng = "language=en-US"
	_apiKey = "a3a0780fc7fc42db604937ef761762dd"
	_apiImg = "https://image.tmdb.org/t/p/original"

	getResource = async (url) => {
		const response = await fetch(url)

		if(!response.ok) {
			throw new Error(`Could not fetch ${url}, status: ${response.status}`)
		}

		return await response.json()
	}

	getPopularMovies = async () => {
		return this.getResource(`${this._apiBase}/movie/popular?${this._apiLng}&page=1&api_key=${this._apiKey}`)
	}

	getTrandingMovies = async () => {
		return this.getResource(`${this._apiBase}/movie/top_rated?${this._apiLng}&page=1&api_key=${this._apiKey}`)
	}

	getDetailedMovie = async (id) => {
		return this.getResource(`${this._apiBase}/movie/${id}?${this._apiLng}&api_key=${this._apiKey}`)
	}
    getRandomMovie = async () => {
		const res = await this.getPopularMovies()
		const movie = res.results[Math.floor(Math.random() * res.results.length)]
		return this._transformMovie(movie)
	}

	_transformMovie = (movie) => {
		return {
			name: movie.original_title,
			description: movie.overview,
			backdrop_path: `${this._apiImg}${movie.backdrop_path}`,
			poster_path: `${this._apiImg}${movie.poster_path}`,
			id: movie.id,
		}
	}
}

export default MovieService