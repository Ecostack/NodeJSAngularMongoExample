var MeetingsApp = angular.module('MeetingsApp',[]);

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

MeetingsApp.controller('UpcomingController', ['$scope', '$http', function ($scope, $http) {

    $scope.upcoming = [];

    $scope.getUpcomingMeetings = function () {
        $http.get('/meetings/upcoming')
            .success(function (data) {

                $scope.upcoming = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.getUpcomingMeetings();
}]);

MeetingsApp.controller('AverageAmountController', ['$scope', '$http', function ($scope, $http) {

    $scope.averageamount = 0;

    $scope.getAverageAmountForUpcomingMeetings = function () {
        $http.get('/meetings/averageAmountUpcoming')
            .success(function (data) {

                $scope.averageamount = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.getAverageAmountForUpcomingMeetings();
}]);

MeetingsApp.controller('NextDateForPersonController', ['$scope', '$http', function ($scope, $http) {

    $scope.datesOfPersons = [];

    $scope.getNextDateForPerson = function () {
        $http.get('/meetings/nextDateForPerson')
            .success(function (data) {

                $scope.datesOfPersons = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.getNextDateForPerson();
}]);


MeetingsApp.controller('GenerateMeetingsController', ['$scope', '$http', function ($scope, $http) {

    $scope.processText ="";

    $scope.generateMeetings = function () {
        $scope.processText ="";
        $http.post('/meetings/generateMeetings', {topic: $scope.topic})
            .success(function (data) {
                $scope.topic = ""; // clear the form so our user is ready to enter another

                $scope.processText ="sucessfull inserted";
                console.log(data);
            })
            .error(function (data) {
                $scope.processText ="Error happend, please take a look into the console";
                console.log('Error: ' + JSON.stringify(data));
            });
    };
}]);


MeetingsApp.controller('MainController', ['$scope', '$http', function ($scope, $http) {

}]);