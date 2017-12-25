const app = angular.module('myApp', [], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

let config = { headers: { 'Content-Type': 'application/json' } }

app.controller('loginForm', function($scope, $http, $window) {
    $scope.master = {email:"", password:"", loginError: false, loginErrorMsg: ""};
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
    $scope.reset();
    $scope.submitSigninForm = function () {
        $http.post('/signin', { email:$scope.user.email, password:$scope.user.password }, config)
            .then(result => {
                if (result.data.auth) {
                    $window.location.href = '/app';
                } else {
                    $scope.user.loginError = true
                    $scope.user.loginErrorMsg = result.data.err
                    console.log(result.data.err)
                }
            })
            .catch(err=>{
                console.log(err);
            });
    };

});

app.controller('signupForm', function($scope, $http, $window) {
    $scope.master = {fullName:"", email:"", password:"", aadhar:"", otp:"", success:"", response:""};
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
    $scope.submitSignupForm = function () {
        var data = {
            fullName: $scope.user.fullName,
            email: $scope.user.email,
            password: $scope.user.password,
            aadhar: $scope.user.aadhar,
            otp: $scope.user.otp
        }
        $http.post('/signup', data, config)
	        .then(result => {
                console.log(result)
                if (result.data.success) {
                    $scope.user.success = true
                    $scope.user.response = result.data.message
                } else {
                    $scope.user.success = false
                    $scope.user.response = result.data.err
                }
	        })
	        .catch(err=>{
	        	console.log(err);
	        });
    };
    $scope.reset();
});