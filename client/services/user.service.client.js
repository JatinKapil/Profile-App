(function() {
    angular
        .module('profileApp')
        .factory('UserService', UserService);

    function UserService($http, $resource) {

        return $resource('/api/user/:userId', {
            userId: "@id"
        }, {
            'query': {
                method: 'GET',
                isArray: false
            },
            'update': {
                method: 'PUT'
            }

        });

    }
})();
