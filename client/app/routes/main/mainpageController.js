/**
 *
 */
stuff = [];
mainApp.controller('mainpageController', function($window, $location, $parse, $scope, $http, FileUploader, userSrv, fileSrv, multipartForm, $rootScope) {
    $scope.currentfolder = '';
    $scope.uploader = new FileUploader();
    //user info + loading user information
    $scope.getnfo = function() {
            return stuff;
        }
        //function to display files
    function displayFile(resp) {
        var arrLength = resp.length;
        for (var i = 0; i < arrLength; i++) {
            var name = resp[i].name;
            var fileName = $('<span></span>').text(resp[i].name);
            var fileNametwo = $('<p></p>').text(resp[i].name);
            var icon = $('<div></div>').addClass('glyphicon glyphicon-folder');

            $('.rightMain').append(icon);

        }
    }


    //file stuff receiving and displaying
    userSrv.userInformation()
        .then(function(response) {
            if (response.status == 200) {
                //some logic here
                stuff = response.data;
                displayFile(response.data);

                $scope.my_tree_handler = function(branch) {
                    $scope.currentfolder = branch.data.id;
                }
                $scope.treetotheleft = response.data

            }
        }, function(response) {
            var absUrl = $location.absUrl();
            var absUrlSplitted = absUrl.split('/');
            absUrlSplitted = absUrlSplitted.splice(0, absUrlSplitted.length - 1).join('/').toString();
            $window.location.href = absUrlSplitted;

        })

    $scope.uploader = new FileUploader();
    $scope.visible = false;
    $scope.visibleFileForm = false;
    $scope.folder = {
        name: '',
        currentfolder: ''
    };

    $scope.customer = {};
    $rootScope.hide = true;
    $rootScope.showCarousel = false;

    //Uploading the file
    $scope.Submit = function() {
        var uploadUrl = 'http://localhost:3000/main';
        multipartForm.post(uploadUrl, $scope.customer, $scope.currentfolder).then(function(response) {
            if (response.status == 200) {
                //some logic here
                stuff = response.data;
                $scope.my_tree_handler = function(branch) {
                    $scope.currentfolder = branch.data.id;
                }
                $scope.treetotheleft = response.data

            }
            $scope.visibleFileForm = false;
            //logika za greshka!
        })

    }
    $scope.logout = function() {
            userSrv.userLogout().then(function(response) {
                if (response.data && response.data.logout == true) {
                    $location.path('index.html').replace();
                }
            })
        }
        //show the form
    $scope.showForm = function() {
            if ($scope.visible == false) {
                $scope.visible = true;
                $scope.visibleFileForm = false;
            } else {
                $scope.visible = false;
            }
        }
        //get folder name
    $scope.addName = function() {
            $scope.folder.currentfolder = $scope.currentfolder;
            fileSrv.sendFolderName($scope.folder).then(function(response) {
                if (response.status == 200) {
                    //some logic here
                    stuff = response.data;
                    $scope.my_tree_handler = function(branch) {
                        $scope.currentfolder = branch.data.id;
                    }
                    $scope.treetotheleft = response.data

                }
                $scope.visible = false;
                //logika za greshka!
            })

        }
        //add file - form
    $scope.showFileForm = function() {
            if ($scope.visibleFileForm == false) {
                $scope.visibleFileForm = true;
                $scope.visible = false;
            } else {
                $scope.visibleFileForm = false;
            }
        }
        //close forms
    $scope.hideFileForm = function() {
        if ($scope.visibleFileForm == true) {
            $scope.visibleFileForm = false;
        }
    }
    $scope.hideForm = function() {
        if ($scope.visible == true) {
            $scope.visible = false;
        }
    }
})
