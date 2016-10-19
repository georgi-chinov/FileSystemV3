/**
 *
 */
stuff = [];
mainApp.controller('mainpageController', function($window, $location, $parse, $scope, $http, FileUploader, userSrv, fileSrv, multipartForm, $rootScope) {
    $scope.currentfolder = '';
    $scope.profile = userSrv.getUser();
    $scope.showImage = true;
    $scope.uploader = new FileUploader();
    //user info + loading user information
    $scope.getnfo = function() {
            return stuff;
        }
        //function to display files
    function displayFile(resp) {
        $('.rightMain').empty();
        var arrLength = resp.length;
        for (var i = 0; i < arrLength; i++) {
            //Bricks
            var name = resp[i].name;
            var p = $('<p></p>').text(name);
            p.addClass('icon');
            var frame = $('<div></div>').addClass('middleIconFrame');
            var icon = $('<div></div>').addClass('middleIcon fa fa-folder fa-3x');

            //Extras
            frame.append(icon);
            frame.append(p);
            frame.attr('id', i);
            frame.attr('format', resp[i].format);
            frame.attr('extention', resp[i].extention);
            frame.attr('actualID', resp[i].id)
            if (resp[i].format == 'file' && resp[i].extention == 'jpg') {
                frame.attr('link', resp[i].path)
            }
            //Icons
            if (frame.attr('format') == 'folder') {
                icon.attr('class', 'middleIcon fa fa-folder fa-3x');
            }

            switch (frame.attr('extention')) {
                case 'jpg':
                    icon.attr("class", 'middleIcon fa fa-file-image-o fa-3x')
                    break;
                case 'txt':
                    icon.attr("class", 'middleIcon fa fa-file-text-o fa-3x')
                    break;
                case 'exe':
                    icon.attr("class", 'middleIcon fa fa-file-o fa-3x')
                    break;
            }

            $('.rightMain').append(frame);
            $(frame).click(function() {
                if ($(this).attr('format') == 'file' && $(this).attr('extention') == 'jpg') {}

                displayFile(resp[this.id].children);
            })
        }
    }
    //file stuff receiving and displaying
    userSrv.userInformation()
        .then(function(response) {
            if (response.status == 200) {
                //some logic here

                stuff = response.data;
                $scope.my_tree_handler = function(branch) {
                    $scope.currentfolder = branch.data.id;
                    displayFile(branch.children);


                    // displayFile(resp[this.id].children);
                }
                $scope.treetotheleft = response.data
                displayFile(response.data)

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
                displayFile(response.data)

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
                    displayFile(response.data)

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
        1
        if ($scope.visibleFileForm == true) {
            $scope.visibleFileForm = false;
        }
    }
    $scope.hideForm = function() {
        if ($scope.visible == true) {
            $scope.visible = false;
        }
    }
    $scope.displayTheImage = function() {
        if ($scope.showImage == false) {
            $scope.showImage = true;
        }

    }
})
