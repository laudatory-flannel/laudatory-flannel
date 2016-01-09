
angular.module('greenfield', [])

  .controller('FourSquareCtrl', function($scope, $http) {
    $scope.result = "";
    $scope.searchFunc = function (query) {
      var latitude = "37.783697";
      var longitude = "-122.408966";
  
      $http.get("https://api.foursquare.com/v2/venues/search?client_id=1RHHUREOVHBA2AJNFQOL4KDNFARPEILMDW3AXLVJ30KACPFW&client_secret=EEE40MR4REN231B10GI1QQJ3O3FHAJ2RINJ4WO0HOFPK4WUR&ll=" + latitude + "," + longitude + "&query=" + query + "&v=20140806&m=foursquare")
        .success(function(response) {
          $scope.result = response.response;
          console.log($scope.result);
        });
    };
  })

  .directive('formInput', function (){
    return {
      template: '<form action="/new" method="POST"><p><label for="name"> Title </label> <input name="title" required/> </p><p><label for="description"> Description </label> <textarea style="vertical-align: top" name="description"> </textarea></textarea> </p><p><label for="datetime1"> Starting Time: </label> <input type="text" id="time" data-format="h:mm a" data-template="hh : mm a" name="datetime1" value="8:30 pm" required></p><p><label for="datetime2"> Ending Time: </label> <input type="text" id="time2" data-format="h:mm a" data-template="hh : mm a" name="datetime2" value="8:30 pm" required></p><p><label for="location">Location:</label> <input type="text" id="txtPlaces" style="width: 250px" name="location" placeholder="Enter a location" required/></p> <input type="hidden" id="latitude"/> <input type="hidden" id="longitude"/><button type="submit"> Submit </button></form>'
    };

  });

