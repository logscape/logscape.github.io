var  dba = angular.module("docBrowserApp", ['ngRoute'] ); 

dba.config([
	'$routeProvider'
	,function($routeProvider){
		$routeProvider.
			when('/',{
				templateUrl:'templates/app-list-gridview.html'
				,controller:'docListCtrl'
			})
			.when('/list',{ 
				templateUrl:'templates/app-list-detailview.html'
				,controller:'docListCtrl'
			})
			.when('/grid',{
				templateUrl:'templates/app-list-gridview.html'
				,controller:'docListCtrl'
			})

	}
]);
dba.controller("docListCtrl", function($scope,$http) {
	$scope.addCategory=function ( category) {
		if( $scope.category.hasOwnProperty(category) ) { return } 
		$scope.category[category]=true;
	}
	$scope.getCategories = function () { return Object.keys($scope.category) } 
	$scope.category={
		"databases":true
		,"webServers":true
		,"java":true
		,"dotnet":true
		,"apache2":true
	};
	$http.get("data/apps.json").success(function(data){
		$scope.documents=data; 
	});


	$scope.filterByCategory = function( doc ) {
		console.log(Object.keys(doc)) 
		console.log(doc.zipURL)
		return $scope.category[doc.category]  
	}
	
}); 
