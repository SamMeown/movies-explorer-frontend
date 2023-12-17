class MainApi {
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

  _getStoredToken() {
    return localStorage.getItem('token');
  }

  _headers_with_token(token) {
    const headers = {
      ...this._base_headers
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  _headers() {
    return this._headers_with_token(this._getStoredToken());
  }

  getMovies() {
    return fetch(`${this._base_url}/movies`, {
      headers: this._headers()
    }).then(MainApi._handleResponse);
  }

  addMovie(data) {
    return fetch(`${this._base_url}/movies`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify(data)
    }).then(MainApi._handleResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${this._base_url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers()
    }).then(MainApi._handleResponse);
  }

  getUserInfo() {
    return this.getUserInfoForToken(this._getStoredToken());
  }

  getUserInfoForToken(token) {
    return fetch(`${this._base_url}/users/me`, {
      headers: this._headers_with_token(token)
    }).then(MainApi._handleResponse);
  }

  updateUserInfo(info) {
    return fetch(`${this._base_url}/users/me`, {
      method: 'PATCH',
      headers: this._headers(),
      body: JSON.stringify(info)
    }).then(MainApi._handleResponse);
  }

  signin(email, password) {
    return fetch(`${this._base_url}/signin`, {
      method: 'POST',
      headers: this._base_headers,
      body: JSON.stringify({email, password})
    })
    .then(MainApi._handleResponse)
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }
    });
  }

  signup(name, email, password) {
    return fetch(`${this._base_url}/signup`, {
      method: 'POST',
      headers: this._base_headers,
      body: JSON.stringify({name, email, password})
    }).then(MainApi._handleResponse);
  }
}

const mainApi = new MainApi('https://api.moviesex.nomoredomainsrocks.ru', {
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;
