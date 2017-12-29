import {REGISTER_URL, LOGIN_URL} from '../config';

export const userService = {
    login,
    logout,
    register,
    getIsAuth,
    getCurrentUser
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(LOGIN_URL, requestOptions)
        .then(response => {
            return response.json();
        })
        .then(user => {
            if (user && user.tokenInfo) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(REGISTER_URL, requestOptions);
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user.user'));
}

function getIsAuth() {
    return Boolean(localStorage.getItem('user'));
}