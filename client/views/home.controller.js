(function() {

    angular.module('profileApp')
        .controller('HomeController', HomeController);

    function HomeController($scope, UserService, $state, $location, $anchorScroll) {
        function init() {
            $location.hash('upper');
            $anchorScroll();
        }
        init();
        $scope.getPublicProfile = function() {
            UserService.getPublicProfile({
                username: $scope.username
            }, function(user) {
                console.log("ctrl");
                if (user._id) {
                    $scope.error = null;
                    $state.transitionTo('public', {
                        userObject: user
                    });
                } else {
                    $location.hash('error');
                    $anchorScroll();
                    $scope.error = "User not found";
                }
            });
        };
    }
})();
