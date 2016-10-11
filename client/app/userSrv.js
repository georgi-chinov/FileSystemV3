mainApp.factory('userSrv', function ($http , $location) {
	var baseUrl = 'http://localhost:3000/';
    return {
        lostEmail: function (lostmail) {
            return $http.post(baseUrl + 'lostpassword', lostmail);
        },
        userRegister: function (user) {
        	
        	return $http.post(baseUrl + 'register', user);
        
        },
        userLogin: function (user) {
        	
        	return $http.post(baseUrl + 'login', user)
        
        },
        
    };
});