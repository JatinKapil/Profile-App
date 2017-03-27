angular.module('profileApp', ['ui.router', 'ngResource', 'ngFileUpload'])

    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {


        //  $http.defaults.headers.common.Authorization = 'Basic AIzaSyBi73F0yI9HSBrNITxr5r-tXedTGIc01fs';
        //  $http.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';

        /*    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $httpProvider.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
            $httpProvider.defaults.headers.common.Authorization = 'Bearer AIzaSyBi73F0yI9HSBrNITxr5r-tXedTGIc01fs';
            //AIzaSyBi73F0yI9HSBrNITxr5r-tXedTGIc01fs

        */
        $urlRouterProvider.otherwise('/home');

        $stateProvider

            // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/home',
                templateUrl: 'views/partial-home.html',
                controller: 'HomeController'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.view.html',
                controller: 'LoginController'
            })
            .state('users', {
                url: '/user/:userId',
                templateUrl: 'views/profile.view.html',
                controller: 'ProfileController',
                resolve: {
                    loggedin: function($http, $rootScope, $state, $q) {
                        var deffered = $q.defer();
                        $http.get('/api/loggedin')
                            .success(function(user) {
                                if (user != '0') {
                                    $rootScope.currentUser = user;
                                    deffered.resolve();
                                } else {
                                    $rootScope.currentUser = null;
                                    deffered.reject();
                                    $state.transitionTo('home');
                                }
                            });
                        return deffered.promise;
                    }
                }
            })
            .state('public', {
                url: '/users/:username',
                templateUrl: 'views/public-profile.view.html',
                controller: 'PublicProfileController',
                params: {
                    userObject: null
                }
            });

    });
