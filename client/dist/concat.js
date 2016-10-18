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
    return {
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
mainApp.controller('loginController',function($scope, $rootScope, $location,userSrv){
	console.log("this is the login    Controller");

	$scope.user = {name:'', password:''};
	$rootScope.showCarousel = false;
	//show message
	$scope.showModal = function(){
		if(	$scope.show == true){
			$scope.show = false ;
		} else {
			$scope.show = true ;
		}
	}
	//check whether the username is valid 
	$scope.isValidName = function(){
		var userReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{5,20}$/);
		if(userReg.test($scope.user.name)){
			return true;
		} else {
			return false;
		}
	}
	//check whether the password is valid 
	$scope.isValidPassword = function(){
		var passwordReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{8,20}$/);
		if(passwordReg.test($scope.user.password)){
			return true;
		} else {
			return false;
		}
	 }
	//Checks if the data is valid
		$scope.isValid = function(){
			if($scope.isValidName() && $scope.isValidPassword()){
				return false;
			} else {
					return true;
			}
		}
	  //login function
		 $scope.login = function(){
			 if (!$scope.isValid()) {
					userSrv.userLogin($scope.user).then(function(response){
						if(response.data == "Logged!"){
				        	console.log("probe when logged")
							$location.path('/main');
					
				        } else if(response.data == "No such user!") {
				        		$scope.showModal();
				        		console.log("probe when NOT logged");
				        }
				   })
			 }
		 }	
	})
var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require('./../db.js');

var _makeTree = function(options) {
    var children, e, id, o, pid, temp, _i, _len, _ref;
    id = options.id || "id";
    pid = options.parentid || "parentid";
    children = options.children || "children";
    temp = {};
    o = [];
    _ref = options.q;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        e[children] = [];
        temp[e[id]] = e;
        e.data = e.id;
        if (temp[e[pid]] != null) {
            temp[e[pid]][children].push(e);
        } else {
            o.push(e);
        }
    }
    return o;
};


router.get('/', function(req, res) {
    if (!req.session.isLogged) {
        res.sendStatus(401);
        return;
    }
    db.query('(SELECT id, parentid, name FROM folders WHERE user = ?) UNION(SELECT  CONCAT("file",id) as fileID,parentid, name FROM files WHERE user = ?)', [req.session.user, req.session.user],
        function(err, results, query) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            var tree = _makeTree({
                q: results
            });
            res.send(tree)
        })
})
router.post('/', function(req, res) {
    //Checking if the old passs is correct and changing it
    if (req.body.oldPassword) {
        db.query('SELECT * FROM users WHERE username = ? AND password = ?', [req.session.user, req.body.oldPassword], function(err, results, query) {
            if (!err) {
                if (results.length) {
                    db.query('UPDATE users SET password = ? WHERE username = ?', [req.body.password, req.session.user], function(err, results, query) {
                        if (!err) {
                            res.send({
                                legit: true
                            })
                        }
                    })
                    return;
                }
                res.send({
                    legit: false
                })
            }
        })
    }

    //Adding folder names to DB
    if (req.body.name) {
        var folderInfo = {
            name: req.body.name,
            user: req.session.user,
            parentid: req.body.currentfolder
        }
        db.query('INSERT INTO folders SET ?', folderInfo, function(err, results, query) {
            if (err) {
                console.log(err);
            }
            if (!err) {
                db.query('(SELECT id, parentid, name FROM folders WHERE user = ?) UNION(SELECT  CONCAT("file",id) as fileID,parentid, name FROM files WHERE user = ?)', [req.session.user, req.session.user],
                    function(err, results, query) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }

                        var tree = _makeTree({
                            q: results
                        });

                        res.send(tree)
                    })
            }
        });
    }
    //File stuff
    if (req.file) {

        // Renaming the uploaded file
        var smth = req.file.originalname.split('.');
        var ext = smth.pop()
        var filePath = './uploads/' + req.file.filename;
        fs.rename(filePath, filePath + '.' + ext)
            // Adding the files to the DB
        filenfo = {
            name: req.file.originalname,
            user: req.session.user,
            path: req.file.path + '.' + ext,
            parentid: req.body.parentidfile

        }
        db.query('INSERT INTO files SET ?', filenfo)
        db.query('(SELECT id, parentid, name FROM folders WHERE user = ?) UNION(SELECT  CONCAT("file",id) as fileID,parentid, name FROM files WHERE user = ?)', [req.session.user, req.session.user],
            function(err, results, query) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                var tree = _makeTree({
                    q: results
                });

                res.send(tree)
            })

    }
});

module.exports = router;

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
mainApp.controller('editController', function($rootScope, $scope, $location,$window,$interval , userSrv) {
	console.log("this is the edit Controller");

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
            userSrv.userCheckpw($scope.info).then(function(response){
            	if(response.data.legit == false){
            		$scope.showErr = true;
            	}
            	
            	if(response.data.legit ==  true){
            		
            		 var absUrl = $location.absUrl();
                     var absUrlSplitted = absUrl.split('/');
                     console.log(absUrlSplitted);
                     absUrlSplitted = absUrlSplitted.splice(0, absUrlSplitted.length - 1).join('/').toString();
                     $scope.show = true;
                  //show time remain
                     $interval(function () {
                    	 $scope.iterator--;
                    	 if($scope.iterator == 0){
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