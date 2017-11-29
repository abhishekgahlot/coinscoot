const app = angular.module('myApp', []);

let config = { headers: { 'Content-Type': 'application/json' } }

app.controller('loginForm', function($scope, $http) {
    $scope.master = {email:"", password:""};
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
    $scope.reset();
    $scope.submitSigninForm = function () {
        $http.post('/signin', { email:$scope.user.email, password:$scope.user.password }, config)
            .then(result => {
            	console.log(result);
            })
            .catch(err=>{
            	console.log(err);
            });
    };

});

app.controller('signupForm', function($scope, $http) {
    $scope.master = {fullname:"", email:"", password:""};
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
    $scope.submitSignupForm = function () {
        $http.post('/signup', { user:$scope.user }, config)
	        .then(result => {
	        	console.log(result);
	        })
	        .catch(err=>{
	        	console.log(err);
	        });
    };
    $scope.reset();
});