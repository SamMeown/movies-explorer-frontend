class MoviesApi {
  constructor(url, { headers }) {
    this._base_url = url;
    this._base_headers = headers;
  }

  static _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  }

  getMovies() {
    return fetch(`${this._base_url}/beatfilm-movies`, {
      headers: this._base_headers
    }).then(MoviesApi._handleResponse);
  }
}

const moviesApi = new MoviesApi('https://api.nomoreparties.co', {
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi;
