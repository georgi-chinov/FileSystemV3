/**
 *
 */
var mainApp = angular.module('mainModule', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngMessages', 'angularFileUpload', 'angularBootstrapNavTree'])
    //routing
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: './app/routes/home/home.html',
                controller: 'homeController'
            })
            .when('/login', {
                templateUrl: './app/routes/login/login.html',
                controller: 'loginController'
            })
            .when('/register', {
                templateUrl: './app/routes/register/register.html',
                controller: 'registerController'
            })
            .when('/email', {
                templateUrl: './app/routes/email/email.html',
                controller: 'emailController'
            })
            .when('/main', {
                templateUrl: './app/routes/main/main.html',
                controller: 'mainpageController'
            })
            .when('/main/edit', {
                templateUrl: './app/routes/main/edit/editProfile.html',
                controller: 'editController'
            })

    })
    //this is the main controller with nested scopes in it
    .controller('MainController', function($scope, $location, userSrv) {
        console.log("this is the main Controller");

    })

.controller('CollapseDemoCtrl', function($rootScope, $scope) {
    console.log("this is the Controller");

    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;

    $scope.isActive = function() {
        if (!$scope.isAct) {
            $scope.isAct = true;
        } else {
            $scope.isAct = false;
        }
    }

    $rootScope.showCarousel = true;


})

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

mainApp.factory('userSrv', function($http, $location) {
    var baseUrl = 'http://localhost:3000/';
    var temp = '';
    return {
        setUser: function(user) {
            temp = user;
        },
        getUser: function() {
            return temp;
        },
        lostEmail: function(lostmail) {
            return $http.post(baseUrl + 'lostpassword', lostmail);
        },
        userRegister: function(user) {
            return $http.post(baseUrl + 'register', user);
        },
        userLogin: function(user) {
            return $http.post(baseUrl + 'login', user, {
                withCredentials: true
            })
        },
        userInformation: function() {
            return $http.get('http://localhost:3000/main', {
                withCredentials: true
            })
        },
        userLogout: function() {
            return $http.get('http://localhost:3000/logout', {
                withCredentials: true
            })
        },
        userCheckpw: function(password) {
            return $http.post('http://localhost:3000/main', password, {
                withCredentials: true
            })
        },
        userChangepw: function(password) {
            return $http.post('http://localhost:3000/main', password, {
                withCredentials: true
            })
        }

    };
});

mainApp.directive('fileModel', ['$parse',function($parse){
	return{
		restricted : "A",
		link: function(scope , element , attrs){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;
			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope,element[0].files[0]);
				})
			})
		}
	}
}])
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

mainApp.service("TreeService", ["$http", "URLConfig", function ($http, URLConfig) {
    this.getTree = function () {
        return $http.get(URLConfig.tree);
    };
}]);
/**
 * 
 */

mainApp.controller('emailController' , function($rootScope, $scope, $http, $httpParamSerializerJQLike, userSrv, $location){
	console.log("this is the emailController");
	$scope.lostmail =  {to: ''};
	$rootScope.showCarousel = false;
    $scope.show = false;
    $scope.showWrong = false;

	 //check whether the email is valid
	$scope.isValidEmail = function(){
		var emailReg = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
		if(emailReg.test($scope.lostmail.to)){
			return true;
		} else {
			return false;
		}
	}
	//submitting form
	$scope.submitForm = function() {
		if ($scope.lostmail.to) {
			userSrv.lostEmail($scope.lostmail).then(function(response){
				console.log(response);
		        if(response.data == "sent"){
		            $scope.showWrong = false;
		        	$scope.show = true;
		        	console.log("probe when email sent");
		        
		        	} else if(response.data == "Wrong email!") {
		        		 $scope.show = false;
		        		 $scope.showWrong = true;
		        		 console.log("probe when NOT sent an email");
		        	}
			})
		}
	};

})
/**
 * 
 */
mainApp.controller('homeController' , function($rootScope,$scope){
	console.log("this is the home Controller");

	$rootScope.showCarousel = false;
})
/**
 *
 */
mainApp.controller('loginController', function($scope, $rootScope, $location, userSrv) {
    console.log("this is the login    Controller");

    $scope.user = {
        name: '',
        password: ''
    };

    $rootScope.showCarousel = false;
    //show message
    $scope.showModal = function() {
            if ($scope.show == true) {
                $scope.show = false;
            } else {
                $scope.show = true;
            }
        }
        //check whether the username is valid
    $scope.isValidName = function() {
            var userReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{5,20}$/);
            if (userReg.test($scope.user.name)) {
                return true;
            } else {
                return false;
            }
        }
        //check whether the password is valid
    $scope.isValidPassword = function() {
            var passwordReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{8,20}$/);
            if (passwordReg.test($scope.user.password)) {
                return true;
            } else {
                return false;
            }
        }
        //Checks if the data is valid
    $scope.isValid = function() {
            if ($scope.isValidName() && $scope.isValidPassword()) {
                return false;
            } else {
                return true;
            }
        }
        //login function
    $scope.login = function() {
        if (!$scope.isValid()) {
            userSrv.userLogin($scope.user).then(function(response) {
                if (response.data == "Logged!") {
                    console.log("probe when logged")
                    userSrv.setUser($scope.user.name)
                    $location.path('/main');

                } else if (response.data == "No such user!") {
                    $scope.showModal();
                    console.log("probe when NOT logged");
                }
            })
        }
    }
})

