//? Класс с запросами для отрисовки карт и получения информации профиля.
class CardApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _checkResponse(res) {
    if (res) {
      return res.json()
    } return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers:
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse)
  }

  setInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers:
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    }).then(this._checkResponse)
  }

  getStartCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers:
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse)
  }

  postCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers:
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._checkResponse)
  }

  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers:
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse)
  }

  setAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers:
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._checkResponse)
  }

  activeLike(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers:
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse)
  }


  deactiveLike(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers:
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse)
  }
}
const cardApi = new CardApi({baseUrl: 'https://api.foxkiss.students.nomoredomains.xyz'})

export default cardApi