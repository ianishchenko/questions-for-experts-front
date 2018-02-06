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

    return fetch(`${process.env.REACT_APP_LOGIN_URL}`, requestOptions)
        .then(response => {
            if(response.status === 401){
                return Promise.reject(false)
            }
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
    return fetch(`${process.env.REACT_APP_LOGOUT_URL}`);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${process.env.REACT_APP_REGISTER_URL}`, requestOptions);
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))['user'];
}

function getIsAuth() {
    return Boolean(localStorage.getItem('user'));
}