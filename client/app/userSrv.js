mainApp.factory('userSrv', function ($http , $location) {
	var baseUrl = 'http://localhost:3000/';
    return {
        lostEmail: function (lostmail) {
            return $http.post(baseUrl + 'lostpassword', lostmail).then(successCallback);
            
            function successCallback(response) {
            	console.log(response);
            }
        
        },
        userRegister: function (user) {
        	return $http.post(baseUrl + 'register', user).then(successCallback);
            
            function successCallback(response) {
            	if(response.data == 'User registered!'){
            		console.log("Success");
            		$location.path('/login');
            		return;
            	} 
            		console.log("Fail!");
            		alert('Error!');
            }
            
        },
        userLogin: function (user) {
        	return $http.post(baseUrl + 'login', user)
        }
    };
});