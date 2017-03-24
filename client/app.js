angular.module('profileApp', ['ui.router', 'ngResource', 'ngFileUpload'])

    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider

            // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/home',
                templateUrl: 'partial-home.html'
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
                /*resolve: {
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
                }*/
            });


    });
