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
            },
            'logout': {
                url: '/api/logout',
                method: 'POST'
            },
            'loginWithGoogle': {
                url: '/auth/google',
                method: 'GET',
                isArray: false
            },
            'getPublicProfile': {
                url: '/api/users',
                params: {
                    username: "@username"
                },
                method: 'POST'
            }

        });
    }
})();