/**
 *
 */
stuff = [];
mainApp.controller('mainpageController', function($window, $location, $parse, $scope, $http, FileUploader, userSrv, fileSrv, multipartForm, $rootScope) {
    $scope.currentfolder = '';
    $scope.profile = userSrv.getUser();
    $scope.displayImage = false;
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

/**
 * 
 */
mainApp.controller ('registerController',function($rootScope,$scope, userSrv  , $location){
	console.log("this is the register Controller");

	$scope.user = {name:'',password:'' , passRepeated:'' , email:''};
    $rootScope.showCarousel = false;
    
	//show message
	$scope.showModal = function(){
		if(	$scope.show == true){
			$scope.show = false ;
		} else {
			$scope.show = true ;
		}

	}
	
	//validate username
	$scope.isValidName = function(){
		var userReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{5,20}$/);
		if(userReg.test($scope.user.name)){
			return true;
		} else {
			return false;
		}
	}
	//validate password
	$scope.isValidPassword = function(){
		var passwordReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{8,20}$/);
		if(passwordReg.test($scope.user.password)){
			return true;
		} else {
			return false;
		}
	}
	//check if passwords are the same
	$scope.isValidPassword2 = function(){
		if($scope.user.password == $scope.user.passRepeated && $scope.user.passRepeated != ''){
			return true;
		} else {
			return false;
		}
	}
	//check if email is valid
	$scope.isValidEmail = function(){
		var emailReg = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
		if(emailReg.test($scope.user.email)){
			return true;
		} else {
			return false;
		}
	}
	//check whether all the information is valid in order to allow the user to submit info
	$scope.isValid= function(){
		if($scope.isValidName() && $scope.isValidPassword() && $scope.isValidPassword2() && $scope.isValidEmail()){
			return false;
		} else {
			return true;
		}
	}
	//register
	$scope.submitRegisterForm = function(){
		if (!$scope.isValid()) {
			userSrv.userRegister($scope.user).then(function(response){
		        if(response.data == "User registered!"){
		        	console.log("probe when registered")
					$location.path('/login');
			
		        	} else if(response.data == "User exists!") {
		        		$scope.showModal();
		        		console.log("probe when could NOT register");
		        	}
			})
		}
		
	 }
});


/**
 *
 */
mainApp.controller('editController', function($rootScope, $scope, $location, $window, $interval, userSrv) {
    console.log("this is the edit Controller");
    $scope.profile = userSrv.getUser();
    $rootScope.showCarousel = false;
    $rootScope.hide = true;
    $scope.iterator = 5;

    $scope.info = {
        oldPassword: '',
        password: '',
        passRepeated: ''
    };
    //validate old password field
    $scope.isValidOlPassword = function() {
            var passwordReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{8,20}$/);
            if (passwordReg.test($scope.info.oldPassword)) {
                return true;
            } else {
                return false;
            }
        }
        //validate field for password
    $scope.isValidPassword = function() {
            var passwordReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{8,20}$/);
            if (passwordReg.test($scope.info.password)) {
                return true;
            } else {
                return false;
            }
        }
        //check if passwords are the same
    $scope.isValidRepeated = function() {
        if ($scope.info.password == $scope.info.passRepeated && $scope.info.passRepeated != '') {
            return true;
        } else {
            return false;
        }
    }

    //checks whether the info is valid
    $scope.isValidInfo = function() {
            if ($scope.isValidOlPassword() && $scope.isValidPassword() && $scope.isValidRepeated()) {
                return false;
            } else {
                return true;
            }
        }
        //send new password and before that check whether  the old is the current user's password in the db
    $scope.sendNewPass = function() {
        console.log($scope.info);
        if (!$scope.isValidInfo()) {
            userSrv.userCheckpw($scope.info).then(function(response) {
                if (response.data.legit == false) {
                    $scope.showErr = true;
                }

                if (response.data.legit == true) {

                    var absUrl = $location.absUrl();
                    var absUrlSplitted = absUrl.split('/');
                    console.log(absUrlSplitted);
                    absUrlSplitted = absUrlSplitted.splice(0, absUrlSplitted.length - 1).join('/').toString();
                    $scope.show = true;
                    //show time remain
                    $interval(function() {
                        $scope.iterator--;
                        if ($scope.iterator == 0) {
                            $window.location.href = absUrlSplitted;
                        }
                    }, 1000);
                }

            })
        }
    }
})

/**
 * 
 */

mainApp.controller('sharedController', function($scope,$rootScope) {
	console.log("this is the shared Controller");

})