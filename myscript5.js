/**
 * Created by Dell on 9/18/17.
 */
var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/emp", {
            templateUrl : "employee.html"
        })
        .when("/add", {
            templateUrl : "signup.html",
            controller : "addCtrl"
        })
        /*.when("/edit", {
            templateUrl : "edit.html",
            controller : "editCtrl"
        })*/
        .when("/login", {
            templateUrl : "login.html",
            controller : "loginCtrl"
        });
});

app.service("dataService",function ($http) {
    this.myFun = function() {
        return $http.get("MOCK_DATA.JSON");
    };
    this.temp = null;
    this.object = {};
});
app.controller("empCtrl", function ($scope,dataService,$location) {
    dataService.myFun().then(function (response) {
        $scope.myData = response.data.myData;
        dataService.object = $scope.myData;
    });
    $scope.removeInput = function (index) {
        dataService.object.splice(index, 1);
    };
    $scope.add = function () {
        $location.path('/add');
        dataService.temp  = null;
    };
    $scope.editInput = function (index) {
        dataService.temp = index;
        $location.path('/add');
    };
});
app.controller("addCtrl", function ($scope,$location,dataService) {
    $scope.msg = "Welcome";
    $scope.user={};
    /*$scope.user={};*/
    $scope.user = dataService.object[dataService.temp];

        if (!dataService.temp) {
            $scope.addInput = function() {
                $location.path('/emp');
                dataService.object.push($scope.user);
                $scope.user = "";
            }
        }
        else {
            $scope.addInput = function () {
                dataService.object[dataService.temp] = $scope.user;
                $location.path("/emp");
            }
        }
    /*$scope.addInput = function() {
        $scope.myData.push( {
            'id' : $scope.empid ,
            'gender' : $scope.gen,
            'name' : $scope.nam,
            'email' : $scope.eml,
            'city' : $scope.ct
        });
        $scope.empid ="";
        $scope.gen = "";
        $scope.nam = "";
        $scope.eml = "";
        $scope.ct = "";
    };*/
});
/*app.controller("editCtrl", function ($scope,$location,dataService) {
    $scope.msg = "Update Details";
    $scope.user = dataService.object[dataService.temp];
    $scope.updateInput = function () {
        dataService.object[dataService.temp] = $scope.user;
        $location.path("/emp");
    };
});*/
app.controller("loginCtrl", function ($scope,$location, dataService) {
    $scope.new = {};
    $scope.loginInput = function () {

        for ( i = 0; i < $scope.myData.length ; i++){

            if ( angular.equals($scope.new.name , $scope.myData[i].name)  &&
                angular.equals($scope.new.email , $scope.myData[i].email) ){

                $scope.store = $scope.new;

            }

        }
        if ( $scope.store){

            $location.path("/emp");
        }
        else {

            alert("Invalid Data!");
        }

    };
});

/*app.controller('myCtrl1', function($scope,dataService,$location) {

 dataService.myFun().then(function (response) {
 $scope.myData = response.data.myData;
 });
 $scope.removeInput = function (index) {
 $scope.myData.splice(index,1);
 };
 $scope.editInput= function (index) {
 dataService.temp = index;
 $location.path('/edit');
 };
 /!*dataService.temp2 = $scope.myData.gender;
 dataService.temp3 = $scope.myData.name;
 dataService.temp4 = $scope.myData.email;
 dataService.temp5 = $scope.myData.city;
 *!/
 });*/