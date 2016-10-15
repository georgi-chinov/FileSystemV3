/**
 *
 */
mainApp.factory('fileSrv', function($http, $location) {
    var baseUrl = 'http://localhost:3000/';
    return {
        sendFolderName: function(folder) {
            return $http.post('http://localhost:3000/main', folder, {
                withCredentials: true
            });
        },
        uploadFile: function(files, success, error) {

            var fd = new FormData();

            angular.forEach(files, function(file) {
                fd.append('file', file);
            });

            //sample data
            var data = {
                name: name,
                type: type
            };

            fd.append("data", JSON.stringify(data));

            $http.post(baseUrl + 'main', fd, {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity,
                    withCredentials: true
                })
                .success(function(data) {
                    console.log(data);
                })
                .error(function(data) {
                    console.log(data);
                });
        },
    };

});
