(function() {

    angular.module('profileApp')
        .controller('LoginController', LoginController);

    function LoginController($scope, $location, UserService, $state) {


        $scope.login = function(username, password) {
            UserService.query({
                'username': username,
                'password': password
            }, function(user) {
                console.log(user);
                if (user._id) {
                    $state.transitionTo('users', {
                        userId: user._id
                    });
                } else {
                    $scope.error = "User not found";
                }
            });

        };
    }



})();
