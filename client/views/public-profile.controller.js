(function() {
    angular.module('profileApp')
        .controller('PublicProfileController', PublicProfileController);

    function PublicProfileController($scope, $stateParams, $state, UserService) {

        $scope.user = $stateParams.userObject;


    }
})();
