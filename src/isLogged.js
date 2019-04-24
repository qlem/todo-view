const isLoggedIn = function (AuthService) {
    return new Promise((resolve, reject) => {
        if (AuthService.isLoggedIn()) {
            resolve()
        } else {
            reject()
        }
    })
}

export default isLoggedIn
