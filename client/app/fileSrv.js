/**
 * 
 */
mainApp.factory('fileSrv', function ($http , $location) {
	var baseUrl = 'http://localhost:3000/';
    return {
       sendFolderName: function (folder) {
            return $http.post(baseUrl + 'main', folder);
        }
    };
});