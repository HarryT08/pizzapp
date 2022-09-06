function redirectWithNoLogin() {
    if (sessionStorage.getItem('user') === null) {
        window.location.href = './index';
    }
}

redirectWithNoLogin();