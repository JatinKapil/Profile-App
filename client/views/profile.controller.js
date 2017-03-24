(function() {
    angular.module('profileApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $stateParams, $timeout, Upload, UserService) {

        $scope.updateUser = updateUser;
        $scope.uploadFiles = uploadFiles;
        $scope.editing = false;
        $scope.userId = $stateParams.userId;

        function init() {
            UserService.get({
                userId: $scope.userId
            }, function(user) {
                if (user) {
                    $scope.user = user;
                } else {
                    $scope.error = "User not found";
                }
            });
        }
        init();

        $scope.toggle = function() {
            $scope.editing = !$scope.editing;
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

                file.upload.then(function(response) {
                    $timeout(function() {
                        file.result = response.data;

                    });
                }, function(response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                });
            }
            init();
        }
    }
})();
