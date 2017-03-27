(function() {
    angular.module('profileApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $stateParams, $timeout, $rootScope, $state, $location, $anchorScroll, Upload, UserService) {

        $scope.updateUser = updateUser;
        $scope.uploadFiles = uploadFiles;
        $scope.editing = false;
        $scope.userId = $stateParams.userId;

        function init() {
            $scope.file = null;
            $scope.errFile = null;
            UserService.get({
                userId: $scope.userId
            }, function(user) {
                if (user) {
                    $scope.user = user;
                } else {
                    $scope.error = "User not found";
                }
            });
            $location.hash('userInfo');
            $anchorScroll();
        }
        init();

        $scope.gotoBottom = function() {
            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash('update');
            $anchorScroll();
        };
        $scope.gotoTop = function() {
            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash('userInfo');
            $anchorScroll();
        };

        $scope.toggle = function() {
            $scope.editing = !$scope.editing;
            if ($scope.editing) $scope.gotoBottom();
            else $scope.gotoTop();
        };

        $scope.logout = function() {
            UserService.logout({
                id: $scope.userId
            }, function(response) {
                console.log(response);
                $rootScope.currentUser = null;
                $state.transitionTo('home');
            });
        };

        function updateUser() {
            UserService.update({
                    id: $scope.userId
                }, $scope.user,
                function(response) {
                    console.log(response);
                    if (response) {
                        $scope.success = "Updated successfully";
                    } else {
                        $scope.error = "Error occured";
                    }
                });
            $scope.editing = false;
        }

        function uploadFiles(file, errFiles) {
            $scope.file = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: '/api/upload',
                    data: {
                        file: file,
                        userId: $scope.userId
                    }
                });
                file.upload
                    .then(
                        function(response) {
                            file.result = response.data;
                        },
                        function(response) {
                            if (response.status > 0)
                                $scope.errorMsg = response.status + ': ' + response.data;
                        });
                init();
            }
            $scope.$apply();
        }
    }
})();
