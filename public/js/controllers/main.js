angular.module('foodController', [])

	// inject the food service factory into our controller
	.controller('mainController', ['$scope','$http','Foods', function($scope, $http, Foods) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.showTotal = false;

		// GET =====================================================================
		// when landing on the page, get all foods and show them
		// use the service to get all the foods
		Foods.get()
			.success(function(data) {
				$scope.foods = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createFood = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.foodName != undefined && $scope.formData.price != undefined && !isNaN($scope.formData.price)) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Foods.create($scope.formData)

					// if successful creation, call our get function to get all the new foods
					.success(function(data) {
						$scope.loading = false;
						$scope.showTotal = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.foods = data; // assign our new list of foods
					});
			}
		};

		// DELETE ==================================================================
		// delete a food after checking it
		$scope.deleteFood = function(id) {
			$scope.loading = true;

			Foods.delete(id)
				// if successful creation, call our get function to get all the new foods
				.success(function(data) {
					$scope.loading = false;
					$scope.showTotal = false;
					$scope.foods = data; // assign our new list of foods
				});
		};
		
		$scope.getTotal = function(id) {
			
			Foods.total()
				.success(function(data) {
					if(data.length>0)
						$scope.total = data[0].total;
					else
						$scope.total = 0;
					$scope.showTotal = true;
					$scope.loading = false;
				});
		};
	}]);