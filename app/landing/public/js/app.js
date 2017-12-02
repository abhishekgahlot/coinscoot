const app = angular.module('myApp', []);

let config = { headers: { 'Content-Type': 'application/json' } }

app.controller('loginForm', function($scope, $http, $window) {
    $scope.master = {email:"", password:""};
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
    $scope.reset();
    $scope.submitSigninForm = function () {
        $http.post('/signin', { email:$scope.user.email, password:$scope.user.password }, config)
            .then(result => {
                if (result.data.auth) {
                    $window.location.href = '/app';
                }
            })
            .catch(err=>{
            	console.log(err);
            });
    };

});

app.controller('signupForm', function($scope, $http, $window) {
    $scope.master = {fullName:"", email:"", password:"", aadhar:"", otp:""};
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
    $scope.submitSignupForm = function () {
        $http.post('/signup', { fullName: $scope.user.fullName,
                                email: $scope.user.email,
                                password: $scope.user.password,
                                aadhar: $scope.user.aadhar,
                                otp: $scope.user.otp
                            }, config)
	        .then(result => {
                if (result.data.auth) {
                    $window.location.href = '/app';
                }
	        })
	        .catch(err=>{
	        	console.log(err);
	        });
    };
    $scope.reset();
});