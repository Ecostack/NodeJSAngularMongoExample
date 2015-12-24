var MeetingsApp = angular.module('MeetingsApp', ['ngRoute']);

//MeetingsApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
//    $routeProvider
//        .when('/upcoming', {
//            templateUrl: '/partials/upcoming',
//            controller: 'MainController'
//        })
//        .when('/generateMeetings', {
//            templateUrl: '/partials/upcoming',
//            controller:  'MainController'
//        })
//        .otherwise({ redirectTo: '/' });
//    $locationProvider.html5Mode(true);
//}]);

MeetingsApp.controller('TotalCountController', ['$scope', '$http', function ($scope, $http) {
    $scope.topic = "";

    $scope.totalcount = 0;

    $scope.getTotalCount = function () {
        $http.get('/meetings/totalcount')
            .success(function (data) {
                $scope.totalcount = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.getTotalCount();
}]);

MeetingsApp.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    $scope.topic = "";

    // when landing on the page, get all todos and show them
    //$http.get('/meetings')
    //    .success(function (data) {
    //        // $scope.todos = data;
    //        console.log(data);
    //    })
    //    .error(function (data) {
    //        console.log('Error: ' + data);
    //    });

    // when submitting the add form, send the text to the node API
    $scope.generateMeetings = function () {
        $http.post('/meetings/generateMeetings', {topic: $scope.topic})
            .success(function (data) {
                $scope.topic = ""; // clear the form so our user is ready to enter another

                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + JSON.stringify(data));
            });
    };




    $scope.getUpcomingMeetings = function () {
        $http.get('/meetings/upcoming')
            .success(function (data) {

                //$scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.getAverageAmountForUpcomingMeetings = function () {
        $http.get('/meetings/averageAmountUpcoming')
            .success(function (data) {

                //$scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.getNextDateForPerson = function (pName) {
        $http.get('/meetings/nextDateForPerson/' + pName)
            .success(function (data) {

                //$scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    //- Button to insert 5.000 additional meetings with a given topic at random dates with random durations (max 8 hours) and random members out of a list of 10
    //- Show the total amount of meetings in the database
    //- Show the upcoming 5 meetings starting from today, topic, people, date / time
    //- Show the average amount of people in the next 20 meetings
    //- Show the next meeting date of each person
}]);