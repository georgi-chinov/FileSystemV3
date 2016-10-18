mainApp.service('multipartForm', ['$http', function($http) {
    this.post = function(uploadUrl, data, currentfolder) {
        var fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]);
            fd.append('parentidfile', currentfolder)
            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                },
                withCredentials: true
            })
        }
    }
}])
