mainApp.factory('userSrv', function ($http) {
	var baseUrl = 'http://localhost:3000/';
    return {
        lostEmail: function (lostmail) {
            console.log(lostmail);
            return $http.post(baseUrl + 'lostpassword', lostmail)
            /*$http({
			    method: "post",
			    url: 'http://localhost:3000/',
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    data: $httpParamSerializerJQLike(data)
			})*/
        }
    };
});