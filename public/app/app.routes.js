angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

	$routeProvider

		.when('/main', {

			templateUrl: 'app/views/pages/home.html',
			controller: 'MainController',
			controllerAs: 'main'

		})

		.when('/login', {

			templateUrl: 'app/views/pages/login.html'
		})

		.when('/signup', {

			templateUrl: 'app/views/pages/signup.html'
		})

		.when('/', {

			templateUrl: 'app/views/pages/project.html',
			controller: 'MainController',
			controllerAs: 'main'
			

		})

	$locationProvider.html5Mode(true);
})