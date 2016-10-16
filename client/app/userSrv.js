mainApp.factory('userSrv', function($http, $location) {
    var baseUrl = 'http://localhost:3000/';
    return {
        lostEmail: function(lostmail) {
            return $http.post(baseUrl + 'lostpassword', lostmail);
        },
        userRegister: function(user) {
            return $http.post(baseUrl + 'register', user);
        },
        userLogin: function(user) {
            return $http.post(baseUrl + 'login', user, {
                withCredentials: true
            })
        },
        userInformation: function() {
            return $http.get('http://localhost:3000/main', {
                withCredentials: true
            })
        },
        userLogout: function() {
            return $http.get('http://localhost:3000/logout', {
                withCredentials: true
            })
        },
        userCheckpw: function(password) {
            return $http.post('http://localhost:3000/main', password, {
                withCredentials: true
            })
        },
        userChangepw: function(password) {
            return $http.post('http://localhost:3000/main', password, {
                withCredentials: true
            })
        }

    };
});
