class Api {
    constructor(apiConfig) {
        this._url = apiConfig.url;
        this._headers = apiConfig.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
                method: 'GET',
                headers: this._headers
            })
            .then(this._checkResponse)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
                method: 'GET',
                headers: this._headers
            })
            .then(this._checkResponse)
    }

    setUserInfo(username, description) {
        return fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: username,
                    about: description
                })
            })
            .then(this._checkResponse)
    }

    addNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(this._checkResponse)
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._url}/cards/likes/${id}`, {
                method: isLiked ? 'PUT' : 'DELETE',
                headers: this._headers
            })
            .then(this._checkResponse);
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._checkResponse);
    }

    addNewAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: avatar.avatar
                })
            })
            .then(this._checkResponse);
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-48',
    headers: {
        authorization: '9e48cf18-b746-4718-9bb6-c10376174994',
        'Content-Type': 'application/json'
    }
});

export default api;