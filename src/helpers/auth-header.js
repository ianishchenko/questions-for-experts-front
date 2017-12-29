const authHeader = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.tokenInfo) {
        return 'Bearer ' + user.tokenInfo.token;
    } else {
        return '';
    }
};

export default authHeader;

