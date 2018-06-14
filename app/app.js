(function () {

  var ApiKEY = "<ObatainKEYFROM PIXABAY>";
  var pictureApp = angular.module("AngularTest", []);

  //create a factory "MathService" which provides a method multiply to return multiplication of two numbers
  pictureApp.factory('MathService', function () {
    var factory = {};

    factory.multiply = function (a, b) {
      return a * b
    }

    factory.sub = function (a, b) {
      if (a > b) {
        return a - b
      } else if (a < b) {
        return b - a
      }
    }

    factory.add = function (a, b) {
      return a + b
    }

    factory.modulo = function (a, b) {
      return a % b
    }

    return factory;
  });

  
  //CONTROLLER
  pictureApp.controller("mainCtrl", ["$scope", "$rootScope", "PicService", "CalcService", function ($scope, $rootScope, PicService, CalcService) {
    var vm = this;
    
    $scope.categoryOption = ["all", "fashion", "nature", "backgrounds", "science", "education", "people", "religion", "feelings", "health", "places", "animals", "industry", "food", "computer", "sports", "transportation", "travel", "buildings", "business", "music"];
    $scope.orientationOption = ["all", "horizontal", "vertical"];
    $scope.imageTypeOption = ["all", "photo", "illustration", "vector"];
    
    $scope.category = $scope.categoryOption[0];
    $scope.orientation = $scope.orientationOption[0];
    $scope.imageType = $scope.imageTypeOption[0];
    // $scope.myName = "DR111";
    $rootScope.searchItems = "Yellow Flower";
    $rootScope.SearchURL = "https://pixabay.com/api/?key=" + ApiKEY + "&per_page=100&q=" + encodeURIComponent($rootScope.searchItems) + "&image_type=all&category=" + $rootScope.category;
    $rootScope.categoryVal = function () {
      $rootScope.category = this.category;
      // console.log($rootScope.category);
    }
    $scope.searchImages = function () {
      $scope.searchItems = $rootScope.category;
      if ($scope.searchItems1 == undefined) {
        $scope.searchItems1 = $rootScope.category;
      } else {
        $scope.searchItems1 = "";
      }

      $rootScope.SearchURL = "https://pixabay.com/api/?key=" + ApiKEY + "&per_page=100&q=" + encodeURIComponent($scope.searchItems1) + "&image_type=all&category=" + $rootScope.category;
      // var images = PicService.getImages();
      PicService.getImages().success(function (result) {
        var hits = result.hits;
        $rootScope.myImages = hits;

      });
    }
    $scope.newLayer = false;
    $scope.test = false;
    $scope.doneme = function () {
      var thisScope = this;
      console.log($scope.newLayer, "from DONEME");
      thisScope.newLayer = true;
      // alert(this.newLayer)
    }
    $scope.doneme1 = function () {
      var thisScope = this;
      thisScope.newLayer = false;
      console.log($scope.newLayer, "from DONEME1");
      thisScope.newLayer = false;
      // alert(this.newLayer)
    }
    $scope.showTags = function () {
      var thisScope = this;
      console.log($scope.test, "from showTags");
      thisScope.test = true;
      // alert(this.newLayer)
    }
    $scope.hideTags = function () {
      var thisScope = this;
      console.log($scope.test, "from hideTags");
      console.log($scope.newLayer, "from NEW LAYER HIDETAGs");
      thisScope.test = false;
      // alert(this.newLayer)
    }
    

  }])

  
  // Gallary Service
  pictureApp.service("PicService", ["$http", "$rootScope", function ($http, $rootScope) {
    return {
      Searchquery: $rootScope.searchItems,
      getImages: function () {
        return $http.get($rootScope.SearchURL, { responseType: "json" });
      }
    }
  }]);

  // Gallary Controller
  pictureApp.controller("gallaryCtrl", ["$scope", "$rootScope", "PicService", function ($scope, $rootScope, PicService) {
    // $scope.test123 = "DIpak";
    PicService.getImages().success(function (result) {
      var hits = result.hits;
      $rootScope.myImages = hits;
      // console.log($scope.myImages);
    })
  }]);
  
  // component
  //pictureApp.component('gallarySec', {
  //  templateUrl: 'app/gallary/gallary.html',
  //  controller: 'gallaryCtrl',
  //  controllerAs: 'vm'
  //});


 
  //inject the factory "MathService" in a service to utilize the multiply method of factory.
  pictureApp.service('CalcService', function (MathService) {
    this.square = function (a) {
      return MathService.multiply(a, a);
    }
  });
})();