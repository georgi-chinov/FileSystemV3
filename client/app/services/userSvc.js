/**
 * 
 */

mainApp.factory('userSvc', function($http) {
	var baseUrl="http://localhost:3000";
	
	
	return {
		sendLoginData: function() {
			return $http.post(baseUrl).then(function(response) {
				return response;
			});
		},
		getUserById: function(id) {
			return users[id];
		},
		addNewUser: function(newUser) {
			return $http.post(baseUrl, {newUser:newUser});
		},
		updateById:function(id, updatedData) {
			users[id] = updatedData;
		}
	}
});
