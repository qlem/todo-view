const isLoggedIn = function ($location, AuthService) {
    return new Promise((resolve, reject) => {
        if (AuthService.isLoggedIn()) {
            resolve()
        } else {
            $location.path('/login')
            reject()
        }
    })
}

export default isLoggedIn
