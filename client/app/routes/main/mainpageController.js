/**
 *
 */
stuff = [];
mainApp.controller('mainpageController', function($window, $location, $parse, $scope, $http, FileUploader, userSrv, fileSrv, multipartForm, $rootScope) {
    console.log("this is the main Controller");
    $scope.currentfolder = '';
    var _renderTree = function(tree) {
        var e, html, _i, _len;
        zs
        html = "<ul>";
        for (_i = 0, _len = tree.length; _i < _len; _i++) {
            e = tree[_i];
            html += "<li>" + e.name;
            if (e.children != null) {
                html += _renderTree(e.children);
            }
            html += "</li>";
        }
        html += "</ul>";
        return html;
    };
    var _renderTreetoBody = function(tree) {
        var e, html, _i, _len;
        html = "<div>";
        for (_i = 0, _len = tree.length; _i < _len; _i++) {
            e = tree[_i];
            html += "<p>" + e.name;
            if (e.children != null) {
                html += _renderTreetoBody(e.children);
            }
            html += "</p>";
        }
        html += "</div>";
        return html;
    };
    //user info + loading user information
    $scope.getnfo = function() {
        return stuff;
    }
    userSrv.userInformation()
        .then(function(response) {
            if (response.status == 200) {
                //some logic here
                stuff = response.data;
                $scope.my_tree_handler = function(branch) {
                    $scope.currentfolder = branch.data;
                    console.log(branch.data);
                }
                $scope.treetotheleft = response.data

            }
        }, function(response) {
            var absUrl = $location.absUrl();
            var absUrlSplitted = absUrl.split('/');
            console.log(absUrlSplitted);
            absUrlSplitted = absUrlSplitted.splice(0, absUrlSplitted.length - 1).join('/').toString();
            $window.location.href = absUrlSplitted;
            console.log(absUrlSplitted);
        })
    console.log($scope.treetotheleft);
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
    $scope.Submit = function() {
        var uploadUrl = 'http://localhost:3000/main';
        multipartForm.post(uploadUrl, $scope.customer);
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
            console.log($scope.folder);
            $scope.folder.currentfolder = $scope.currentfolder;
            console.log($scope.currentfolder);
            fileSrv.sendFolderName($scope.folder).then(function(response) {
                if (response.status == 200) {
                    //some logic here
                    stuff = response.data;
                    $scope.my_tree_handler = function(branch) {
                        $scope.currentfolder = branch.data;
                        console.log(branch.data);
                    }
                    $scope.treetotheleft = response.data

                    $scope.visible = false;
                }
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
